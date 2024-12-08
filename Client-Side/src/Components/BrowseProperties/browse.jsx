import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PopUpNeighbour from '../popUpNeighborhood/popUpNeighbor'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
        width: '200px',
        selector:row=>row.price,
        sortable: true
    },
    {
        name: 'Actions',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" onClick={()=>popUpInfo(row.id)}>
                    Delete
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

    useEffect(()=>{
        filterProperties();
    },[filter_id])
    
    useEffect(()=>{
        fetchAgents();
        fetchProperties();
    },[clientName,email,passport,phone]);
    return(
        <div className='Browse'>
            <div>
                <div>
                    {clientName && <h1>Welcome, {clientName}</h1>}
                    {clientName && <p>Your details are displayed below</p>}
                    {email && <p>{email}</p>}
                    {passport && <p>{passport}</p>}
                    {phone && <p>{phone}</p>}                    
                </div>
                

                <div>
                    <h2>Browse Agents</h2>
                    <label htmlFor="Real Estate">Real Estate Agents</label>
                    <select name = 'Real Estate Agent' label ='Real Estate Agent' value={filter_id} onChange={(e)=>setFilterData(e.target.value)}>
                        {agents && agents.map(agent =>(
                            <option key ={agent.id} value={agent.id}>{agent.full_name}</option>
                        ))}
                        <option key = "-1" value="">All Agents</option>
                    </select>
                </div>
            </div>
            <div>
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
                                </div>
                            </div>
                        )
                    }
                    </Popup>}
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
                <DataTable columns ={columns(popUpInfo)} data={properties} customStyles={customStyles} />
            </div>
        </div>
    )
}

export default browse;