import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PromiseProvider } from 'mongoose';

const styles = theme => ({
    modal: {
        width: '90%',
        background: 'white',
        boxShadow:'0 2px 8px rgba(0,0,0,0.26)',
        position: 'fixed',
        top: '20vh',
        left: '5%',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
            left:'calc( (100% - 50rem) / 2)'
          }
    },
    modalheader: {
        padding: '1rem',
        background: '#5101d1',
        color: 'white',
        fontSize: '1.25rem',
    },
      
    modalcontent: {
        padding: '1rem',
    },
    modalactions: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
    },
    button: {
        background: '#5101d1',
        font: 'inherit',
        color: 'white',
        border: '1px solid #5101d1',
        borderRadius: 3,
        padding: '0.5rem 1rem',
        marginRight:'1rem',
        boxShadow:'1px 1px 5px rgba(0, 0, 0, 0.26)',
        cursor: 'pointer',
        '&:hover': {
          color: '#6219d6'
        },
        '&.active': {
          color: '#6219d6'
        },
      }

})

const modal = ({classes, title, children, canCancel, canCreate, onCancel, onSubmit}) => (
    <div className={classes.modal}>
        <header className={classes.modalheader}>{title}</header>
        <section className={classes.modalcontent}>
            {children}
        </section>
        <section className={classes.modalactions}>
            {canCancel && <button className={classes.button} onClick={onCancel}>Cancel</button>}
            {canCreate && <button className={classes.button} onClick={onSubmit}>Create Event</button>}
        </section>
    </div>
)

export default withStyles(styles)(modal)