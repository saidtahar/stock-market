import React from 'react'
import Chart from 'react-apexcharts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const StockChart = ({chartData,symbol}) => {
    const [dateFormat,setDateFormat] =useState("24h")
    const {day,week,year} = chartData
    const determineTimeFormate=()=>{
        switch(dateFormat)
       { case "24h":
       return day
        case "7d":
       return week
        case "1y":
       return year
       default:
        return day

    }
    }
    const color = determineTimeFormate()
    [determineTimeFormate().length -1].y - determineTimeFormate()[0].y >0? "#26C281" : "#ed3419"
    const navigate = useNavigate()
    
    const options ={
        colors:[color],
        title:{
            text:symbol,
            align:"center",
            style:{fontSize:"24px"}
        },
        chart:{
            id:"stock data",
            animations:{
                speed:1300
            }
        },
        xaxis:{
            type:"datetime"
        }
    }
    const series= [{name:symbol,
    data:determineTimeFormate()}]
    const handleGoBack=()=>{
        
        
            return   navigate("/")
           
    }

   const renderSelectedbutton=(button)=>{
    const classes = "btn m-1"
    if (button === dateFormat){
        return classes + "btn-primary"
    }else{
        return classes + "btn-outline-primary"
    }
   }
  return (
    <div className='mt-5 p-4 shadow-sm bg-white' > 
    <button onClick={handleGoBack} style={{background:'blue'}} className='btn primary-btn'>go back</button>
        <Chart options={options} series={series} type="area" height="500px" width="100%"/>
        <div>
            <button className={renderSelectedbutton("24h")} onClick={()=>{setDateFormat("24h")}}>24h</button>
            <button  className={renderSelectedbutton("7d")} onClick={()=>{setDateFormat("7d")}}>7d</button>
            <button  className={renderSelectedbutton("1y")} onClick={()=>{setDateFormat("1y")}}>1y</button>
        </div>
    </div>
  )
}

export default StockChart