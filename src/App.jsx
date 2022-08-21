import { useEffect, useState } from 'react'
import './App.css'
import Dice from './components/Dice'

function App() {

  const [dicesData, setDicesData] = useState([])
  const [isOver, setIsOver] = useState(false)


  function getRandomNumber(){
    return Math.round((Math.random()*5)+1)
  }


  useEffect(() => {
    setIsOver(dicesData.every(dice => {
      return dice.number === dicesData[0].number && dice.isClicked
    }))
  }, [dicesData])
  

  function Start(){
    const newDices = []
    for(let i = 0; i<10; i++){
      newDices[i] = {
        key: i,
        id: `dice ${i}`,
        isClicked: false,
        number: getRandomNumber()
      }
    }
    setDicesData(newDices)
  }


  useEffect(() => {
    Start()
  }, [])


  function getDices(){
    setDicesData(dicesData.map(dice => {
        const {isClicked, number} = dice
        
        return {
          ...dice,
          number: isClicked ? number : getRandomNumber()
        }
    }))
  }

  function lockDice(id){
    setDicesData(prevDicesData => {
      const updatedDices = prevDicesData.map(dice => {
        if(id !== dice.id){
          return dice
        }else{
          return { ...dice, isClicked: !dice.isClicked}
        } 
      })
      return updatedDices
    })
  }


  const dices = dicesData.map(dice => {
    return <Dice 
      key={dice.key}
      id={dice.id}
      isClicked={dice.isClicked}
      number={dice.number}
      lock={lockDice}
    />
  })

  return(
    <main className="app">
      <h1 className='title'>Tenzies</h1>
      <p className='rules'>
        Roll until all dice are the same.
        Click each die to freeze ot at its 
        current value between rolls.      
      </p>
      {isOver ? 
      <div className='game'>
        <div className='end'>You won!</div>
        <button className='roll' onClick={Start}>Roll again</button>
      </div>
      
      :
      <div className='game'>
      <div className='dices'>
        {dices}
      </div>
      
      <button 
        className='roll'
        onClick={getDices}
      >
        Roll
      </button>
      </div>
    }
    </main>
  )  
}

export default App
