import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal'
import Backdrop from '../components/Backdrop';
import EventItem from '../components/EventItem'
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner'


// import gql from 'graphql-tag'
// import { Query } from 'react-apollo'

const styles= {
  events: {
    textAlign:'center',
    border:'1px solid #5101d1',
    padding: '2rem 0rem',
    margin: '1rem auto',
    marginTop: '1rem',
    width:'30rem',
    maxWidth:'80%',
  },
  button: {
    background: '#5101d1',
    font: 'inherit',
    color: 'white',
    border: '1px solid #5101d1',
    borderRadius: 3,
    padding: '0.5rem 1rem',
    boxShadow:'1px 1px 5px rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    '&:hover': {
      color: '#6219d6'
    },
    '&.active': {
      color: '#6219d6'
    },
  }
}

// const EVENTS_QUERY = gql`
//   query EventsQuery {
//     events {
//       _id
//       title
//       description
//       date
//       price
//       creator {
//         email
//         _id
//       }
//     }
//   }
// `

class EventsComponent extends Component { 
  state = {
    creating:false,
    events: [],
    isLoading: false
  }

  static contextType = AuthContext
  constructor(props) {
    super(props)
    this.titleEl = React.createRef()
    this.priceEl = React.createRef()
    this.dateEl = React.createRef()
    this.descriptionEl = React.createRef()

  }

   componentDidMount() {
    this.getAllEvents()
  }

  openCreateEvent = () => {
    this.setState({
      creating:true,
    })
  }
  cancelCreateEvent = () => {
    this.setState({
      creating:false,
    })
  }
  getAllEvents = async () => {
    this.setState({
      isLoading: true
    })
    const request = {
      query: ` 
        query {
          events{
            _id
            title
            description
            date
            price
            creator {
              email
              _id
            }
          }
        }
      `
    }

    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.status !== 200 && res.status !== 201) {
        throw new Error ('Failed')
      }
      const data = await res.json()

      const events = data.data.events
      console.log(this.state)
      this.setState({
        events,
        isLoading:false
      })

      console.log(this.state.events)
    } catch(err) {
      console.log(err)
      this.setState({
        isLoading:false
      })
      throw err
    }

  }
  submitCreateEvent = async () => {

    const title = this.titleEl.current.value
    const price = +this.priceEl.current.value
    const date = this.dateEl.current.value
    const description = this.descriptionEl.current.value

        // add if statement to check if l > 0 for all variables

    const createdEvent ={
      title,
      price,
      date,
      description
    }


    console.log(createdEvent)

    const request = 
    {
      query: ` 
        mutation {
          createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
            _id
            title
            description
            date
            price
            creator {
              email
              _id
            }
          }
        }
      `
    }
    console.log(request.query)

    const token = this.context.token
    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      if(res.status !== 200 && res.status !== 201) {
        throw new Error ('Failed')
      }
      const data = await res.json()
      console.log(data.data)

      const createdEvent = data.data.createEvent

      this.setState((prevState) => ({
        creating:false,
        events: [...prevState.events, createdEvent]
      }))

    } catch(err) {
      console.log(err)
      throw err
    }

    
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        {
          this.state.creating && <Backdrop />
        } 
        {
          this.state.creating && (
            <Modal title="Add Event" titleEl={this.titleEl} priceEl={this.priceEl} dateEl={this.dateEl} descriptionEl={this.descriptionEl} canCancel canCreate onCancel={this.cancelCreateEvent} onSubmit={this.submitCreateEvent} />
          )
        }
      {
        this.context.token && 
        <div className={classes.events}>
          <button className={classes.button} onClick={this.openCreateEvent}>Create Event</button>
        </div>
      }
      {
        this.state.isLoading ?
        <Spinner />
        :
        this.state.events.map(event => {
          return  <EventItem key={event._id} 
            title={event.title} 
            price={event.price} 
            date={event.date} 
            description={event.description } 
            userId = {this.context.userId}
            creatorId = {event.creator._id}
            token={Boolean(this.context.token)}
          />
        })
      }


      </>
    )
  }
}

export default withStyles(styles)(EventsComponent)
