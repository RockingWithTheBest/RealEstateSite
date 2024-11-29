import pkg from 'pg'

const {Client} = pkg;


const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    database: "RealEstateDb",
    host: "127.0.0.1",
    port : "5432"
})
async function Connection(){
    try{
        await dbConnect.connect();
        console.log(`Successfully connected to PostgreSQL Database called ${dbConnect.database} `);
    }catch(e){
        console.error('Connection failed', e.stack);
    }
}
Connection();
