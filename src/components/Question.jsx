import { MathJax , MathJaxContext } from 'better-react-mathjax';
import React from 'react'

const Question = ({ques}) => {

  return(

    <MathJax inline dynamic>{ques}</MathJax>

  )
}

export default Question