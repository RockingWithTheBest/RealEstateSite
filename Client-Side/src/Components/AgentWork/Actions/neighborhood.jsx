import React, {useEffect ,useState}from 'react';
import DataTable from "react-data-table-component";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './actions.css'

const columns = (GetUpdateRecordId, DeleteRecord) => [
    {
        name: 'Name',
        width: '130px',
        selector:row=>row.name,
        sortable: true
    },
    {
        name: 'Description',
        width: '220px',
        selector:row=>row.description,
        sortable: true
    },
    {
        name: 'Amenities',
        width: '215px',
        selector:row=>row.amenities,
        sortable: true
    },
    {
        name: 'No of Parks',
        width: '160px',
        selector:row=>row.number_of_parks,
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
                <button variant="outlined"  onClick={()=>GetUpdateRecordId(row.id, row.property_id)}>
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
    const [openUpdate, setOpenUpdate] = useState(false)
    const [propert, setPropertyId] = useState('')
    const [neigh_id, setNeigh] = useState('')
    const [names, setName] = useState("")
    const [description, setDescription] = useState("")
    const [amenities, setAmenities] = useState("")
    const [number_of_parks, setNoParks] = useState("")
    const agent_id = localStorage.getItem('loggedin_agent_id'); 

    const fetchCoordinates = async()=>{
        try{
            const url = `http://localhost:4112/neighborhoods`
            const response = await axios.get(url);
            setRecords(response.data)
        }
        catch(err){
            console.log("ERROR: ", err)
        }
        
    }

    const GetUpdateRecordId=(neigh_id, property_id)=>{
        console.log("ID: ", neigh_id)
        console.log("Coordinates: ", neigh_id)
        setOpenUpdate(true);
        setNeigh(neigh_id);
        setPropertyId(property_id)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = `http://localhost:4112/neighborhoods/${neigh_id}`
        const property_id = localStorage.getItem('added_property_id')
        console.log("Property ID: ", property_id)
        try{
            const response =await axios.put(url,{
                name : names, 
                description: description, 
                amenities: amenities, 
                number_of_parks : number_of_parks, 
                property_id : property_id, 
            })
              await fetchCoordinates();
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
             const url = `http://localhost:4112/neighborhood/${id}`
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
        <div className='neigh-datatable'>
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
                                            placeholder='Enter the neighborhood name...'
                                            value ={names}
                                            onChange={(e)=>setName(e.target.value)}
                                            className='input-value'
                                            />
                                        <input 
                                            type="text"
                                            placeholder='Enter description...'
                                            value ={description}
                                            onChange={(e)=>setDescription(e.target.value)}
                                            className='input-value' 
                                        />
                                          <input 
                                            type="text"
                                            placeholder='Enter amenities details...'
                                            value ={amenities}
                                            onChange={(e)=>setAmenities(e.target.value)}
                                            className='input-value' 
                                        />
                                          <input 
                                            type="number"
                                            placeholder='Enter number of parks...'
                                            value ={number_of_parks}
                                            onChange={(e)=>setNoParks(e.target.value)}
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