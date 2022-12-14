import React from "react";


export function mixAnswers(allAnswers){
    const shuffledAnswers = allAnswers.sort((a, b) => 0.5 - Math.random())
    return shuffledAnswers
}

export  function decodeHTMLEntities(text) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }