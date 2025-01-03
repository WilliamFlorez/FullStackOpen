import { use } from 'react'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [busq, Setbusq] = useState('')
  const [newname, setNewName] = useState('')
  const [newnumb, setNewNumb] = useState('')

  const AddPerson = (props) => {
          props.preventDefault()
          console.log("name :: "+ newname)
          console.log("numb :: "+ newnumb)
          if(persons.some(person => person.name === newname)){
            alert(`${newname} is already added to phonebook`)
            return
          }
          setPersons(persons.concat({name: newname, number: newnumb}))
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
    const Listar = (props) =>{

        const resultados = props.value ?
               persons.filter(
                    person =>  person.name.toLowerCase().includes(props.value.toLowerCase())
                )
              : persons

        return (
          <div>
             {resultados.map( (person,index) =>{return <div key={index}>{person.name +"||"+ person.number}</div>})}
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