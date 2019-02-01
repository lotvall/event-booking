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

})

const EventItem = ({classes, _id, title, price, date, description, }) => {
  return (
    <div className={classes.eventitems}>
    <div className="row">
      <div className="col-md-9">
      <h4>{title}</h4>
      <p>Date: <Moment format="YYYY-MM-DD HH:mm">{date}</Moment></p>
      <p>Price: ${price}</p>
      <p>{description}</p>
      </div>
      <div className="col-md-3">
      </div>

    </div>

    </div>
  )
}
export default withStyles(style)(EventItem)