//SERVER
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("our server is running");
});

wss.on("connection", (ws) => {
  const id = "User-" + Date.now().toString().slice(-6);
  ws.id = id;
  ws.send(JSON.stringify({ type: "SET_ID", payload: id }));
  ws.onmessage = ({ data }) => {
    console.log({ data });
    const { type, payload } = JSON.parse(data);
    console.log(type, payload);
    switch (type) {
      case "NEW_MESSAGE":
        wss.clients.forEach((client) => {
          console.log(client);
          if (client.id !== ws.id)
            client.send(JSON.stringify({ type: "NEW_MESSAGE", payload: { message: payload, userId: ws.id } }));
        });
        break;

      default:
        break;
    }
  };
});

// wss.on("message", (message) => {
//   console.log("received: %s", message);
// });
