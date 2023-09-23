import React, { useEffect, useRef } from 'react'

const Chats = ({chats, isTyping, swpDwn}) => {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
        console.log("function")
      scrollToBottom()
    }, [chats.length]);

  return (
    <>
        {/* {!swpDwn && <div className="swipe-down-container flex flex-col bg-white h-[67%] rounded-b-3xl">
        <div className="chat m-4 flex-col flex gap-5 overflow-y-auto">  */}
          {chats && chats.length
              ? chats.map((chat, index) => {
                  if (chat.role === "user") {
                    return (
                      <div
                        key={index}
                        className="userMsg rounded-md bg-darkpurple max-w-[60%] ml-auto"
                      >
                        <p className="text-white p-2">
                          {chat.content}
                        </p>
                      </div>
                    );
                  } else if(chat.role === "assistant") {
                    // console.log(JSON.parse(chat.content))
                    let AssistantMsg = JSON.parse(chat.content);
                    return (
                     <div key={index} className="flex-col flex gap-2">
                        <div
                          className="botMsg rounded-md bg-lightergrey max-w-[65%] mr-auto"
                        >
                          <p className="text-black font-medium p-2">
                            {AssistantMsg.reply}
                          </p>
                        </div>
                        
                        <div
                          className="botMsg rounded-md bg-lightpink max-w-[65%] mr-auto"
                        >
                          <p className="text-indigoish italic p-2">
                            {AssistantMsg.feedback}
                          </p>
                        </div>
                     </div>
                      
                    );
                  }
                }
                )
              : ""}
              <div className={isTyping? "rounded-xl bg-lightergrey mr-auto" : "hidden"}>
                <div className="typing-animation px-3 py-4">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <div ref={messagesEndRef}></div>
        {/* </div>
        <div className="bg-gray-400 w-1/3 text-center mx-auto mt-auto mb-2 h-1">
        </div>
        </div>} */}
    </>
  )
}

export default Chats