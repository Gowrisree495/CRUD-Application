import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const UserDetails = () => {
const[usersData,setUsersData] =  useState({});
const {id} = useParams();
useEffect(() => {
 axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res)=>{setUsersData(res.data)}).catch((err)=>console.log(err)
 );

}, [id])
const keys = Object.keys(usersData)

  return (
    <div>
      {keys.map((item,i)=>{
        if(typeof(usersData[item]) === 'object'){
          return (
            Object.keys(usersData[item])).map((val,j)=>{
           return (typeof(usersData[item][val]) === 'object') ? null : <h1 key={j}>{val}-{usersData[item][val]}</h1>
        }
        )
          
        }else{
          return (<h1 key={i}>{item}-{usersData[item]}</h1>)
        }
        })}
    </div>
  )
}

export default UserDetails