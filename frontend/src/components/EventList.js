import React from 'react';
import EventItem from './EventItem'
const EventList = ({bookedEvents, token, onCancelBooking}) => {
    return bookedEvents.map(bookedEvent => {
        return <EventItem key={bookedEvent._id} token={token} title={bookedEvent.event.title} price={bookedEvent.event.price} bookingId={bookedEvent._id} onCancelBooking={onCancelBooking}/>
    })
}

export default EventList