import 'dotenv/config'; 
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';
import jwt from 'jsonwebtoken';


const { Client } = pkg;

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
const PORT  = '5001'

app.put('/agent-edit/:id', async (req, res) => {
    const {id} = req.params;
    const {full_name,  password, phone_number, email_address} = req.body;

    try{
        await dbConnect.query("UPDATE \"Agents\" SET full_name = $1, password = $2, phone_number = $3, email_address = $4 WHERE id = $5",
            [full_name, password, phone_number, email_address]
        )
        res.send("Agent updated successfully");

        const result = await dbConnect.query("SELECT *FROM \"Agents\" WHERE id =$1",
            [id]
        )
        if(result.rows.length ===0){
            return res.status(404).send("Agent not found")
        }

        res.json(result.rows[0])
    }
    catch(err){
        console.error("Error updating agent", err.message);
        res.status(500).send("Server error updating agent");
    }
})
app.get('/agent-identify', authenticationToken, async (req, res) => {
    const results = await dbConnect.query('SELECT * FROM \"Agents\"');
    res.send(results.rows.filter(row => row.password === req.client.password))
  })

app.get('/agent-single/:id',  async (req, res) =>{
    const id = parseInt(req.params.id);
    const result = await dbConnect.query("SELECT * FROM \"Agents\" WHERE id = $1", 
        [id]);
    if(result.rows.length > 0){
        res.json(result.rows[0]);
    }
    else{
        res.status(404).send("Agent not found");
    }
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
});