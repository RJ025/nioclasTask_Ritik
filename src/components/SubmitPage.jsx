import React from 'react'
import { useLocation } from 'react-router-dom'
import { formatTime } from '../utils/formatTimeHook';
import Confetti from 'react-confetti'

const SubmitPage = () => {
    const location = useLocation();
    const {time , totalTime , name} = location.state;
    const formattedTime = totalTime-time;

  return (
    <div className='h-full'>
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
        />
        <div className='flex flex-col justify-center items-center absolute top-52 ml-10 sm:ml-[35%] gap-8 bg-gray-100 p-3 h-56 w-fit rounded-lg shadow-lg shadow-gray-500'>
            <h1 className='font-bold'>Congratulations {name.toUpperCase()} for completing the test 🎉</h1>
            <h1 className='font-bold bg-green-300 rounded-lg p-2'>Total time taken : {formatTime(formattedTime)}</h1>
        </div>
    </div>
    
  )
}

export default SubmitPage