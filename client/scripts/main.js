const socket = new WebSocket("ws://localhost:8080");
const messages = document.querySelector(".messenger__messages");
const input = document.querySelector(".messenger__input");
const user = document.querySelector(".messenger__user");
const onlineDot = document.querySelector(".messenger__dot");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (input.value) {
      const message = input.value;
      socket.send(JSON.stringify({ type: "NEW_MESSAGE", payload: message }));
      addMessage({ userName: user.innerHTML, message: message, isMine: true });
    }
  }
});

socket.onmessage = ({ data }) => {
  const { type, payload } = JSON.parse(data);
  switch (type) {
    case "SET_ID":
      setUser(payload);
      break;
    case "NEW_MESSAGE": {
      addMessage({ userName: payload.userId, message: payload.message, isMine: false });
    }
    default:
      break;
  }
};

const setUser = (id) => {
  user.textContent = id;
  onlineDot.classList.remove("dot--red");
  onlineDot.classList.add("dot--green");
};

const addMessage = ({ userName, message, isMine }) => {
  //message container div
  const messageNode = document.createElement("div");
  messageNode.className = `messenger__message ${isMine ? "message--right" : "message--left"}`;
  //message name span
  const messageChild1 = document.createElement("span");
  messageChild1.className = "message__user";
  messageChild1.textContent = userName;
  //message name text
  const messageChild2 = document.createElement("span");
  messageChild2.className = "message__text";
  messageChild2.textContent = message;

  messageNode.appendChild(messageChild1);
  messageNode.appendChild(messageChild2);
  messages.appendChild(messageNode);
  input.value = "";
  messages.scrollTo(0, messages.scrollHeight);
};
