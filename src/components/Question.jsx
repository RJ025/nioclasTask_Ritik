import { MathJax , MathJaxContext } from 'better-react-mathjax';
import React from 'react'

const Question = ({ques}) => {

  return (!ques)? null :(

    <MathJax>{ques}</MathJax>

  )
}

export default Question