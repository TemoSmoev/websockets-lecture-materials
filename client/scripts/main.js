const url = "ws://localhost:8080";
const messages = document.querySelector(".messenger__messages");
const input = document.querySelector(".messenger__input");
const user = document.querySelector(".messenger__user");
const onlineDot = document.querySelector(".messenger__dot");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    //send message
  }
});

/* 
        
Documentation
url:"ws://localhost:8080"

  get {type:'GET_ID',payload: {id:(string)}}

  get {type:'NEW_MESSAGE', payload:{message:(string),userId:(string)}}

  send {type:'NEW_MESSAGE', payload:{message:(string)}}


*/
