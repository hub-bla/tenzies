import { useEffect, useState } from 'react'
import './App.css'
import Conf from './components/Conf'
import Dice from './components/Dice'

function App() {
  const [dicesData, setDicesData] = useState(Start())
  const [isOver, setIsOver] = useState(false)
  const [rollCounter, setRollCounter] = useState(0)


  function getRandomNumber(){
    return Math.ceil(Math.random()*6)
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
    return newDices
  }


  function newGame(){
    setDicesData(Start())
  }

  
  function getDices(){
    setRollCounter(prevRollCounter => prevRollCounter + 1)
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

        <Conf />
        <div className='end'>You won!</div>
        <div className='end'>You rolled {rollCounter} times</div>
        <button className='roll' onClick={() => { newGame(); setRollCounter(0)}}>Roll again</button>
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
