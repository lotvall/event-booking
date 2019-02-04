import React, { Component } from 'react';
import Spinner from '../components/Spinner'
import BookingItem from '../components/BookingItem'
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
      <h1>The BookingsComponent</h1>

      {
        this.state.isLoading ?
        <Spinner />
        :
        this.state.bookedEvents.map(event => {
          console.log(event)
          return <p>a booking item</p>//<BookingItem />
        })
      }
      </>
    )
  }
}

export default BookingsComponent
