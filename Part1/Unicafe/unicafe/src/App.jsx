import { useState } from 'react'

 const Statistics = (props) => {
    let count = props.count[0]
    let countB = props.count[1]
    let countN = props.count[2]
      const average = () => {
            var avg = (count  + (countB* (-1)))/(count + countN + countB)
            return (<div>  <p>average {avg}</p></div>)
      }
      const goodPoints = () => {
          var pos = (count*100)/(count + countB + countN)
          return (<div> <p>positive {pos} %</p>    </div>     ) 
      } 
      return(
        <div> 
            <tr>  <th> {average()}</th> </tr>
            <tr>  <th>   {goodPoints()}</th> </tr>
        </div>
      )
}

function App() {
  const [count, setCount] = useState(0)
  const [countN, setCountN] = useState(0)
  const [countB,setCountB ] = useState(0)

    const setGood = () => { setCount(count + 1)    }
    const setNeutral = () => {setCountN(countN + 1) }
    const setBad = () => {setCountB(countB + 1) }
     

  return (
      <div>
          <h1>Give Feedback</h1>
          <button onClick={setGood }>good</button>
          <button onClick={setNeutral}>neutral</button>
          <button onClick={setBad}>bad</button>

          <h1>STATISTICS</h1>
          <table> 
            <tr>  <th>good</th>     <th>{count}</th> </tr>
            <tr>  <th>neutral</th>  <th>{countN}</th>   </tr>
            <tr>  <th>bad</th>      <th>{countB}</th> </tr>
              
            <Statistics count={[count,countB,countN]}/>
          </table>    
      </div>
  )
}

export default App