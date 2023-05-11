import React from 'react'
import {useState,useEffect,useContext} from "react"
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/watchListContext'


export const AutoComplete = () => {
  const [search,setSearch] = useState('')
  const [results,setResults]= useState([])
  const {watchList,setWatchList,addStock,deleteStock} = useContext (WatchListContext)


  const renderDropDown=()=>{

  return  search.length >0 ? 'show' : null
  }
  

  useEffect(()=>{
    let isMounted =true
    const fetchData= async()=>{
      try{
       const response = await  finnHub.get("/search",{
        params:{
          q:search
        }
       })
       
       if (isMounted){
         setResults(response.data.result)
       }
      
      }catch{}
    }
    if(search.length > 0){fetchData()}else{setResults([])}
    return ()=>{ isMounted = false}

  },[search])

  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating deopdown'>
        <input style={{backgroundColor:"rgba(145,158,171,0.04)"}} id='search' type='text' className='form-control'
         placeholder='search' autoComplete='off' value={search} onChange={(e)=>
         setSearch(e.target.value)}/>
         <label htmlFor='search'>Search</label>
         <ul style={{
          height:"250px",
          overflow:"scroll",
          overflowX:"hidden",
          cursor:"pointer"
         }} className={`dropdown-menu ${renderDropDown()}`}>
          {results.map((result,symbol)=>{

       return     <li onClick={()=>{
        addStock(result.symbol)
        setSearch('')
      }} className='dropdown-item' key={result.symbol}>{result.description}({result.symbol})</li>
          })}
          
          
         </ul>
      </div>
    </div>
  )
}

