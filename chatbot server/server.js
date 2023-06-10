const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws) => {
  console.log('A client connected.');


  ws.on('message', (message) => {
    console.log('Received message:', message);


    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});
