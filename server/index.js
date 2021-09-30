//SERVER
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("our server is running");
});

wss.on("connection", (ws) => {
  const id = "User-" + Date.now().toString().slice(-6);
  ws.id = id;
  ws.send(JSON.stringify({ type: "GET_ID", payload: { id } }));

  ws.onmessage = ({ data }) => {
    const { type, payload } = JSON.parse(data);

    if (type === "NEW_MESSAGE") {
      wss.clients.forEach((client) => {
        if (client.id !== ws.id)
          client.send(JSON.stringify({ type: "NEW_MESSAGE", payload: { message: payload.message, userId: ws.id } }));
      });
    }
  };
});
