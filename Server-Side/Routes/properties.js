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
const PORT = "4111"

app.get('/properites', async (req, res) =>{
    const results = await dbConnect.query('SELECT * FROM \"Properties\"');
    res.json(results.rows);
})

app.get('/properites/:id', async (req, res)=>{
    const {id} = req.params;
    try{    
        const result = await dbConnect.query("SELECT * FROM \"Properties\" WHERE agent_id = $1", 
            [id]);
        if(result.rows.length > 0){
            res.json(result.rows);
        }
        else{
            res.status(404).send('Property not found.');
        }
    }
    catch(err) {
        console.error('Error getting property', err.message);
        res.status(500).send('Error getting property');
    }
   
})
app.get('/single-properites/:id', async (req, res)=>{
    const {id} = req.params;
    try{    
        const result = await dbConnect.query("SELECT * FROM \"Properties\" WHERE id = $1", 
            [id]);
        if(result.rows.length > 0){
            res.json(result.rows);
        }
        else{
            res.status(404).send('Property not found.');
        }
    }
    catch(err) {
        console.error('Error getting property', err.message);
        res.status(500).send('Error getting property');
    }
   
})
app.post('/properites', async (req, res) =>{
    const { name, address, location, number_of_rooms, agent_id , price,  coordinates_id} = req.body;
    if (!(name && address && location && number_of_rooms && agent_id && price && coordinates_id)) {
        return res.status(400).json({message: "All fields are required."});
    }
    try{

        const result = await dbConnect.query('SELECT * FROM \"Properties\" WHERE \"address\" = $1',
            [ address ])
        if(result.rows.length > 0){
            return res.status(400).send('Property with such an Address already exists.');
        }

        try{
            const property = await dbConnect.query('INSERT INTO \"Properties\"(name, address, location, number_of_rooms, price, agent_id,coordinates_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*',
                 [name, address, location, number_of_rooms, price, agent_id,coordinates_id]
            )
            res.json({ message: 'Property added successfully.', property: property.rows[0] });
        }
        catch(err){
            console.error('Error adding property', err.message);
            res.status(500).send('Error adding property');
        }
    }
    catch(err){
        console.error('Error checking property', err.message);
        res.status(500).send('Error checking property');
    }
})
app.delete('/properties/:id', async(req, res) => {
    const {id} = req.params;
    try{
        await dbConnect.query(
            'DELETE FROM \"Properties\" WHERE id = $1',
            [ id ]
        )
        res.json({ message: 'Property deleted successfully.' });
    }
    catch(err){
        console.error('Error deleting property', err.message);
        res.status(500).send('Error deleting property');
    }
})

app.put('/properties/:id', async (req, res) => {
    const {id} = req.params;
    const { name, address, location, number_of_rooms, agent_id, price, client_id, coordinates_id} = req.body;
    if (!(name && address && location && number_of_rooms && agent_id && price && coordinates_id)) {
        return res.status(400).json({message: "All fields are required."});
    }
    try{
        await dbConnect.query('UPDATE \"Properties\"  SET name=$1, address =$2, location=$3, number_of_rooms=$4, agent_id = $5, price = $6, coordinates_id = $7, client_id = $8 WHERE id = $9',
            [ name, address, location, number_of_rooms, agent_id, price, coordinates_id , client_id ,id ])

        const result = await dbConnect.query("SELECT *FROM \"Properties\" WHERE id =$1",
            [id]
        )
        if(result.rows.length ===0){
            return res.status(404).send("Property record not found")
        }
        res.send({message:"Record updated successfully", record: result.rows[0]});
    }
    catch(err){
        console.error('Error checking property', err.message);
        res.status(500).send('Error checking property');
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});

