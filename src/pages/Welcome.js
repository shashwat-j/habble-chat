import React from "react";
import wlPic from "../Utils/wl-pic.png";
import {useNavigate} from "react-router-dom"
import "./StartButton.css";
function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="h-screen relative containers pt-4 px-7" >
      <div className="log">
        <img src="/habble_logo_green.JPG" className="h-20" alt="Hablle"/>
      </div>
      <div className="">
        <div className="flex justify-between mx:8 md:mx-28 mt-24 md:mr-36">
          <div className="flex flex-col gap-1 wl-text md:px-10 justify-center">
            <span className="text-black text-3xl font-normal tracking-widest block">
              Speak. Learn. Improve
            </span>
            <span className="text-black text-l font-normal tracking-widest block">
              Improve your conversational skills with Habble,
            </span>
            <span className="text-black text-l font-normal tracking-widest block">
              Human communication with AI
            </span>
            <span className="text-black text-3xl font-normal tracking-widest block pt-2 last">
              Ready to start?
            </span>
          </div>
          <div className="wl-pic w-80 justify-center hidden md:flex">
            <img className="flex " src={wlPic} />
          </div>
        </div>
          <div className="flex justify-center mt-40 md:justify-end md:mx-40 md:mt-32">
            <button className="css-button-sharp--blue -mr-1 -mt-1" onClick={()=>{navigate("/language")}}>START</button>
          </div>
      </div>
    </div>
  );
}

export default Welcome;
