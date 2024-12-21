import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PopUpNeighbour from '../popUpNeighborhood/popUpNeighbor';
import Back from '../../assets/Agents/back-to-main.png'
import jsPDF from 'jspdf';
import {Link} from 'react-router-dom'
import 'jspdf-autotable';
import './browse.css';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns =(popUpInfo)=> [
    {
        name: 'Name',
        width: '180px',
        selector:row=>row.name,
        sortable: true
    },
    {
        name: 'Address',
        selector:row=>row.address,
        sortable: true
    }
    ,
    {
        name: '№ Rooms',
        width: '140px',
        selector:row=>row.number_of_rooms,
        sortable: true
    },
    {
        name: 'Location',
        selector:row=>row.location,
        sortable: true
    },
    {
        name: 'Cost',
        width: '140px',
        selector:row=>row.price,
        sortable: true
    },
    {
        name: 'Actions',
        width: '180px',
        cell: row => (
            <>
                <Button variant="outlined" onClick={()=>popUpInfo(row.id)}>
                    Property info
                </Button>
            </>    
        )
        
    }
]


const customStyles = {
    headCells:{
      style:{
        backgroundColor: "black",
        color: "white",
        fontSize: "17px",
        fontWeight: "bold"
      }
    }
}
const browse =()=>{
        const clientName = localStorage.getItem('client_full_name');
        const email = localStorage.getItem('client_email_address');
        const passport = localStorage.getItem('client_passport_number')
        const phone = localStorage.getItem('client_phone_number')
        const [agents, setAgents]= useState([])
        const [properties, setProperties]= useState([])
        const [filter_id, setFilterData] = useState("")
        const [cloneProperties, setCloneData] = useState([]);
        const [openClose , setOpenClose] = useState(false);
        const [propertyId, setPropertyId] = useState("")
        const client_id = localStorage.getItem('client_id')
        const [fav, setFav] = useState("");
      

        const fetchAgents = async()=>{
            try{
                const url = 'http://localhost:5000/agent-data'
                const response = await axios.get(url)
                setAgents(response.data)
            }
            catch(error){
                console.log('Error:', error)
            }
        };


        const popUpInfo =(id)=>{
            if(id){
                setPropertyId(id)
                setOpenClose(true)
                console.log('CLICKED')
            }
        }
        const fetchProperties = async()=>{
            try{
                const url = 'http://localhost:4111/properites'
                const response = await axios.get(url)
                setProperties(response.data)
                setCloneData(response.data)
            }
            catch(error){
                console.log('Error:', error)
            }
        }
        const filterProperties=async()=>{
            const url = `http://localhost:4111/properites/${filter_id}`
            const response = await axios.get(url)
            setProperties(response.data)
            setCloneData(response.data)
        }

    const handleAddress= (e)=>{
        let query = e.target.value;
        if(query===''){
            setProperties(cloneProperties)
        }
        else{
            const newRecordFilterByAddress = properties.filter(addi =>addi.address.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
            setProperties(newRecordFilterByAddress)
        }
    }

    const handleCost= (e)=>{
        let query = e.target.value;
        if(query===''){
            setProperties(cloneProperties)
        }
        else{
            const newRecordFilterByCost = properties.filter(addi =>addi.price.toLocaleLowerCase().includes(query.toLocaleLowerCase()));            
            setProperties(newRecordFilterByCost)
        }
    }
    const GeneratePdf =()=>{
        const doc = new jsPDF();
        doc.text("Properties Report", 20, 10)
        const tableColumn = ["Name", "Address", "No.Rooms","Location", "Cost"]
        const tableRow = [];

        properties.forEach(item => {
            tableRow.push([item.name, item.address, item.number_of_rooms, item.location, item.price])
        });
        doc.autoTable(tableColumn, tableRow, {startY:20})
        doc.save('Properties_report.pdf')
    }

    const AddToFavorite =async (propertyId)=>{
       alert('added to properties');
       console.log("ID",propertyId)
       //const { name, address, location, number_of_rooms, agent_id , price,  coordinates_id} = req.body;
       const property_data = await axios.get(`http://localhost:4111/single-properites/${parseInt(propertyId)}`)
       console.log("PROPRT",property_data.data);
       const address = property_data.data[0].address;
       const name = property_data.data[0].name;
       const location = property_data.data[0].location;
       const number_of_rooms = property_data.data[0].number_of_rooms;
       const agent_id = property_data.data[0].agent_id;
       const price = property_data.data[0].price;
       const client_Id = client_id;
       console.log("client_Id",client_Id)
       const coordinates_id = property_data.data[0].coordinates_id;
       try{
                const hey =await axios.put(`http://localhost:4111/properties/${propertyId}`,{
                    address: address,
                    name: name,
                    location: location,
                    number_of_rooms: number_of_rooms,
                    agent_id: agent_id,
                    price: price,
                    client_id: client_Id,
                    coordinates_id: coordinates_id
            })
           
       }
       catch(error){
            console.log('Error:', error)
       }
      
       try{
                await axios.post(`http://localhost:9555/favorite`,{
                    name: name,
                    client_id: client_id,
                    price:price
                });
                console.log("SUCCES to favs")
       }
       catch(error){
            console.log('Error:', error)
       }
   
    }
    useEffect(()=>{
        filterProperties();
    },[filter_id])
    
    useEffect(()=>{
        fetchAgents();
        fetchProperties();
    },[clientName,email,passport,phone]);
    return(
        <div className='Browse'>
            <div className='welcome-details'>
                <Link to ='/Website'><img src={Back} alt="" /></Link>
                <div className='agent-del'>
                    {clientName && <h1>Welcome, {clientName}</h1>}
                    {clientName && <p>Your details are displayed below</p>}
                    {email && <p>{email}</p>}
                    {passport && <p>{passport}</p>}
                    {phone && <p>{phone}</p>}                    
                </div>
                

                <div className='agent-map'>
                    <h2>Browse Agents</h2>
                    <label htmlFor="Real Estate">Choose Real Estate Agent</label>
                    <select name = 'Real Estate Agent' label ='Real Estate Agent' value={filter_id} onChange={(e)=>setFilterData(e.target.value)}>
                        {agents && agents.map(agent =>(
                            <option key ={agent.id} value={agent.id}>{agent.full_name}</option>
                        ))}
                        <option key = "-1" value="">All Agents</option>
                    </select>
                </div>
            </div>
            <div className='popup-props'>
                <h2>Browse Properties</h2>
                {openClose &&
                    <Popup open={openClose} onClose={()=>setOpenClose(false)}>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                <PopUpNeighbour id={propertyId} />
                                </div>
                                <div>
                                    <button onClick=
                                        {() => close()}>
                                            Close modal
                                    </button>
                                    <Checkbox {...label} icon={<FavoriteBorder />} onClick={()=>AddToFavorite(propertyId)}checkedIcon={<Favorite />} />
                                </div>
                            </div>
                        )
                    }
                    </Popup>}
                <div className='text-btn'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        onClick={GeneratePdf}
                        >
                        Generate Report
                    </Button>
                    <TextField id="filled-basic" label="Filter by address" variant="filled" onChange={handleAddress}/>
                    <TextField id="filled-basic" label="Filter by cost" variant="filled" onChange={handleCost}/>
                </div>
      
                <DataTable columns ={columns(popUpInfo)} data={properties} customStyles={customStyles} pagination />
            </div>
        </div>
    )
}

export default browse;