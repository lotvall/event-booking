import React, { Component } from 'react';
import Spinner from '../components/Spinner'

class BookingsComponent extends Component {
  getAllBookings = async () => {
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

      const bookings = data.data.bookings
      this.setState({
        bookings,
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
      <h1>The BookingsComponent</h1>

      {
        this.state.isLoading ?
        <Spinner />
        :
        this.state.bookings.map(event => {
          return  <BookingItem 
            key={event._id}
            eventId={event._id}
            title={event.title} 
            price={event.price} 
            date={event.date} 
            description={event.description } 
            userId = {this.context.userId}
            creatorId = {event.creator._id}
            token={Boolean(this.context.token)}
            onCancelBooking={this.CancelBooking}
            
          />
        })
      }
      </>
    )
  }
}

export default BookingsComponent
