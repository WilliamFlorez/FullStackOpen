const Header = (props) => {
  /* console.log(props.course.name)*/
   return ( <h1> {props.course.name}</h1>  )
 }
 const Content = (props) => { 
   return(
         <div>
               <Part part ={props.cont.parts[0].part} exercise = {props.cont.parts[0].exercise} />
               <Part part ={props.cont.parts[2].part} exercise = {props.cont.parts[1].exercise} />
               <Part part ={props.cont.parts[1].part} exercise = {props.cont.parts[2].exercise} />
         </div>
     )
 }
 const Part  = (props) => {
   return(
         <div>
             {props.part} {props.exercise}
             
         </div>
     )
 }
 
 const Total = (props) => {
   return (
     <div>
       <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
     </div>
   )
 }
 
 
 const App = () => {
 
       const info ={
         name: 'Half Stack application development',
         parts:[ 
         {part : 'Fundamentals of React' , exercise : 10},
         {part : 'Using props to pass data' , exercise : 7 },
         {part : 'State of a component' , exercise : 14}
               ]
             }
             
 
   return (
     <div>
       
         <Header course={info}/>
         <Content cont = {info}/>
         <Total exercises1={info.parts[0].exercise} exercises2 ={info.parts[1].exercise} exercises3 ={info.parts[2].exercise}  />
     
     
     </div>
 
     
   )
 }
 
 export default App