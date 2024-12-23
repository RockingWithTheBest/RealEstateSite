import React, {useEffect ,useState}from 'react';
import DataTable from "react-data-table-component";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './actions.css'

const columns = (GetUpdateRecordId, DeleteRecord) => [
    {
        name: 'Grid Number',
        width: '180px',
        selector:row=>row.grid_number,
        sortable: true
    },
    {
        name: 'Area Name',
        width: '380px',
        selector:row=>row.name,
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
                <button variant="outlined"  onClick={()=>GetUpdateRecordId(row.id)}>
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
    const [grid_number, setGridNumber] = useState("");
    const [coordinateName, setCoordinateName] = useState("");
    const agent_id = localStorage.getItem('loggedin_agent_id'); 
    const [openUpdate, setOpenUpdate] = useState(false)
    const [updateID, setUpdateId] = useState('')


    const fetchCoordinates = async()=>{
        try{
            const url = `http://localhost:1000/coordinates/${agent_id}`
            const response = await axios.get(url);
            setRecords(response.data)
        }
        catch(err){
            console.log("ERROR: ", err)
        }
        
    }

    const GetUpdateRecordId=(id)=>{
        setOpenUpdate(true);
        setUpdateId(id);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        const url = `http://localhost:1000/coordinates/${updateID}`
        try{
            const response =await axios.put(url,{
                grid_number: `[${grid_number}]`,
                name: coordinateName,
                agent_id: agent_id,
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
             const url = `http://localhost:1000/coordinates/${id}`
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
        <div className='coord-datatable'>
            <DataTable columns={columns(GetUpdateRecordId, DeleteRecord)} 
            className='data'
            data = {records} 
            customStyles = {customStyles} 
            pagination  
            responsive/>
            {openUpdate &&
                <Popup open={openUpdate} onClick={()=>setOpenUpdate(false)}>
                    {
                        close=>(
                            <div className="modal" >
                                <div className="content">
                                    <form action="" onSubmit={handleSubmit} className='update-coordinates'>
                                        <input 
                                            type="text" 
                                            placeholder='Enter the coordinates...'
                                            value ={grid_number}
                                            onChange={(e)=>setGridNumber(e.target.value)}
                                            className='input-value'
                                            />
                                        <input 
                                            type="text"
                                            placeholder='Enter area name'
                                            value ={coordinateName}
                                            onChange={(e)=>setCoordinateName(e.target.value)}
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
        </div>        
    )
}
export default coordinatesAction