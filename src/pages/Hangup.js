import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import Chats from '../components/Chats'

const Hangup = () => {

    const location = useLocation()
    const navigate = useNavigate()

  return (
    <>
    {/* if chats array has been passed to it, show Chats.js */}
        {location?.state?.chats?.length?
        <div>
            <div className='m-2 flex-col flex gap-5 overflow-y-auto h-[92vh]'>
                <Chats chats={location.state.chats}/>
            </div>
            <span className='flex justify-end mx-4 cursor-pointer' onClick={()=>{navigate('/avatar')}}>X</span>
        </div>
        :
        <div className='m-4'>
            <span className='flex justify-end mx-4 cursor-pointer' onClick={()=>{navigate('/avatar')}}>X</span>
            Conversation ended. See you later.
        </div>}
    </>
  )
}

export default Hangup