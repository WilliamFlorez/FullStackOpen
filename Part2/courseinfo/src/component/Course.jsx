import React, { useEffect, useState } from "react";

const Header = ({nameC}) => {  return (<h1>{nameC}</h1>)}
const Content = ({cont}) => {
  return(
    <div>
      {cont.map(parts => 
      <Parts key={parts.id} name={parts.name} excersice={parts.exercises}/>)}
    </div>
  )
}
const Parts = ({name, excersice}) =>{return(<p>{name} {excersice}</p>)}
const Total = ({value}) => {
  return ( <p>Total of {value.reduce((sum,vals)=>{return sum+=vals.exercises},0)} excercises</p>
 ) }

 const Course = ({course}) => {
   return (
     <div>
         <Header nameC={course.name}/>
         <Content cont = {course.parts}/>
         <Total value = {course.parts}/>
     </div>
   )
 }
 export default Course