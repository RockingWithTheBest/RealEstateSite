import React, {useState,useEffect} from 'react';
import Mortgage from '../Mortgage/mortgage'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './buyfav.css';

// import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



const buyfav =()=> {
const client_id = localStorage.getItem('client_id');
const [favs, setFavs] = useState()
const [openClose, setOpenClose] = useState(false);
const [type, setType] = useState("")
const [price, setPrice] = useState("")


const fetchFavorite = async ()=>{
  try{
    const response = await axios.get(`http://localhost:9555/favorite-of-client/${client_id}`);
    setFavs(response.data);
  } catch(error){
    console.error(error);
  }
}
const mortage =()=>{
  if(confirm('Mortgage calculator')){
      setOpenClose(true);
  }
}
const PostToTrans=async(e)=>{
  e.preventDefault();
  try{
      await axios.post('http://localhost:9557/transactions',{
        client_id: client_id,
        type: type,
        price_paid: price,
        transaction_status:"Paid"
      })
      alert("Transaction Successful");
  }
  catch(error){
    alert("Something went wrong...");
    console.error("MESSAGE - ",error);
  }
    
}
useEffect(()=>{
  fetchFavorite();
}, [client_id]);

  return (
    <div className='lets-go' >
      <div className='fav-display'>
        {favs && <h1>Selected Properties</h1>}
        {favs? (favs.map(fav=>{
          return (
            
            <div key={fav.id} className='favorite'>
              <div>
                <p>Name: {fav.name}</p>
                <p>Price: {fav.price}</p>
              </div>
            </div>
          )
        })):(
          <p>You haven't selected a property.</p>
         )          
        }

      </div>
      <div className='mort'>
        <form action="" onSubmit={PostToTrans} className='post-trans'>
          <h2>Process Transaction..</h2>
          <input 
              type="text"
              placeholder='Transaction type' 
              value={type}
              onChange={(e)=>setType(e.target.value)}/> 

           <input 
              type="number"
              placeholder='price' 
              value={price}
              onChange={(e)=>setPrice(e.target.value)}/> 

          <p onClick={mortage}>Click to calculate mortgage</p>   
          <button type='submit'>Click to buy</button>        
        </form>
      </div>
      <div className='mortgage-calculator'>
                {openClose && 
                <Popup open ={openClose} onClose={()=>setOpenClose(false)}>
                    <Mortgage/>
                </Popup>}
            </div>
    </div>
  );
}

export default buyfav;