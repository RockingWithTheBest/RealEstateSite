import React, {useEffect ,useState}from 'react';
import DataTable from "react-data-table-component";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './actions.css'

const columns = (GetUpdateRecordId, DeleteRecord) => [
    {
        name: 'Name',
        width: '180px',
        selector:row=>row.name,
        sortable: true
    },
    {
        name: 'Address',
        width: '230px',
        selector:row=>row.address,
        sortable: true
    },
    {
        name: 'Location',
        width: '120px',
        selector:row=>row.location,
        sortable: true
    },
    {
        name: 'No of Rooms',
        width: '159px',
        selector:row=>row.number_of_rooms,
        sortable: true
    },
    {
        name: 'Price',
        width: '100px',
        selector:row=>row.price,
        sortable: true
    },
    {
        name: 'Delete',
        width: '110px',
        cell: row => (
            <>
                <button variant="outlined"  onClick={()=>DeleteRecord(row.id)}>
                    Delete
                </button>
            </>    
        )
    },
    {
        name: 'Update',
        width: '110px',
        cell: row => (
            <>
                <button variant="outlined"  onClick={()=>GetUpdateRecordId(row.id, row.coordinates_id)}>
                    Update
                </button>
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
const coordinatesAction = ()=>{
    const [records, setRecords] = useState([]);
    const agent_id = localStorage.getItem('loggedin_agent_id'); 
    const [openUpdate, setOpenUpdate] = useState(false)
    const [coord, setCoordinatesId] = useState('')
    const [propert, setPropertyId] = useState('')

    const [names, setName] = useState("")
    const [address, setAddress] = useState("")
    const [location, setLocation] = useState("")
    const [NoRooms, setNoRooms] = useState("")
    const [price, setPrice] = useState("")


    const fetchCoordinates = async()=>{
        try{
            const url = `http://localhost:4111/properites/${agent_id}`
            const response = await axios.get(url);
            setRecords(response.data)
        }
        catch(err){
            console.log("ERROR: ", err)
        }
        
    }

    const GetUpdateRecordId=(property_id, coordinates_id)=>{
        console.log("ID: ", property_id)
        console.log("Coordinates: ", coordinates_id)
        setOpenUpdate(true);
        setCoordinatesId(coordinates_id);
        setPropertyId(property_id)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = `http://localhost:4111/properties/${propert}`
        try{
            const response =await axios.put(url,{
                name : names, 
                address: address, 
                location: location, 
                number_of_rooms : NoRooms, 
                agent_id : agent_id, 
                price : price, 
                coordinates_id : coord
            })
               await  fetchCoordinates();
              alert("Updated successfully")
              setOpenUpdate(false);
       
        }
        catch(error){
            console.log("Error: ", error)
            alert("Failed to update")
        }
      
    }
    const DeleteRecord=async(id)=>{
        try{
             const url = `http://localhost:4111/properties/${id}`
             await axios.delete(url)
             alert("Successfully delete")
             fetchCoordinates();
        }
        catch(error){
            console.log("Error: ", error)
            alert("Failed to delete")
        }
    }
    useEffect(()=>{
        fetchCoordinates()
    },[])
    return(
        <div className='property-datatable'>
            <DataTable columns={columns(GetUpdateRecordId, DeleteRecord)} 
            data = {records} 
            customStyles = {customStyles} 
            pagination  />
            {openUpdate &&
                <Popup open={openUpdate} onClick={()=>setOpenUpdate(false)}>
                    {
                        close=>(
                            <div className="modal" >
                                <div className="content">
                                    <form action="" onSubmit={handleSubmit}>
                                        <input 
                                            type="text" 
                                            placeholder='Enter the property name...'
                                            value ={names}
                                            onChange={(e)=>setName(e.target.value)}
                                            className='input-value'
                                            />
                                        <input 
                                            type="text"
                                            placeholder='Enter address...'
                                            value ={address}
                                            onChange={(e)=>setAddress(e.target.value)}
                                            className='input-value' 
                                        />
                                          <input 
                                            type="text"
                                            placeholder='Enter location'
                                            value ={location}
                                            onChange={(e)=>setLocation(e.target.value)}
                                            className='input-value' 
                                        />
                                          <input 
                                            type="number"
                                            placeholder='Enter number of rooms'
                                            value ={NoRooms}
                                            onChange={(e)=>setNoRooms(e.target.value)}
                                            className='input-value' 
                                        />
                                          <input 
                                            type="number"
                                            placeholder='Enter area name'
                                            value ={price}
                                            onChange={(e)=>setPrice(e.target.value)}
                                            className='input-value' 
                                        />
                                        <button type='submit' className='update-btn'>Update</button>
                                    </form>

                                </div>
                                <div>
                                    <button onClick
                                        ={()=>{close(); setOpenUpdate(false)}}>
                                            Close modal
                                        </button>
                                </div>
                            </div>
                        )
                }
                </Popup>
            }
            <div className='popupUpdate'>
                
            </div>
        </div>        
    )
}
export default coordinatesAction