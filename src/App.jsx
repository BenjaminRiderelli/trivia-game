import { useState } from 'react'
import Intro from './components/Intro/Intro.jsx'
import Question from './components/Question/Question.jsx'
import { nanoid } from 'nanoid'
import './App.css'
import topBlob from './assets/blobs.png'
import bottomBlob from './assets/bottomBlob.png'
import {mixAnswers, decodeHTMLEntities } from './utils.js'

function App() {
  
  const [questions, setQuestions] = useState()
  const [gameFinished, setGameFinished] = useState(false)
  const [gameScore, setGameScore] = useState(0)

  function getQuestionWithAnswers(question){
    const allAnswers = []
    const id = nanoid()

    const incorrectAnswers = question.incorrect_answers.map(incorrectAnswer => {
      return  {
        answer:decodeHTMLEntities(incorrectAnswer), 
        id:nanoid(), 
        isCorrect:false,
        selected:false,
        questionId:id
      }
      })
  
    const correctAnswer = {
    answer:question.correct_answer, 
    id:nanoid(),
    isCorrect:true,
    selected:false,
    questionId:id
    }


    incorrectAnswers.forEach(incorrectAnswer => allAnswers.push(incorrectAnswer))
    allAnswers.push(correctAnswer)

    mixAnswers(allAnswers)

    return {...question, id:id, allAnswers:allAnswers}
  }



  function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=4&type=multiple")
      .then(res => res.json())
      .then(data => {
         const results = data.results      
         const questionsWithAnswers = results.map(result => getQuestionWithAnswers(result))
         setQuestions(questionsWithAnswers)
         
      })
      .catch(err => alert(err))
  }



  function toggleFn(questionId, id) {
    setQuestions(prevQuestions => {
      return(
        prevQuestions.map(prevQuestion => {
          if (prevQuestion.id === questionId){            
            const answers = prevQuestion.allAnswers
            const newAnswers =  answers.map(answer => {  
                  if (answer.id === id){
                    return {...answer, selected: !answer.selected}
                  } else{
                    return {...answer, selected: false}
                  }
                })  
              return {...prevQuestion, allAnswers:newAnswers}                       
              } else {
                return prevQuestion
              }              
        })
      )
    })
    
  }


  function checkAnswers(){

  const checkedQuestions = questions.map(question => {
      const answers = question.allAnswers
      const checkedAnswers= answers.map (answer =>{

        const isCorrect = answer.isCorrect
        const isSelected = answer.selected

        if(isCorrect && isSelected){
          setGameScore(prevGameScore => prevGameScore + 1)
          return {...answer, checked:true}
        } else {
          return {...answer, checked:false}
        }

      })  
    return {...question, allAnswers:checkedAnswers}
    })
  setGameFinished(true)
  setQuestions(checkedQuestions)
  }


  function restartGame(){
    setGameFinished(false)
    getQuestions()
    setGameScore(0)

  }

  
  
  const questionElements = questions ?  questions.map(question =>  {
      return(
        <Question
        id={question.id}
        key={question.id}
        question={decodeHTMLEntities(question.question)}
        answers={question.allAnswers}
        toggleFn={toggleFn}
        gameFinished={gameFinished}    
        />
      )
    })
    : 
    []



//App display    
return (
<main className="main-container">
  <img src={topBlob} className="topBlob" />

  {     
    questions ?
    <>

      <div className="questions-container">
        {questionElements}
      </div>

      <div className="footer">
        {      
          gameFinished?

          <>
          <p className="score">{gameScore + "/5"}</p>
          <button
          onClick={restartGame}
          >Restart Game
          </button>
          </>
          
          :

          <button
          onClick={checkAnswers}
          >Check Answers
          </button>
          
        }
      </div>

    </>
      :
    <Intro
    getQuestions={getQuestions}
    />
  }

  <img src={bottomBlob} className="bottomBlob" />
</main>
  )
}

export default App
