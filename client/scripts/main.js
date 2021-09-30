const url = "ws://localhost:8080";
const messages = document.querySelector(".messenger__messages");
const input = document.querySelector(".messenger__input");
const user = document.querySelector(".messenger__user");
const onlineDot = document.querySelector(".messenger__dot");

const socket = new WebSocket(url);

socket.onopen = () => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const data = JSON.stringify({ type: "NEW_MESSAGE", payload: { message: input.value } });
      socket.send(data);
      showMessage(user.innerHTML, input.value, true);
      input.value = "";
    }
  });

  socket.onmessage = (message) => {
    const data = message.data;
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case "GET_ID":
        updateUser(payload.id);
        break;
      case "NEW_MESSAGE":
        showMessage(payload.userId, payload.message, false);
        break;

      default:
        break;
    }
  };
};

const updateUser = (userName) => {
  user.textContent = userName;
  onlineDot.classList.remove("messenger__dot--red");
  onlineDot.classList.add("messenger__dot--green");
};

const showMessage = (userName, message, isMine) => {
  /*
  <div class="message message--left">
    <span class="message__user">user-1</span>
    <span>Hello there? sup?</span>
  </div>
  */
  //message container node
  const messageContainer = document.createElement("div");
  messageContainer.className = `message message--${isMine ? "right" : "left"}`;
  //message username
  const messageUser = document.createElement("span");
  messageUser.className = "message__user";
  messageUser.innerText = userName;
  //message text
  const messageText = document.createElement("span");
  messageText.innerText = message;

  messageContainer.appendChild(messageUser);
  messageContainer.appendChild(messageText);

  messages.appendChild(messageContainer);
  messages.scrollTo(0, messages.scrollHeight);
};

/* 
        
Documentation
url:"ws://localhost:8080"

  get {type:'GET_ID',payload: {id:(string)}}

  get {type:'NEW_MESSAGE', payload:{message:(string),userId:(string)}}

  send {type:'NEW_MESSAGE', payload:{message:(string)}}


*/
