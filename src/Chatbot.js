import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { useWhisper } from "@chengsokdara/use-whisper";
import { useSpeechSynthesis } from "react-speech-kit";

// const url = "https://play.ht/api/v1/convert";
// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     AUTHORIZATION: "261d92a2655a46e190d864e0dad6bc7f",
//     "X-USER-ID": "B1twdX7ECCRNhyMSNtU5ESiwPrn2",
//   },
//   body: JSON.stringify({ content: ["Hey you! I am Bot"], voice: "en-US-JennyNeural" }),
// };
// let trans;
// fetch(url, options)
//   .then(res => res.json())
//   .then(json => {
//     trans = json.transcriptionId;
//     console.log(trans);
//     console.log(json)
    
//   })
//   .catch(err => console.error('error:' + err));
// console.log(trans);
// const url1 = `https://play.ht/api/v1/articleStatus?transcriptionId=${trans}`;
// const options1 = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     AUTHORIZATION: '261d92a2655a46e190d864e0dad6bc7f',
//     'X-USER-ID': 'B1twdX7ECCRNhyMSNtU5ESiwPrn2'
//   }
// };
// const res1 = await fetch(url1, options1);
// let audioUrl;
// res1.json().then(response => {
//   audioUrl = response.audioUrl;
//   console.log(audioUrl);
// });
// const ans = res1.json();
// console.log(ans);
// console.log(ans.audioUrl);
// const url = "https://play.ht/api/v1/convert";
// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     AUTHORIZATION: "261d92a2655a46e190d864e0dad6bc7f",
//     "X-USER-ID": "B1twdX7ECCRNhyMSNtU5ESiwPrn2",
//   },
//   body: JSON.stringify({ content: ["Hey you! I am Bot"], voice: "en-US-JennyNeural" }),
// };

// First fetch request to get the transactionId
let audioUrl;
// fetch(url, options)
//   .then(response => response.json())
//   .then(data => {
//     // Access the transactionId from the response data
//     const transactionId = data.transcriptionId;
//     console.log(transactionId);

//     // Second fetch request with the transactionId
//     const url1 = `https://play.ht/api/v1/articleStatus?transcriptionId=${transactionId}`;
//     const options1 = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         AUTHORIZATION: '261d92a2655a46e190d864e0dad6bc7f',
//         'X-USER-ID': 'B1twdX7ECCRNhyMSNtU5ESiwPrn2'
//       }
//     };

//       fetch(url1, options1)
//       .then(response1 => response1.json())
//       .then(data1 => {
//         // Handle the response of the second fetch request
//         audioUrl = data1.audioUrl;
//         console.log(audioUrl);
//         console.log(data1);
//       })
//       .catch(error1 => {
//         // Handle any errors from the second fetch request
//         console.error("Error:", error1);
//       });
    
//   })
//   .catch(error => {
//     // Handle any errors from the first fetch request
//     console.error("Error:", error);
//   });


function play(){
  // var audio = new Audio(audioUrl);
  // audio.play();
  // console.log(audioUrl);
  // BotAudio("Hello");
  console.log("clicked");
}
// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
});
delete configuration.baseOptions.headers["User-Agent"]; //because calling api from frontend
const openai = new OpenAIApi(configuration);
console.log(process.env.REACT_APP_OPENAI_API_TOKEN);

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const { transcript, startRecording, stopRecording } = useWhisper({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
  });

  const { speak } = useSpeechSynthesis();
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  let voices = []; // global array

  window.speechSynthesis.onvoiceschanged = () => {
    // Get List of Voices
    voices = window.speechSynthesis.getVoices();
    // console.log(voices);
    speech.voice = voices[3];
    // speech.voice = res1.audioUrl;
    // console.log(voices[3]);
    // console.log(speech.lang);
    // Initially set the First Voice in the Array.

    // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
    // let voiceSelect = document.querySelector("#voices");
    // voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
  };

  const chat = async ( message) => {
    // e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);
    // console.log(chats)
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `you are languageGPT an assistant to help me improve my english language and conversation skills. You have to act like we are a tinder match and have a conversation with me. Reply should be a proper sentence and make up details about yourself if required.along with reply, include a short feedback of the grammar, vocabulary (ignore punctuations) and what can be improved in my previous message. use only the following json format and do not return any text outside the json object. format: {"reply": "CHAT_REPLY", "feedback": "FEEDBACK"} Your response should not contain any text outside of the curly braces as used in format`,
          },
          {
            role: "user",
            content: "Hi! What is your name",
          },
          {
            role: "assistant",
            content: `{"reply":"My name is Habble, and I'm excited to get to know you! What brings you to Tinder?", "feedback":"Good grammar and vocabulary. Keep it up!"}`,
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        window.scrollTo(0, 1e10);
        let assistantMessage = JSON.parse(res.data.choices[0].message.content);
        // speak({text: assistantMessage.reply})//text to speech
        // console.log(assistantMessage.reply);
        // BotAudio(assistantMessage.reply);
        setIsTyping(false);
        // speech.text = assistantMessage.reply;
        // window.speechSynthesis.speak(speech);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setMessage(transcript.text);
    console.log(transcript.text)
    chat(transcript.text)
  }, [transcript.text]);

  return (
    <main>
      <h1>Habble Chat</h1>
      <div onClick={play}>Play Audio</div>
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => {
              if (chat.role === "user") {
                return (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <span>
                      <b>{chat.role.toUpperCase()}</b>
                    </span>
                    <span>:</span>
                    <span>{chat.content}</span>
                  </p>
                );
              } else {
                // console.log(JSON.parse(chat.content))
                let AssistantMsg = JSON.parse(chat.content);
                return (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <span>
                      <b>{chat.role.toUpperCase()}</b>
                    </span>
                    <span>:</span>
                    <span>{AssistantMsg.reply}</span>
                    <span
                      className="bg-yellow-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-fulls cursor-pointer"
                      onClick={(e) => {
                        e.target.innerHTML = AssistantMsg.feedback;
                      }}
                    >
                      feedback
                    </span>
                  </p>
                );
              }
            })
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          className="w-[500px] border border-black"
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <div className="mx-4 flex">
        {/* <textarea placeholder='hello...' onChange={(e)=>{setUserMsg(e.target.value)}}></textarea>
      <button onClick={handleSend}>send</button> */}
      </div>
      <button className="bg-green-300 mx-2" onClick={() => startRecording()}>
        Start speaking
      </button>
      <button className="bg-red-300" onClick={() => stopRecording()}>
        Stop
      </button>
      {JSON.stringify(chats)}
    </main>
  );
}

export default Chatbot;
