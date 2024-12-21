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
const PORT = "9555"


app.get('/favorite-of-client/:id', async(req, res)=>{
    const {id} = req.params;
    const results = await dbConnect.query('SELECT * FROM \"favorite-properties\" WHERE client_id = $1', [id]);
    res.json(results.rows);
})
app.post('/favorite', async (req, res) => {
    const {name, price, client_id} = req.body;
    if(!(name&&price&&client_id)){
        return res.status(400).json({message: "All fields are required."});
    }
    try{
        const result = await dbConnect.query("SELECT *FROM \"favorite-properties\" WHERE \"name\" = $1",
            [name]
        )
    
        if(result.rows.length > 0){
            return res.status(400).send('Favorite property with such a Name already exists.');
        }
    }
    catch(err){
        console.log(err);
    }
    
    try{
            await dbConnect.query('INSERT INTO \"favorite-properties\"(name, price, client_id) VALUES ($1, $2, $3)',
            [name, price, client_id]
        );
        res.json({ message: 'Favorite property added successfully.'});
    }
    catch(err){
        console.error('Error adding favorite property', err.message);
        res.status(500).send('Error adding favorite property');
    }    
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

