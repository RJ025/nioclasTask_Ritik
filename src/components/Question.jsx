import { MathJax , MathJaxContext } from 'better-react-mathjax';
import React from 'react'

const Question = ({ques}) => {
  
  const config = {
      tex : {
        inlineMath : [['$' , '$'] , ['\\(' , '//)']]
      }
  };

  return (

    <MathJax>{ques}</MathJax>

  )
}

export default Question