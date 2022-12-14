import React from "react"
import './Intro.css'

export default function Intro(props){



    return (
        <>
            <h1>Quizzical</h1>
            <h2>Test your inner wikipedia 📖</h2>
            <button
            onClick={props.getQuestions} 
            className="start-quiz-btn"
            >Start Quiz</button>
        </>

        )
}


