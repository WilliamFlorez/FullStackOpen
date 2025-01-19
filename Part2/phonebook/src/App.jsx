import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([''])
  const [busq, Setbusq] = useState('')
  const [newname, setNewName] = useState('')
  const [newnumb, setNewNumb] = useState('')
  const baseURL = 'http://localhost:3001/persons'
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
          Update(newnumb,numID)
          return
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
      
      <h1>Add a new</h1>
      <PersonForm/>
      <h2>Numbers</h2>
          <Listar   value ={busq}/>
      
          </div>
  )
}

export default App