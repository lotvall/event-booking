import React from 'react'
import { Bar as BarChart } from 'react-chartjs'

const CATEGORIES = {
    cheap: {
        min:0,
        max: 10,
    },
    normal: {
        min: 10,
        max: 100,
    },
    expensive: {
        min: 100,
        max: 1000000000
    },
}

const BookingsChart = ({ bookedEvents }) =>{

    const chartData = {labels: [],  datasets:[ ]}
    let values = []
    for (const category in CATEGORIES) {
        const filteredBookingsCount = bookedEvents.reduce((prev, current)=>{
            if (current.event.price > CATEGORIES[category].min && current.event.price <= CATEGORIES[category].max) {
                return prev + 1
            } else {
                return prev
            }
        }, 0 )
        values.push(filteredBookingsCount)
        chartData.labels.push(category)
        chartData.datasets.push({
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: values
        })
        values=[...values]
        values[values.length - 1] = 0

    }
    console.log(chartData)

    return <div style={{display: 'flex', justifyContent:'center'}}><BarChart data={chartData}/></div>
} 

export default BookingsChart