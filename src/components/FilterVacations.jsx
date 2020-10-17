import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FilterVacations({show , setshow}) {
    
    const handleChange = event => {
        setshow(event.target.value)
    }

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter Results</FormLabel>
                <RadioGroup  name="show" value={show} onChange={handleChange}>
                    <FormControlLabel value="All" control={<Radio />} label="All" />
                    <FormControlLabel value="Followed" control={<Radio />} label="Followed" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}
