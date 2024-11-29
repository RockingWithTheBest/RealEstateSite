import React,{useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import './listing.css'

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
      name:'Id',
      selector:row=>row.id,
      sortable : true,
      width: '100px'
    },
    {
      name:'Location',
      selector:row=>row.Location,
      sortable : true,
      width: '200px'
    },
    {
      name:'Rooms',
      selector:row=>row.Rooms,
      sortable : true,
      width: '200px'
    },
    {
        name:'Price',
        selector:row=>row.Price,
        sortable : true,
        width: '200px'
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
    const [records, setRecords] = useState(agentProperties);
    const [rowid, setId] = useState("");
    const navigate = useNavigate();

    const mapdisplay = (data) => {
      setId(data.id);
        console.log("GOOD", data.id)
        const ID = data.id;
        if(confirm("you are being directed to the map")) {
          navigate(`/singleProperty/${ID}`);
        }
        // setId(row.id);
    }
    useEffect(() =>{
     
    }, []);
    return(
        <div className='listins'>
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <div className='tableData'>
                <DataTable columns ={columns(mapdisplay)} data={records} customStyles={customStyles} pagination />
            </div>
       
        </div>
       
    )
}

export default Listing;

