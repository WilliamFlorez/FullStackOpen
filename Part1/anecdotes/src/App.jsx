import { useState } from 'react'

const Tale = (props) =>{
      var anecdotes = props.anecdotes      
      var rand = props.rand
      const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)); 
      
      const Votar =()=>{     
          const votePoints = [...votes];
            votePoints[rand]+=1
            setVotes(votePoints)
       }
       const Popular =()=>{
            const max = votes.indexOf( Math.max(...votes))
            return (<div>
                    <h1>Anecdote with most votes</h1>
                        {anecdotes[max]}
                    </div>)
       }
          return (
            <div>
              {anecdotes[rand]}
              <br/>
              <button onClick={Votar}>vote {votes[rand]}</button>
              <Popular />
            </div>
          )
}

const Structure = (props) => {
  const [rand, setRand] =useState(Math.floor(Math.random() * props.anecdotes.length))
  
  const Next = () => {   
    setRand(Math.floor(Math.random() * props.anecdotes.length)); 
  }

    return (
        <div>
          <Tale anecdotes={props.anecdotes} rand ={rand}/>
          <button onClick={Next}>next anecdote</button>      
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Structure anecdotes={anecdotes} />
      <br/>
    </div>
  )
}

export default App