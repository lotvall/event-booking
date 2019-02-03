import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
  width:300,
  display:'block',
  margin: 'auto',
  eventitems: {
    textAlign:'center',
    border:'1px solid #5101d1',
    margin: '1rem auto',
    width:'30rem',
    maxWidth:'80%',
    },
    eventheader: {
        padding: '1rem',
        background: '#5101d1',
        color: 'white',
        fontSize: '1.25rem',
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
        marginBottom:'1rem',
        '&:hover': {
          color: '#6219d6'
        },
        '&.active': {
          color: '#6219d6'
        },

      },

})

const EventItem = ({classes, _id, title, price, date, description, token}) => {

  return (
    <div className={classes.eventitems}>
    <div className="row">
      <div className="col-md-9">
        <header className={classes.eventheader}>{title}</header>
        <p>Date: <Moment format="YYYY-MM-DD HH:mm">{date}</Moment></p>
        <p>Price: ${price}</p>
        <p>{description}</p>
      </div>
      <div className="col-md-3">
      {
        token && <section className={classes.eventactions}>
          <button className={classes.button} >Book</button>
        </section>
      }
      </div>

    </div>

    </div>
  )
}
export default withStyles(style)(EventItem)