import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';

const { Client } = pkg;

const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    database: "RealEstateDb",
    host: "127.0.0.1",
    port : "5432"
});

function Connection(){
    try{
        dbConnect.connect();
        console.log("Database connected successfully.");
    }
    catch(err){
        console.error('Error connecting to the database', err.message);
    }
}
Connection();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = '1000'

app.get('/coordinates', async(req, res) =>{
    const results = await dbConnect.query('SELECT * FROM \"coordinates\"');
    res.json(results.rows);
})

app.post('/coordinates', async(req, res) =>{
    const {grid_number, name, agent_id} = req.body;

    try{
        const results = await dbConnect.query('SELECT * FROM \"coordinates\" WHERE \"grid_number\" = $1',
            [grid_number]
        );
    
        if(results.rows.length > 0){
            return res.status(400).send('Grid number already exists so you can proceed with the insertion.');
        }

        try{
            const coordinates = await dbConnect.query('INSERT INTO \"coordinates\"(grid_number, name, agent_id) VALUES ($1, $2, $3) RETURNING*',
                [grid_number, name, agent_id]
            );
            res.json({ message: 'Coordinates added successfully.', data: coordinates.rows[0] });
        }
        catch(err){
            console.error('Error executing query', err.message);
            res.status(500).send('Error executing query');
        }
    }
    catch(err){
        console.error('Error executing query', err.message);
        res.status(500).send('Error executing query');
    }
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});