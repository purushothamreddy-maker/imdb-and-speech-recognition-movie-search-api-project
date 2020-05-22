let btn=document.querySelector("#btn");
btn.addEventListener("click",Speech);

function Speech(){
   // console.log("speech");
   window.SpeechRecognition=
   window.SpeechRecognition || window.webkitSpeechRecognition;

   let recognition = new SpeechRecognition();
   recognition.interimResults=true;

let p=document.createElement("p");
let words= document.querySelector(".words");
words.appendChild(p);


   //need call Dom events
   recognition.addEventListener("result", (e)=> {
       //console.log(e.results[0]);
       //converted object into array purpose use thease two lines
       let transcript =[...e.results].
       map((result) => result[0])
       .map((result) => result.transcript)
       .join("");
       console.log(transcript);
       p.textContent=transcript;
       if(e.results[0].isFinal)
{
    p=document.createElement("p");
    words.appendChild(p);
}
    });
    //restart recognition
    recognition.addEventListener("end", recognition.start);
   // start recognition
   recognition.start();
}