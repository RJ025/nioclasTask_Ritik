import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store'
import Question from './Question';
import {FcPrevious} from "react-icons/fc"
import {FcNext} from "react-icons/fc"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatTime } from '../utils/formatTimeHook';


const TestPage = () => {
    const selectedTopicsArray = useSelector(store => store.selectedTopics.selectedTopicsArray);
    var time = selectedTopicsArray.length*5;
    const [questionBank , setQuestionBank] = useState([]);
    const [page , setPage] = useState(1);
    const [timer, setTimer] = useState(time*60); 
    const [isTestComplete, setIsTestComplete] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const name = searchParams.get("name");

    // const intervalRef = useRef();

    useEffect(()=>{
        selectedTopicsArray.map(async (topic)=>{
            const data = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${topic}`)
            const json = await data.json();
            setQuestionBank((prevQuestionBank)=>[...prevQuestionBank , json[0].Question])
        });
    } , [])

    useEffect(()=>{        
        let interval;
        if(!isTestComplete)
        {
            interval = setInterval(()=>{
                setTimer((prevTime)=>prevTime-1)
            } , 1000)
        }

        return ()=>{
            clearInterval(interval);
        }

    } , [isTestComplete])

    const questionChangeHandler = (selectedQuestion)=>{
        setPage(selectedQuestion);
    }

    const handlePrev = (currPage)=>{
        if(currPage!==1)setPage(currPage-1);
    }

    const handleNext = (currPage)=>{
        if(currPage!==questionBank.length)setPage(currPage+1);
    }


    const handleSubmit = ()=>{
        setIsTestComplete(true);

        navigate('/submit' , {
            state: {
                time: timer,
                totalTime : time*60 ,
                name : name
            },
        });

    }

  return (
    <div>
        {(selectedTopicsArray.length === questionBank.length) &&
            <div className='flex flex-col mt-10 gap-20'>
                <div className="font-bold bg-red-500 p-2 rounded-lg w-fit ml-8">Time: {formatTime(timer)} seconds</div>
                {questionBank.slice(page*1-1 , page).map((ques)=>{
                    return (<div className='flex flex-col sm:flex-row gap-2 items-center bg-gray-200 p-4 m-4 rounded-xl shadow-2xl overflow-hidden'>
                                <h1>Ques: {page}</h1>
                                <Question ques={ques}/>
                            </div>)
                })}
                {(questionBank.length > 0) && 
                    <div className='flex flex-row  justify-center items-center gap-4'>
                        <FcPrevious onClick={()=>handlePrev(page)} className={(page==1 ? "hidden" : "")}/>
                        {
                            questionBank.map((_ , i)=>{
                                return <span className={'cursor-pointer' + (i+1===page ? "bg-blue-400 rounded-full" : "")} onClick={()=>questionChangeHandler(i+1)}>{i+1}</span>
                            })
                        }
                        {page === questionBank.length ?
                            <button onClick={()=>handleSubmit()} className='p-2 rounded-xl bg-green-300'>Submit</button> :
                            <FcNext onClick={()=>handleNext(page)}/>
                        }
                        
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default TestPage