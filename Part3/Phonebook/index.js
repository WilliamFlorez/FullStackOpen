const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const path = require('path'); // Añade esto al inicio del archivo
// Sirve archivos estáticos desde la carpeta 'dist' dentro de 'Phonebook'
app.use(express.static(path.join(__dirname, 'dist')));
// otra forma
//app.use(express.static('./dist'));  // Usa './dist' para referirse a la carpeta actual

/*MIDDleware */
app.use(express.json()) /*to be able to obtain BODY using request */
app.use(cors()) /*to be able to use the server from another domain */
morgan.token('dato', (request) => 
  { return request.method === "POST" ? JSON.stringify(request.body) :" " })


app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :dato")
)


let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const IdMax = () => {
   //* const maxId = Math.max(...data.map(n => n.id))
   //return maxId + 1 
      return Math.floor( Math.random() * (10000 -10) + 10 )
}
const requestLogger = (request, response, next) =>{
  console.log('Method',request.method)
  console.log('Path',request.path)
  console.log('Body',request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


/*MIDDLEWARE */
app.use(requestLogger) /* EJECUTA REQUESTLOGGER */





app.get('/api/persons',(request, response) =>{
    response.json(data)
})
app.get('/api/persons/:id',(request, response) =>{
   const id = request.params.id
   const person = data.find(data => data.id === id)
    if(!person){response.status(404).end()}
    response.json(person)
})

app.get('/',(request, response) =>{
    response.send("<h1>PHONEBOOK</h1>")
})

app.get('/info',(request, response) =>{
    const count = data.length
    response.send(`<h1>Phonebook has info for ${count} people</h1><br/>
                    <h2>${new Date()}</h2>`)    
})

app.delete('/api/persons/:id',(request, response)=>{
        const id = String(request.params.id)
        data = data.filter(note => note.id !== id )
        response.json(data)
})

app.post('/api/persons',(request,response)=>{
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({error:"name or number is missing"})
    }
    if(data.find(dato => dato.name === body.name )){
        return response.status(400).json('error:name already exists')
    }

    const person ={
      "id": String(IdMax()),
      "name":body.name, 
      "number": body.number
    }
    data= data.concat(person)
    response.json(person)

})







app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}/api/persons`)
})
