import React from 'react'
import { useState,useEffect,useContext } from 'react'
import finnHub from '../apis/finnHub'
import { useNavigate } from 'react-router-dom'
import {BsFillCaretDownFill} from "react-icons/bs"
import {BsFillCaretUpFill} from "react-icons/bs"
import { WatchListContext } from '../context/watchListContext'

export const Stocklist = () => {
    const [stock,setStock] = useState([])
    const {watchList,setWatchList,deleteStock} = useContext (WatchListContext)
    const navigate=useNavigate()
    const changeColor =(change)=>{
    return    change>0 ? `success` : `danger`
    }

    useEffect(()=>{
        let isMounted = true
        const fetchData= async ()=>{
            const responses =[]
            try{

         const responses = await Promise.all(watchList.map((stock)=>{
            return finnHub.get("quote",{
                params :{
                    symbol: stock
                }
            })
         }))

            
           const data =  responses.map((response)=>{
             return   {
                      data: response.data,
                symbol: response.config.params.symbol
            }
              
             })
            
             if(isMounted){
                 setStock(data)
             }
            
            }
            catch(err){}
        }
        fetchData()
        return ()=>{ isMounted = false}
    },[watchList])

    const handleStockSelect=(symbol)=>{
        navigate(`detail/${symbol}`)
    }
  return (
    <div>
        <table className='table hover mt-5'>
            <thead style={{color:"rgb(79,89,102)"}}>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Last</th>
                    <th scope='col'>Chg</th>
                    <th scope='col'>Chg%</th>
                    <th scope='col'>High</th>
                    <th scope='col'>Low</th>
                    <th scope='col'>Open</th>
                    <th scope='col'>Pclose</th>
                </tr>
                
                       
            </thead>
            <tbody>
                 { stock.map((stockData)=>{return  <tr style={{cursor:"pointer"}} onClick={()=>handleStockSelect(stockData.symbol)} className='table-row' key={stockData.symbol}> 
                        <th style={{color:"rgb(79,89,102)"}} scope='row'>{stockData.symbol}</th>
                        <td >{stockData.data.c}</td>
                        <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{stockData.data.d <0? <BsFillCaretDownFill/> : <BsFillCaretUpFill/>}</td>
                        <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{stockData.data.dp <0? <BsFillCaretDownFill/> : <BsFillCaretUpFill/>}</td>
                        <td >{stockData.data.h}</td>
                        <td >{stockData.data.l}</td>
                        <td>{stockData.data.o}</td>
                        <td>{stockData.data.pc} <button onClick={(e)=>{
                            e.stopPropagation()
                                deleteStock(stockData.symbol)
                        }} className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'>Remove</button></td>
                       
                         </tr> })}    
            </tbody>
           
        </table>
        </div>
  )
}

