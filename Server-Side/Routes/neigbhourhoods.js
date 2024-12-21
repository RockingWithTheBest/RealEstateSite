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
const PORT = "4112"

app.get('/neighborhoods', async(req, res)=>{
    const results = await dbConnect.query('SELECT * FROM \"neighborhoods\"');
    res.json(results.rows);
    // This route should return a list of neighborhoods in the database.
});


app.get('/neighborhoods/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const result = await dbConnect.query("SELECT * FROM \"neighborhoods\" WHERE id = $1", 
            [id]);
        if(result.rows.length > 0){
            res.json(result.rows);
        }
        else{
            res.status(404).send("Neighborhood not found");
        }
    }catch(e){
        console.error('Error executing query', e.message);
        res.status(500).send('Error executing query');
    }
   
}); 
app.put('/neighborhoods/:id', async(req, res)=>{
    const {id} = req.params;
    const {name, description, amenities, number_of_parks, property_id} = req.body;
    if(!(name&&description&&amenities&&number_of_parks&&property_id)){
        return  res.status(400).send("All fileds are compulsory")
     }
 
    try{
        await dbConnect.query("UPDATE \"neighborhoods\" SET name = $1, description =$2, amenities=$3, number_of_parks=$4, property_id=$5 WHERE id = $6",
            [name, description, amenities, number_of_parks, property_id, id])

        
            const result = await dbConnect.query("SELECT *FROM \"neighborhoods\" WHERE id =$1",
                [id]
            )
            if(result.rows.length ===0){
                return res.status(404).send("Neighborhood record not found")
            }
            res.send("Record updated successfully");
    }
    catch(err){
        console.error("Error updating neighborhood", err.message);
        res.status(500).send("Server error updating neighborhood");
    }

    if(!(name&&description&&amenities&&number_of_parks)){
       return  res.status(400).send("All fileds are compulsory")
    }
});
app.post('/neighborhoods', async(req, res)=>{
    const {name, description, amenities, number_of_parks, property_id} = req.body;
    if(!(name&&description&&amenities&&number_of_parks&&property_id)){
       return  res.status(400).send("All fileds are compulsory")
    }

    try{
        const result = await dbConnect.query('SELECT * FROM \"neighborhoods\" WHERE \"name\"= $1',
            [name]
        );
        if(result.rows.length>0){
            return res.status(400).send("Neighborhood with the same name already exists");
        }
        try{
            const neighborhood = await dbConnect.query('INSERT INTO \"neighborhoods\" (name, description, amenities, number_of_parks, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING*',
            [name, description, amenities, number_of_parks, property_id]
            )
            res.json( { messgae:"Neighborhood added successfully",  
                        neighborhood:neighborhood.rows[0]} );
        }
        catch(err){
            console.log(err);
            res.send("Error adding neighborhood");
        }
        
    }
    catch(err){
        console.log(err);
        res.send("Error adding neighborhood");
    }
})

app.delete('/neighborhood/:id', async(req,res) => {
    const {id} = req.params;
    try{
        await dbConnect.query("DELETE FROM \"neighborhoods\" WHERE id = $1", [id]);
        res.json({message: "Neighborhood deleted successfully"});
    }
    catch(err){
        console.log("ERROR ",err);
        res.send("Error deleting neighborhood");
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});