import React from "react"
import Answer from "../Answer/Answer.jsx"
import './Question.css'



export default function Question(props){
 
    
    const allAnswers = props.answers
    const allAnswersElements = allAnswers.map(answer => {     

        return(
        <>
            <Answer
            key={answer.id}
            id={answer.id} 
            answer={answer.answer}
            isCorrect={answer.isCorrect}
            selected={answer.selected}
            questionId={answer.questionId}
            toggleFn={props.toggleFn}
            gameFinished={props.gameFinished}            
            />
        </>
      )
    })




     
    



    return(
        <div className="question-container" id={props.id}>
            <h4 
            className="question">{props.question}</h4>
            <div className="answers-container">
                {allAnswersElements}
            </div>
        </div>
    )
}