import React from 'react'
import './Answer.css'


export default function Answer(props){
    
    const answerId = props.id
    const selected = props.selected
    const questionId = props.questionId
    const isCorrect = props.isCorrect
    const gameFinished = props.gameFinished
    let bgColor = "" 
    let opacity = 1
    let cursor = "pointer"
    
    if (selected && !gameFinished){
        bgColor = "#D6DBF5"
        } else if(gameFinished && isCorrect){
        bgColor = "#94D7A2"
        } else if(selected && gameFinished && !isCorrect){
        bgColor ="#F8BCBC"
        opacity = 0.5
        } else if(!selected && gameFinished) {
        bgColor = ""
        opacity = 0.5
        }

    const styles ={
        backgroundColor: bgColor,
        opacity: opacity,
        cursor: !gameFinished ? "pointer" : "not-allowed"
        }

    return (
        <>
        <p
        style={styles} 
        className="answer"
        onClick={!gameFinished? () => props.toggleFn(questionId, answerId) : ""}
        >
            {props.answer}
        </p>
        </>
    )
}