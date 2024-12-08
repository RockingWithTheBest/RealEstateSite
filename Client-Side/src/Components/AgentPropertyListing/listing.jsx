import React,{useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './listing.css';

const agentProperties = [
    {
        id:'1',
        Location: 'Chamba Valley, Lusaka',
        Rooms: '9 rooms',
        Price: '$1200000'
    },
    {
        id:'2',
        Location: 'Matero East, Lusaka',
        Rooms: '12 rooms',
        Price: '$1500000'
    },
    {
        id:'3',
        Location: 'Olympia, Lusaka',
        Rooms: '15 rooms',
        Price: '$1800000'
    },
    {
        id:'4',
        Location: 'Woodlands, Lusaka',
        Rooms: '12 rooms',
        Price: '$2100000'
    }
]
const columns =(mapdisplay)=>[
    {
      name:'Location',
      selector:row=>row.name,
      sortable : true,
      width: '400px'
    },
    {
        name:'Action',
        cell: row => (
          <>
              <button onClick={()=>mapdisplay(row)}>View on Map</button>
          </>            
        )
    }
  ]
  const customStyles = {
    headCells:{
      style:{
        backgroundColor: "black",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
      }
    }
  }
const Listing= ()=>{
    // const [records, setRecords] = useState(agentProperties);
    const [rowid, setId] = useState("");
    const [mapCoordinates, setMapCoordinates] = useState([])
    const [cloneMapCoordinates, setCloneMapCoordinates] = useState([])
    const navigate = useNavigate();

    const fetchCoordinates = async() => {
        const url = 'http://localhost:1000/coordinates';
        const response  = await axios.get(url);
        const dataResponse = response.data;
        const agentId = localStorage.getItem('client_agentId');
        const filteredResponseList = dataResponse.filter(row => row.agent_id === Number(agentId));
        console.log("AGENT ID", agentId);
        console.log("FILTERS RECORDS", filteredResponseList);
        setMapCoordinates(filteredResponseList);
        setCloneMapCoordinates(filteredResponseList);
    }
    const mapdisplay = (data) => {
      setId(data.id);
        console.log("GOOD", data.id)
        const ID = data.id;
        if(confirm("you are being directed to the map")) {
          navigate(`/singleProperty/${ID}`);
        }
        // setId(row.id);
    }

    const filterDetails = (event) => {
        let query = event.target.value;
        if(query===''){
          setMapCoordinates(cloneMapCoordinates);
        }
        else{
            const filteredList = mapCoordinates.filter(row => row.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
            setMapCoordinates(filteredList);
        }
    }
    const textFileStyles ={
      color: "black",
      backgroundColor: 'white', // Set background color to white
      '& .MuiFilledInput-root': {
        backgroundColor: 'white'}
    }
    useEffect(() =>{
      fetchCoordinates();
    }, []);
    return(
        <div className='listins'>
            <TextField 
            sx={textFileStyles}
              id="filled-basic" 
              label="filter by location" 
              variant="filled" 
              onChange={filterDetails}
            />
            <div className='tableData'>
                <DataTable columns ={columns(mapdisplay)} data={mapCoordinates} customStyles={customStyles} pagination />
            </div>
       
        </div>
       
    )
}

export default Listing;

