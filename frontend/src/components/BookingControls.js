import React from 'react'
import { withStyles } from '@material-ui/core';
const styles = theme => ({
    root: {
        textAlign: 'center',
        padding:'0.5rem',
    },
    button: {
        font:'inherit',
        border:'none',
        background: 'transparent',
        color: 'black',
        padding: '0.25rem 1rem',
        borderBottom: '2px solid transparent',
        cursor: 'pointer',

        '&:focus': {
            outline:'none'
        },
        '&:hover': {
            color: '#5101d1',
            background: '#ffffff',
            borderRadius: 5,
        },
    },
    activeButton: {
        font:'inherit',
        border:'none',
        background: 'transparent',
        color: '#5101d1',
        padding: '0.25rem 1rem',
        borderBottom: '2px solid #5101d1',
        cursor: 'pointer',
        '&:focus': {
            outline:'none'
        },
    }
})

const BookingControls = ({ classes, bookedEvents, onOutputSelect, outputType }) => {
    
    return (
        <div className={classes.root}>
            <button className={outputType=== 'list' ? classes.activeButton : classes.button} onClick={() => onOutputSelect('list')}>Bookings</button>
            <button className={outputType=== 'chart' ? classes.activeButton : classes.button} onClick={() => onOutputSelect('chart')}>Chart</button>
        </div>
    )
}

export default withStyles(styles)(BookingControls)