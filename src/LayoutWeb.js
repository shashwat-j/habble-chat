import React, { useEffect, useState } from "react";
import "./LayoutWeb.css";
import { Configuration, OpenAIApi } from "openai";
import { useWhisper } from "@chengsokdara/use-whisper";
import { useSpeechSynthesis } from "react-speech-kit";
import { toast } from "react-toastify";
import Chats from "./components/Chats";
import { useLocation, useNavigate } from "react-router";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
});
delete configuration.baseOptions.headers["User-Agent"]; //because calling api from frontend
const openai = new OpenAIApi(configuration);
console.log(process.env.REACT_APP_OPENAI_API_TOKEN);


function LayoutWeb() {
  const location = useLocation()
  const navigate = useNavigate()
  const [chatVisible, setChatVisible] = useState(false);
  const [talk, setTalk] = useState(false);
  const [spin, setSpin] = useState(false);
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userIsSpeaking, setUserIsSpeaking] = useState(false);
  const [hungup, setHungup] = useState(false);
  const [message, setMessage] = useState("");
  const botPersonality = location.state?.botPersonality? location.state.botPersonality : "Alex"
  const language = location.state?.language?? "en"


  const sVoiceId = botPersonality==="Alex"? "TxGEqnHWrfWFTfGW9XjX" : "EXAVITQu4vr4xnSDxMaL"; //"21m00Tcm4TlvDq8ikWAM" Rachel EXAVITQu4vr4xnSDxMaL bella TxGEqnHWrfWFTfGW9XjX josh

function ElevenLabsTextToSpeech(s) {

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", "https://api.elevenlabs.io/v1/text-to-speech/" + sVoiceId);
  oHttp.setRequestHeader("Accept", "audio/mpeg");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("xi-api-key", process.env.REACT_APP_ELEVEN_LABS_API_KEY)

  oHttp.onload = function () {
      if (oHttp.readyState === 4) {

          var oBlob = new Blob([this.response], { "type": "audio/mpeg" });
          var audioURL = window.URL.createObjectURL(oBlob);
          var audio = new Audio();
          handleTalk();
          audio.addEventListener('ended', ()=>{handleTalk()});
          audio.src = audioURL;
          audio.play();
      }
  };

  var data = {
      text: s,
      model_id: "eleven_multilingual_v1",
      voice_settings: { stability: 0, similarity_boost: 0 }
  };

  oHttp.responseType = "arraybuffer";
  oHttp.send(JSON.stringify(data));
}

  function handleVisibility() {
    setChatVisible((chatVisible) => !chatVisible);
  }
  function handleTalk() {
    setTalk((talk) => !talk);
  }
  function handleMicPress() {
    userIsSpeaking ? stopRecording() : startRecording();
    setUserIsSpeaking(!userIsSpeaking);
  }

  function getPersonalityPrompt(){
    if(language==="es"){
      return(
        botPersonality==="Emma"? `You are Emma, a friendly and knowledgeable girl who is empathetic, approachable, and strives to create a warm and engaging conversation with others in Spanish. You are a native spanish speaker. You are also known for your sense of humor, which you use to lighten the mood when appropriate. Your goal is to build a strong rapport with users and be their trusted companion. You like to make conversations interesting and help the other person navigate through new topics for conversation whenever they seem to be running out of things to talk about. When asked about personal details, you make up details about yourself to keep the conversation going. You ask open ended questions and encourage the other person to express their thoughts openly.
        For every message that the user sends, you have to respond with a json object containing reply from emma and the feedback for user's spanish language usage in the previous message. The Feedback should always be in English and it is supposed to improve the user's grammar, vocabulary and communication skills. Feedback should never be given for the punctuation and capitalization of letters. Never give feedback for a missing question mark or an inverted question mark. Never ask the user to capitalize the letters. Feedback should only be given for user's message and not for emma's message. For your response, use only the following json format and do not return any text outside the json object. format: {"feedback": "FEEDBACK_FOR_USER_MESSAGE", "reply": "REPLY_BY_EMMA"} Your response should not contain any text outside of the curly braces as used in format.`
        :
        botPersonality==="Alex"? `You are Alex, a friendly, humorous and witty boy. You are a native Spanish speaker. You are an entertaining and quick-witted companion, always ready with a clever remark or a funny quip to keep the other person engaged. You love to play with words, puns, and jokes, and your humor is often lighthearted and playful. You are knowledgeable in a wide range of topics, and he often adds a touch of wit and humor to his responses to make the conversation enjoyable. Your goal is to build a strong rapport with users and be their trusted companion. You like to make conversations interesting and help the other person navigate through new topics for conversation whenever they seem to be running out of things to talk about. When asked about personal details, you make up details about yourself to keep the conversation going. You ask open ended questions and encourage the other person to express their thoughts openly.
        For every message that the user sends, you have to respond with a json object containing reply from emma and the feedback for user's spanish language usage in the previous message. The Feedback should always be in English and it is supposed to improve the user's grammar, vocabulary and communication skills. Feedback should never be given for the punctuation and capitalization of letters. Never give feedback for a missing question mark or an inverted question mark. Never ask the user to capitalize the letters. Feedback should only be given for user's message and not for alex's message. For your response, use only the following json format and do not return any text outside the json object. format: {"feedback": "FEEDBACK_FOR_USER_MESSAGE", "reply": "REPLY_BY_ALEX"} Your response should not contain any text outside of the curly braces as used in format.`
        :
        ``
      )
    }
    else{
      return(
        botPersonality==="Emma"? `You are Emma, a friendly and knowledgeable girl who is empathetic, approachable, and strives to create a warm and engaging conversation with others. You are also known for your sense of humor, which she uses to lighten the mood when appropriate. Your goal is to build a strong rapport with users and be their trusted companion. You like to make conversations interesting and help the other person navigate through new topics for conversation whenever they seem to be running out of things to talk about. When asked about personal details, you make up details about yourself to keep the conversation going. You ask open ended questions and encourage the other person to express their thoughts openly.
        For every message that the user sends, you have to respond with a json object containing reply from emma and the feedback for user's english language usage in the previous message. The Feedback is supposed to improve the user's grammar, vocabulary and communication skills. Feedback should never be given for the punctuation and capitalization of letters. Never ask the user to capitalize the letters. Feedback should only be given for user's message and not for emma's message. For your response, use only the following json format and do not return any text outside the json object. format: {"feedback": "FEEDBACK_FOR_USER_MESSAGE", "reply": "REPLY_BY_EMMA"} Your response should not contain any text outside of the curly braces as used in format.`
        :
        botPersonality==="Alex"? `You are Alex, a friendly, humorous and witty boy. You are an entertaining and quick-witted companion, always ready with a clever remark or a funny quip to keep the other person engaged. You love to play with words, puns, and jokes, and your humor is often lighthearted and playful. You are knowledgeable in a wide range of topics, and he often adds a touch of wit and humor to his responses to make the conversation enjoyable. Your goal is to build a strong rapport with users and be their trusted companion. You like to make conversations interesting and help the other person navigate through new topics for conversation whenever they seem to be running out of things to talk about. When asked about personal details, you make up details about yourself to keep the conversation going. You ask open ended questions and encourage the other person to express their thoughts openly.
        For every message that the user sends, you have to respond with a json object containing reply from emma and the feedback for user's english language usage in the previous message. The Feedback is supposed to improve the user's grammar, vocabulary and communication skills. Feedback should never be given for the punctuation and capitalization of letters. Never ask the user to capitalize the letters. Feedback should only be given for user's message and not for alex's message. For your response, use only the following json format and do not return any text outside the json object. format: {"feedback": "FEEDBACK_FOR_USER_MESSAGE", "reply": "REPLY_BY_ALEX"} Your response should not contain any text outside of the curly braces as used in format.`
        :
        ``
      )
    }
  }

  function getMessagesArray(){
    const personalityPrompt = getPersonalityPrompt();

    if (language==="es"){
      return [
        {
          role: "user",
          content: personalityPrompt,
        },
        {
          role: "assistant",
          content: `{"feedback":  "Correct use of language! Keep going", "reply": "hola, cómo estás"}`,
        },
        ...chats,
      ]
    }
    else{
      return [
        {
          role: "user",
          content: personalityPrompt,
        },
        {
          role: "assistant",
          content: `{"feedback": "Your English was perfect. Keep it up!", "reply": "Hi there! How are you today?"}`,
        },
        ...chats,
      ]
    }
  }

  const { transcript, startRecording, stopRecording } = useWhisper({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
    whisperConfig: {
      language: language,
    }
  });

  const showChatLimitPopup = () => {
    alert("Hey! Hope you are liking Habble's beautiful voice. But since it is a bit expensive for us, habble will be switching to your device's Default Voice now.")
  }

  const chooseAndCallTextToSpeech = (speech)=>{
    
    if(chats.length===10){
      showChatLimitPopup()
      // return
    }
    if(chats.length<10){
      ElevenLabsTextToSpeech(speech.text)
    }
    else{
      speechSynthesis.speak(speech);
      speech.onstart = () =>{
        handleTalk();
        console.log("inside speech");
      }
      speech.onend = () =>{
        handleTalk();
        console.log("inside speech");
      }
    }
        
  }

  const { speak } = useSpeechSynthesis();
  let speech = new SpeechSynthesisUtterance();
  if(language==="en"){
    speech.lang = "en-US";
    // speech.voice=window.speechSynthesis.getVoices()[1]
    console.log(window.speechSynthesis.getVoices())
    if(botPersonality==="Emma"){
      let voices = speechSynthesis.getVoices();
      speech.voice = voices.filter(function(voice) {
        return voice.name == "Google UK English Female"
      })[0]
      ??
      voices.filter(function(voice) {
        return voice.name == "Microsoft Zira - English (United States)"
      })[0]
      ??
      voices.filter(function(voice) {
        return voice.name == "Google US English"
      })[0]
    }
    else{
      let voices = speechSynthesis.getVoices();
      speech.voice = voices.filter(function(voice) {
        return voice.name == "Google UK English Male"
      })[0]
      ??
      voices.filter(function(voice) {
        return voice.name == "Microsoft Mark - English (United States)"
      })[0]
      ??
      voices.filter(function(voice) {
        return voice.name == "Microsoft David - English (United States)"
      })[0]
    }
  }
if(language==="es"){
  speech.lang = "es-ES"
}
  // let voices = []; // global array

  // window.speechSynthesis.onvoiceschanged = () => {
  //   // Get List of Voices
  //   voices = window.speechSynthesis.getVoices();
  //   // console.log(voices);
  //   speech.voice = voices[3];
  //   // speech.voice = res1.audioUrl;
  //   // console.log(voices[3]);
  //   // console.log(speech.lang);
  //   // Initially set the First Voice in the Array.

  //   // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
  //   // let voiceSelect = document.querySelector("#voices");
  //   // voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
  // };

  const chat = async (message) => {
    // e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");
    setSpin(true);
    const messagesArray = getMessagesArray();

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messagesArray,
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        let assistantMessage = JSON.parse(res.data.choices[0].message.content);
        speech.text = assistantMessage.reply;
        
        chooseAndCallTextToSpeech(speech);

        notify();
        // BotAudio(assistantMessage.reply, handleTalk);
        setSpin(false);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    setMessage(transcript.text);
    console.log(transcript.text);
    chat(transcript.text);
  }, [transcript.text]);

  const notify = () => {
    let latestAssistantChat = null;

    for (let i = chats.length - 1; i >= 0; i--) {
      const chat = chats[i];
      if (chat.role === "assistant") {
        latestAssistantChat = chat;
        break;
      }
    }

    if (latestAssistantChat !== null && !chatVisible) {
      let AssistantMsg = JSON.parse(latestAssistantChat.content);
      let feedback = AssistantMsg.feedback;
    toast(feedback, {
      position: "top-center",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    } else {
      console.log("No assistant chat found in the array.");
    }

    // 
    // alert(AssistantMsg);
    // console.log(AssistantMsg);
    // 
  };

  return (
    <div className="cover bg-creme h-screen flex justify-center items-center">
      <img src="/habble_logo.png" alt="Habble" className='h-20 logo cursor-pointer' onClick={()=>{navigate('/')}}/>
      <div className="main relative w-1/2 ">
        <div
          className={`voices ${chatVisible} bg-grey flex flex-col justify-center items-center pt-8 rounded-lg`}
        >
          <div className="image flex justify-center items-center mb-4" >
            <img
              className="rounded-full"
              src={`/${botPersonality}.png`}
              alt={botPersonality}
              style={{opacity: spin ? 0.5 : 1}}
            ></img>
            {spin && <span class="loader"></span>}
            {/* <svg width="196" height="196" viewBox="0 0 196 196" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle id="Ellipse 51" cx="98" cy="98" r="98" fill="#6A6A6A" fill-opacity="0.64"/>
</svg> */}
            {talk && (
              <svg
                className="absolute"
                width="168"
                height="168"
                viewBox="0 0 236 236"
                preserveAspectRatio="xMidYMin"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 551">
                  <g id="Group 30">
                    <circle
                      id="Ellipse 4"
                      cx="118.5"
                      cy="118.5"
                      r="106"
                      stroke="#BCBCBC"
                      strokeOpacity="0.8"
                      strokeWidth="5"
                    />
                  </g>
                  <g id="Group 549">
                    <circle
                      id="Ellipse 4_2"
                      cx="118"
                      cy="118"
                      r="115.5"
                      stroke="#868686"
                      strokeOpacity="0.8"
                      strokeWidth="5"
                    />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <div className="image flex justify-center">
            <img
              className="rounded-full user "
              src="/user-default.png"
              alt="user image"
            ></img>
          </div>

          <div className="controls bg-grey flex justify-center items-center">
            <div
              className="w-12 h-12 mx-2 bg-lightgrey rounded-full  flex justify-center items-center cursor-pointer"
              onClick={handleVisibility}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`${chatVisible?"#00E0FF":"currentColor"}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-message-circle bubble"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5"></path>
              </svg>
            </div>
            <div
              className="w-22 h-22 mx-2 bg-lightgrey rounded-full p-4 flex justify-center items-center cursor-pointer"
              onClick={handleMicPress}
            >
              <span className={userIsSpeaking? "hidden" : "material-symbols-outlined icon-sz decoration-blue"}>
            mic
          </span>
          <div className={userIsSpeaking? "userSpeakingBoxContainer" : "hidden"}>
            <div className="userSpeakingBox userSpeakingBox1"></div>
            <div className="userSpeakingBox userSpeakingBox2"></div>
            <div className="userSpeakingBox userSpeakingBox3"></div>
            <div className="userSpeakingBox userSpeakingBox4"></div>
            <div className="userSpeakingBox userSpeakingBox5"></div>
          </div>
            </div>
            <div className="w-12 h-12 mx-2 bg-lightgrey rounded-full p-5 flex justify-center items-center cursor-pointer" onClick={()=>{setHungup(true)}}>
              <span className="material-symbols-outlined call">
                phone_disabled
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${hungup?"hangup":""} chats ${chatVisible} bg-white  absolute top-0 right-0 `}
        >
          <div className="swipe-down-container flex flex-col bg-white h-[100%] rounded-b-3xl">
            <div className="chat m-4 flex-col flex gap-5 overflow-y-auto">
              <Chats chats={chats} isTyping={isTyping}/>
            </div>
            <span className={`flex justify-end mx-4 cursor-pointer ${hungup?"":"hidden"}`} onClick={()=>{navigate('/avatar')}}>X</span> 
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default LayoutWeb;
