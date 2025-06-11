const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
//const password = 'Password123'

  console.log('given password '.$password)
  
const url =`mongodb+srv://Admin:${password}@cluster0.oxuvnin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

//const url =`mongodb+srv://Admin:Password@cluster0.oxuvnin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})