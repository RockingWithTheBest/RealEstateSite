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
    try{
        const results = await dbConnect.query('SELECT * FROM \"coordinates\"');
        res.json(results.rows);
    }
    catch(err){
        console.error('Error executing query', err.message);
        res.status(500).send('Error executing query');
    }
   
})
app.get('/coordinates/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        const result = await dbConnect.query('SELECT * FROM \"coordinates\" WHERE agent_id=$1',
            [id]
        );
    
        if(result.rows.length > 0){
            res.json(result.rows);
        }
    
        else{
            res.status(404).send('Coordinates not found.');
        }
    }catch(e){
        console.error('Error executing query', e.message);
        res.status(500).send('Error executing query');
    }
});
app.get('/coordinate-single/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        const result = await dbConnect.query('SELECT * FROM \"coordinates\" WHERE id=$1',
            [id]
        );
    
        if(result.rows.length > 0){
            res.json(result.rows);
        }
    
        else{
            res.status(404).send('Coordinates not found.');
        }
    }catch(e){
        console.error('Error executing query', e.message);
        res.status(500).send('Error executing query');
    }
});
app.post('/coordinates', async(req, res) =>{
    const {grid_number, name, agent_id} = req.body;
    if (!(grid_number && name && agent_id)) {
        return res.status(400).json({message: "All fields are required."});
    }

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
            res.json({ message: 'Coordinates added successfully.', data: coordinates.rows[0], grid_number: coordinates.rows[0].grid_number ,id: coordinates.rows[0].id});
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

app.put('/coordinates/:id', async (req, res) => {
    const {id} = req.params;
    const { grid_number, name, agent_id} = req.body;
    if (!(grid_number && name && agent_id)) {
        return res.status(400).json({message: "All fields are required."});
    }
    try{
        await dbConnect.query("UPDATE \"coordinates\" SET grid_number = $1, name = $2, agent_id = $3 WHERE id = $4",
            [grid_number, name, agent_id, id]
        )
        

        const result = await dbConnect.query("SELECT *FROM \"coordinates\" WHERE id =$1",
            [id]
        )
        if(result.rows.length ===0){
            return res.status(404).send("Coordinates record not found")
        }
        res.send("Record updated successfully");
    }
    catch(err){
        console.error("Error updating coordinates", err.message);
        res.status(500).send("Server error updating agent");
    }
})
app.delete('/coordinates/:id', async(req,res) => {
    const {id} = req.params;
    try{
        await dbConnect.query(
            "DELETE FROM \"coordinates\" WHERE id=$1",
            [id]
        )
        res.json({ message: 'Coordinate record deleted successfully.' });
    }
    catch(err) {
        console.error('Error deleting coorfinate record', err.message);
        res.status(500).send('Error deleting client');
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});