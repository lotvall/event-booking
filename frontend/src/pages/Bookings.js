import React, { Component } from 'react';
import Spinner from '../components/Spinner'
import EventItem from '../components/EventItem'
import AuthContext from '../context/AuthContext';


class BookingsComponent extends Component {

  state = {
    bookedEvents: [],
    isLoading: false
  }
  static contextType = AuthContext


  componentDidMount() {
    this.getAllBookings()
  }

  getAllBookings = async () => {
    this.setState({
      isLoading: true
    })
    const request = {
      query: ` 
        query {
          bookings{
            _id
            user {
              email
            }
            event {
              title
              date
              price
            }
            createdAt
            updatedAt

          }
        }
      `
    }
    const token = this.context.token
    console.log('token works', token)

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
      const bookedEvents = data.data.bookings
      console.log('bookedEvents', bookedEvents)
      this.setState({
        bookedEvents,
        isLoading:false
      })

    } catch(error) {
      console.log(error)
      this.setState({
        isLoading:false
      })
      throw error
    }

  }
  render() {
    return (
      <>
      {
        this.state.isLoading ?
        <Spinner />
        :
        this.state.bookedEvents.map(bookedEvent => {
          console.log(bookedEvent)
          return <EventItem key={bookedEvent._id} title={bookedEvent.event.title} price={bookedEvent.event.price} />
        })
      }
      </>
    )
  }
}

export default BookingsComponent
