import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {Client} = pkg;

let refreshTokens =[]
const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    database: "RealEstateDb",
    host: "127.0.0.1",
    port : "5432"
})

function Connection (){
    try{
        dbConnect.connect();
        console.log("Database connected successfully.");
    }
    catch(err){
        console.error("Error connecting to the database", err.message);
    }
}

Connection();


const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT  = '4001'


app.post('/client-login', async (req, res) => {
    const {password, passport_number} = req.body;

    if(!(password && passport_number)){
        return res.status(400).json({message: "All fields are required."});
    }

    try{
        
        const client = await dbConnect.query("SELECT * FROM \"Clients\" WHERE passport_number = $1 ", [passport_number])
        if(client.rows.length===0){
            return res.status(404).json({message: "User cannot be found."});
        }

        const isMatch = await bcrypt.compare(password, client.rows[0].password);
       
        if(isMatch && client.rows[0].passport_number){
            const data = {
                full_name: client.rows[0].full_name,
                passport_number: client.rows[0].passport_number,
                email_address: client.rows[0].email_address,
                phone_number: client.rows[0].phone_number,
                password: client.rows[0].password
            }
            const user = data;
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(
              user, //payload
              process.env.REFRESH_TOKEN_SECRET //secret
            );
            refreshTokens.push(refreshToken);

            res.json({accessToken: accessToken, refreshToken: refreshToken});

        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Server Error"});
    }
})
function generateAccessToken(user) {
    return jwt.sign(
      user, //payload
      process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1800s'}//secret
    );
  }
  
  app.get('/client-identify', authenticationToken, async (req, res) => {
    const results = await dbConnect.query('SELECT * FROM \"Clients\"');
    res.send(results.rows.filter(row => row.password === req.client.password))
  })

  function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    try{
        if(authHeader){
            const token = authHeader.split(' ')[1];
            if(!token){
                return res.status(401).send('Access Denied not token provided');
            }
            else{
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client)=>{
                    if(err){
                        return res.status(403).send("Access denied you have no token available");
                    }
                    req.client = client;
                    next();                
                })  
            }
        }
        else{
            return res.sendStatus(401);
        }
    }
    catch(err){
        console.error(err);
        return res.status(403).send('Access Denied. Invalid Token, the token is now expired');
    }

  }
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})