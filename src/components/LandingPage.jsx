import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { quesIdArr } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedTopics, removeSelectedTopics } from '../utils/selectedTopicsSlice';
import { Link } from 'react-router-dom';
import store from '../utils/store';

const LandingPage = () => {
    
    const [name , setName] = useState("");
    const [submit , setSubmit] = useState(false);
    // const [isChecked , setIsChecked] = useState(false);
    // const [seletedTopics , setSelectedTopics] = useState([])
    const dispatch = useDispatch()
    const selectedTopicsArray = useSelector(store => store.selectedTopics.selectedTopicsArray)

    const handleClick = ()=>{
        if(name.length===0) {
            toast("please enter name")
            setSubmit(false);
        } else {
            setSubmit(true);
        }
    }

    const handleCheck = (e)=>{
        const selectedTopicName = e.target.value;
        const Checked = e.target.checked;
        if(Checked){
            dispatch(addSelectedTopics(selectedTopicName));
        } else {
            dispatch(removeSelectedTopics(selectedTopicName));
        }
        // setIsChecked(ischecked => !ischecked)
    }

  return (
    <div className='flex flex-col justify-center items-center  p-4 rounded-xl gap-4'>
        <div className='flex flex-col justify-center items-center border bg-gray-200 w-fit  p-4 rounded-xl h-48 gap-4 shadow-lg'>
            <h1 className='font-bold py-2'>Nioclas Portal</h1>
            <input
                type = "text"
                className='px-1 py-1 sm:px-5  border border-gray-400 p-2 rounded-xl'
                placeholder='enter name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <button className='p-2 border border-green-700 rounded-xl mt-3 hover:bg-green-300 hover:border-white duration-500' onClick={()=>handleClick()}>Submit</button>
            <ToastContainer/>
        </div>
        <div>
            {submit && 
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>Please select the topics</h1>  
                    <div className='border bg-gray-200 shadow-xl rounded-xl'>
                          
                        {quesIdArr.map((ques , indx)=>{
                            return (<div key={indx} className='flex flex-row justify-between items-center gap-28 p-2'>
                                <label>{ques}</label>
                                <input
                                    type='checkbox'
                                    className=' p-2'
                                    value={ques}
                                    onChange={(e)=>handleCheck(e)}
                                />
                                
                            </div>)
                        })}   
                    </div>  
                </div>
                
            }
        </div>

        <Link to={'/test?name=' + name}>
            {selectedTopicsArray.length ?
                <div className='flex flex-row gap-3'>
                    <button className='bg-emerald-500 p-3 border border-black rounded-xl'>Start Test</button>
                    <h1 className='font-semibold bg-gray-200 rounded-md p-2'>Time : {selectedTopicsArray.length * 5} minutes</h1>
                </div>
                
                : null
            }
        </Link>

    </div>
  )
}

export default LandingPage