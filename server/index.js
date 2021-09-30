//SERVER
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("\x1b[36m%s\x1b[0m", "our server is running, happy hacking :))");
});

wss.on("connection", (ws) => {
  const id = "User-" + Date.now().toString().slice(-6);
  ws.id = id;
  ws.send(JSON.stringify({ type: "SET_ID", payload: id }));

  ws.onmessage = ({ data }) => {
    const { type, payload } = JSON.parse(data);

    if (type === "NEW_MESSAGE") {
      wss.clients.forEach((client) => {
        if (client.id !== ws.id)
          client.send(JSON.stringify({ type: "NEW_MESSAGE", payload: { message: payload, userId: ws.id } }));
      });
    }
  };
});
