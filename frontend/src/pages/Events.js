import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal'
import Backdrop from '../components/Backdrop';
import EventItem from '../components/EventItem'
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner'

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

class EventsComponent extends Component { 
  state = {
    creating:false,
    selectedEvent: null,
    events: [],
    bookedEvents: [],
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

  handleDeselectEvent = ( )=> {
    this.setState({
      selectedEvent: null
    })
  }

  handleBookEvent = async (eventId) => {
    const userId = this.context.userId

    const createdBooking ={
      eventId,
      userId
    }
    const request = 
    {
      query: ` 
        mutation BookEvent($eventId : ID!){
          bookEvent(eventId: $eventId) {
            _id
            createdAt
          }
        }
      `,
      variables: {
        eventId
      }
    }
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

      this.setState({
        selectedEvent: null
      })

    } catch(error) {
      console.log(error)
      throw error
    }
  }



  handleViewDetail = (eventId) => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(event => {

        return event._id === eventId
      })
      return {
        selectedEvent
      }
    })
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
      this.setState({
        events,
        isLoading:false
      })

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

    const request = 
    {
      query: ` 
        mutation CreateEvent ($title : String!, $description: String!, $price: Float!, $date: String!){
          createEvent(eventInput: {title: $title", description: $description, price: $price, date: $date}) {
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
      `,
      variables: {
        title,
        description,
        price,
        date
      }
    }

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
          this.state.creating || this.state.selectedEvent && <Backdrop />
        } 
        {
          this.state.creating && (
            <Modal 
            title="Add Event" titleEl={this.titleEl} priceEl={this.priceEl} dateEl={this.dateEl} descriptionEl={this.descriptionEl} canCancel canCreate onCancel={this.cancelCreateEvent} onSubmit={this.submitCreateEvent} 
              
            />
          )
        }
        {
          this.state.selectedEvent && (
            <Modal 
              selectedEvent={this.state.selectedEvent}
              onDeselectEvent={this.handleDeselectEvent}
              onBookEvent={this.handleBookEvent}
            />
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
          return  <EventItem 
            key={event._id}
            eventId={event._id}
            title={event.title} 
            price={event.price} 
            date={event.date} 
            description={event.description } 
            userId = {this.context.userId}
            creatorId = {event.creator._id}
            token={Boolean(this.context.token)}
            onViewDetails={this.handleViewDetail}
            
          />
        })
      }


      </>
    )
  }
}

export default withStyles(styles)(EventsComponent)
