import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'
const App = () => {
  const [persons, setPersons] = useState([''])
  const [busq, Setbusq] = useState('')
  const [newname, setNewName] = useState('')
  const [newnumb, setNewNumb] = useState('')
  const [errorMessage, setErrorMessage] = useState({type:'',message :''})
  
/*  const baseURL = 'http://localhost:3001/persons'*/
//URL PART3
const baseURL = 'http://localhost:3001/api/persons'
const getAll = () =>{
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
      useEffect (() =>{
        axios.get(baseURL).then(
          response =>{
            console.log("using useEffect || "+response.data)
            setPersons(response.data)
          }
        )},[]
      )

const AddPerson = (props) => {
  props.preventDefault()
  console.log("AXIOS name :: "+ newname)
  console.log("AXIOS numb :: "+ newnumb)
      if(persons.some(person => person.name === newname)){
          const indice = persons.findIndex(person => person.name === newname);
          const numID = persons[indice].id 
          alert(`${newname} is already added to phonebook`)
              setErrorMessage({type:'error',message:`actualizando valor ${newname}`})
          Update(newnumb,numID)
          return
      }else{
        setErrorMessage({type:'success',message:`nuevo valor ${newname}`})
      }
      
      const maxId = Math.max(...persons.map(response => Number(response.id)))
      const newId = maxId + 1

      const personObject = {
            name : newname,
            number : newnumb,
            id : newId.toString()
      }

      axios.post(baseURL,personObject).then(response =>{
        setPersons(persons.concat(response.data))
      })

      setNewName('')
      setNewNumb('')
}

const Notification = ({type, message }) => {
        if(!message ){return null}

        const notificationStyle = type === 'error' ? 'error' :'success'

        return (
          <div className={notificationStyle}>{message}</div>
        )

}

    const PersonForm = () =>{
      return (
              <form onSubmit={AddPerson}>
                <div>
                  name: <input value={newname}
                            onChange={HandleChangeName}/>
                  <br/>
                  number: <input value={newnumb}
                              onChange={HandleChangeNumb}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
              </form>
      )      
    }
    const DeleteUser = (props) =>{
      console.log("Borrar||"+ props.target.value)
      const DelURL =baseURL+"/"+ props.target.value

      setErrorMessage({type:'error',message:`Borrado valor ${persons.find(person => person.id === props.target.value).name}`})
  
      axios.delete(DelURL).then(() => {
        console.log("BORRADO")
        setPersons(persons.filter(person => person.id !== props.target.value))
      })
    }

    const Update = (numupdate, numID) => {
     const UpdateData = { number : numupdate }
      axios.patch(baseURL+"/"+numID,UpdateData)
      .then(response =>{
            console.log('Update USER')
            setPersons(persons.map(person => person.id === numID ? { ...person, number: numupdate } : person))
     
      })

    }
    const Listar = (props) =>{

        const resultados = props.value ?
               persons.filter(
                    person =>  person.name.toLowerCase().includes(props.value.toLowerCase())
                )
              : persons

        return (
          <div>
             {resultados.map( (person,index) =>{return <div key={index} >{person.name +"||"+ person.number}
                <button key={person.id} onClick={DeleteUser} value={person.id}>eliminar </button>
             </div>})}
          </div>
        )

    }
  
    const HandleChangeBusq = (event) =>{
      console.log("Nombre Busq:: "+event.target.value)
      Setbusq(event.target.value)
    }

    const HandleChangeName = (event) =>{
      console.log(event.target.value)
      setNewName(event.target.value)
    }
    const HandleChangeNumb = (event) =>{
        console.log(event.target.value)
        setNewNumb(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
        buscar <input value ={busq} onChange={HandleChangeBusq}/><br></br>
      
      <Notification type={errorMessage.type} message={errorMessage.message} />
           
      <h1>Add a new</h1>
      <PersonForm/>
      <h2>Numbers</h2>
          <Listar   value ={busq}/>
      
          </div>
  )
}

export default App