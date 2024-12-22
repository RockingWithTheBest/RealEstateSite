import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';

const {Client} =pkg;

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
        console.log(err);
    }
}

Connection();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = "9557"

app.get('/transaction/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const transaction = await dbConnect.query('SELECT * FROM \"Transactions\" WHERE client_id = $1', [id]);
        if(transaction.rows.length === 0){
            return res.status(404).send("Transaction not found");
        }else{
            res.json(transaction.rows);
        }
    }
    catch(err){
        console.error('Error executing query', err.message);
        res.status(500).send('Error executing query');
    }
})
app.post('/transactions', async(req, res) =>{
    const {client_id, type,transaction_status,price_paid} =req.body;    
    if(!(client_id && type && transaction_status && price_paid)){
        return res.status(400).json({message: "All fields are required."});
    }

    try{
        const transaction = await dbConnect.query("INSERT INTO \"Transactions\" (client_id, type, transaction_status, price_paid) VALUES ($1, $2, $3, $4)",
            [client_id, type, transaction_status, price_paid]
        )
        res.json({
            message: "Transaction added successfully",
            transaction: transaction.rows[0]
        })
    }
    catch(err){
        console.error('Error executing query', err.message);
        res.status(500).send('Error executing query');
    }
})

app.delete('/transaction/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const transaction = await dbConnect.query('DELETE FROM \"Transactions\" WHERE id = $1', [id]);
        if(transaction.rowCount === 0){
            return res.status(404).send("Transaction not found");
        }else{
            res.json({message: "Transaction deleted successfully"})
        }
    }
    catch(err){
        console.error('Error executing query', err.message);
        res.status(500).send('Error executing query');
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});

