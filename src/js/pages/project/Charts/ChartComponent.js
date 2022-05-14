import React from 'react'

const ChartComponent = ({match}) => {
    const id = match.params.tickerId;
    console.log(id)
    return (
        <div>ChartComponent</div>
    )
}

export default ChartComponent