import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Client } = pkg;
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
const PORT = 5000;
app.post('/agent-register', async(req, res) =>{

        try {
            const {full_name , password , phone_number , email_address} = req.body;

            if(!( full_name && password && phone_number && email_address)){
                res.status(400).send('All fields are required.');
                return;
            }
            const result = await dbConnect.query("SELECT * FROM \"Agents\" WHERE \"password\" = $1",
                [password]
            )
    
            if(result.rows.length > 0){
                res.status(400).send('Client with such a Password already exists.');
                return;
            }
            
            const hashedpassword = await bcrypt.hash(password, 10)
            console.log("HASHED", hashedpassword);
            //INSERTION
            try{
                const agent =  await dbConnect.query('INSERT INTO \"Agents\" (full_name, password, phone_number, email_address) VALUES ($1, $2, $3, $4) RETURNING*', 
                        [ full_name, hashedpassword, phone_number , email_address]);
                res.json({ message: 'Agent added successfully.', data: agent.rows[0] });
            }
            catch(err){
                console.error('Error adding client', err.message);
                res.status(500).send('Error adding client', err.message);
            }
    
     
        } catch (err) {
            console.error('Error adding client', err.message);
            res.status(500).send('Error adding client');
        }
})
app.post('/agent-login', async (req, res) => {
    const { password, email_address } = req.body;
    if (!(password && email_address)) {
        return res.status(400).json({message: "All fields are required."});
    }
    try{        
        const agent = await dbConnect.query("SELECT * FROM \"Agents\" WHERE email_address = $1 ", 
            [email_address])
        if(agent.rows.length===0){
            return res.status(404).json({message: "User cannot be found."});
        }

        const isMatch = await bcrypt.compare(password, agent.rows[0].password);
   
        if(isMatch && agent.rows[0].password){
            const data = {
                full_name: agent.rows[0].full_name,
                email_address: agent.rows[0].email_address,
                phone_number: agent.rows[0].phone_number,
                password: agent.rows[0].password
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

app.get('/agent-data', async (req, res) => {
    try{
        const results = await dbConnect.query('SELECT * FROM \"Agents\"');
        res.send(results.rows);
    }
    catch(err){
        console.error('Error fetching agents', err.message);
        res.status(500).send('Error fetching agents');
    }
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});