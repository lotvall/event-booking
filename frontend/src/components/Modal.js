import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    modal: {
        width: '90%',
        background: 'white',
        boxShadow:'0 2px 8px rgba(0,0,0,0.26)',
        position: 'fixed',
        height:'80%',
        left: '5%',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
            left:'calc( (100% - 50rem) / 2)',
            height:'auto',
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
        width:'20%',
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

      },
      modalform: {
        width: '40rem',
        maxWidth: '80%',
        margin: '1rem auto',
      },
      formcontrol: {
        marginBottom: '1rem'
      },
      label: {
        width: '100%',
        marginBottom: '0.5rem',
        display: 'block'
      },
      input: {
        width: '100%',
        display: 'block',
        height:'2rem',
        fontSize: '100%',
        background: 'white !important',
      },
      

})
const modal = ({classes, title, canCancel, canCreate, onCancel, onSubmit, titleEl, priceEl, dateEl, descriptionEl}) => (
    <div className={classes.modal}>
        <header className={classes.modalheader}>{title}</header>
        <section className={classes.modalcontent}>

            <form className={classes.modalform}>
                <div className={classes.formcontrol}>
                    <label htmlFor="title" className={classes.label}>Title</label>
                    <input type="text" id="title" ref={titleEl} className={classes.input}></input>
                </div>
                <div className={classes.formcontrol}>
                    <label htmlFor="price" className={classes.label}>Price</label>
                    <input type="number" id="price" ref={priceEl} className={classes.input}></input>
                </div>
                <div className={classes.formcontrol}>
                    <label className={classes.label} htmlFor="date" >Date</label>
                    <input className={classes.input} type="datetime-local" id="date" ref={dateEl}></input>
                </div>
                <div className={classes.formcontrol}>
                    <label className={classes.label} htmlFor="description" >Description</label>
                    <textarea className={classes.input} id="description" rows="3" ref={descriptionEl}></textarea>
                </div>
            </form>

        </section>
        <section className={classes.modalactions}>
            {canCancel && <button className={classes.button} onClick={onCancel}>Cancel</button>}
            {canCreate && <button className={classes.button} onClick={onSubmit}>Create Event</button>}
        </section>
    </div>
)

export default withStyles(styles)(modal)