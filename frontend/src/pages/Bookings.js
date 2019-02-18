import React, { Component } from 'react';
import Spinner from '../components/Spinner'
import EventItem from '../components/EventItem'
import AuthContext from '../context/AuthContext';
import EventList from '../components/EventList'


class BookingsComponent extends Component {

  state = {
    bookedEvents: [],
    isLoading: false
  }
  static contextType = AuthContext


  componentDidMount() {
    this.getAllBookings()
  }
  handleCancelBooking = async (bookingId) => {

    const request = {
      query: ` 
        mutation CancelBooking($id : ID!) {
          cancelBooking(bookingId: $id){
            _id
            title
            date
          }
        }
      `,
      variables: {
        id: bookingId
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

      this.setState(prevState => ({
        bookedEvents: prevState.bookedEvents.filter(booking => booking._id !== bookingId)
      }))

    }catch(error) {
      console.log(error)
      throw(error)
    }

    return
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
        throw new Error ('Failed, doesnt respond with 200/201')
      }
      const data = await res.json()
      const bookedEvents = data.data.bookings
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

    let content = <Spinner/>

    if(!this.state.isLoading) {
      content = (
          <EventList 
            bookedEvents = {this.state.bookedEvents} 
            token={Boolean(this.context.token)}
            onCancelBooking={this.handleCancelBooking}
          />
      )
    }
    return (
      <>
        {content}
      </>
    )
  }
}

export default BookingsComponent
