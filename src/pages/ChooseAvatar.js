import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const ChooseAvatar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [selectedAvatar, setSelectedAvatar] = useState("Alex")

  const avatars = [
    {
      name: "Alex",
      image: "/Alex.png",
      description: ["Funny", "Lively", "Casual", "Encouraging"]
    },
    {
      name: "Emma",
      image: "/Emma.png",
      description: ["Friendly", "Helpful", "Empathetic"]
    }
    // {
    //   name: "Lex",
    //   image: "/lex.png",
    //   description: ["Professional", "Workplace Vocabulary", "Knowledgable", "Wise"]
    // },
    // {
    //   name: "Lucy",
    //   image: "/lucy.png",
    //   description: ["Sharp eye for Detail", "Artistic"]
    // }
  ]


  return (
    <>
      <div className='m-6'>
        <div>
          <img src="/habble_logo_green.JPG" alt="Habble" className='h-20'/>
        </div>
        <div className='text-center my-12'>
          <h3 className='text-3xl font-jua'>Choose your Habble buddy!</h3>
        </div>
        {/* avatar cards container*/}
        <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
          { avatars.map(avatar=>{
            return(
              <div key={avatar.name} className={`bg-peach flex flex-col justify-center items-center gap-2 h-[242px] w-[242px] rounded-3xl md:h-[279px] md:w-[300px] hover:border-2 hover:border-bluish ${selectedAvatar===avatar.name? "border-2 border-bluish":""}`} onClick={()=>{setSelectedAvatar(avatar.name)}}>
            <div>
              <img src={avatar.image} alt={avatar.name} className='mt-6 h-[110px] md:h-[140px]'/>
            </div>
            <p className='text-3xl font-helvetica font-bold'>{avatar.name}</p>
            <div className='flex gap-2 w-[240px] md:w-[270px] justify-center flex-wrap'>
              { avatar.description.map(item=>{
                return (
              <span key={item} className='bg-white font-medium text-xs text-center rounded-full px-[10px] py-[2.8px]'>{item}</span>
                )
              })
              }
            </div>
          </div>
            )
          }) 
          }
        </div>
        {/* start button */}
        <div className="flex md:justify-end justify-center mx-auto mt-10 md:mt-16 md:mx-40 w-34">
        <button className="css-button-sharp--blue" onClick={()=>{navigate("/talk", {state:{botPersonality: selectedAvatar, language: location.state.language}})}}>NEXT</button>
      </div>
      </div>
    </>
  )
}

export default ChooseAvatar