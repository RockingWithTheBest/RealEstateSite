import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './ColorToggleButton.css'

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



const ColorToggleButton =()=> {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [age, setAge] = React.useState('');

  const handleChangeSelector = (event) => {
    setAge(event.target.value);
  };

  return (
    <div >
      <div className= "MainControll">
          <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          >
          <ToggleButton value="web">Rent</ToggleButton>
          <ToggleButton value="android">Buy</ToggleButton>
          <ToggleButton value="ios">Sell</ToggleButton>
          </ToggleButtonGroup>
          <form action="" className = "rent-sell-buy">
              <div className='section1'>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">Location</InputLabel>
                <div>
                <FormControl fullWidth variant = "filled">

                  <NativeSelect
                    defaultValue={30}

                  >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirtyacdhsadedfvk</option>
                  </NativeSelect>
                </FormControl>
                </div>
                
              </div>
              <div className='section2'>
                  <div><label>Select Move-in Date</label></div>
                  <div><TextField id="outlined-basic"  type = "date" variant="filled" /></div>              
              </div>
              <div className='section3'>
                  <Button variant="contained">Browse Properties</Button>
              </div>
            </form>
      <div>
      
      </div>
      </div>
      
    
    
    </div>
  );
}

export default ColorToggleButton;