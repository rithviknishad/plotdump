const WebSocket = require("ws");
const fs = require("fs");

const MIDDLEWARE = process.env.MIDDLEWARE;
const IP = process.env.IP;

console.log(`MIDDLEWARE: ${MIDDLEWARE}`);
console.log(`IP: ${IP}`);

const socket = new WebSocket(`wss://${MIDDLEWARE}/observations/${IP}`);

socket.onopen = function (e) {
  console.log("[open] Connection established");
  setTimeout(function () {
    socket.close();
  }, 5 * 60 * 1000);
};

dir = `./data/${IP}`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

socket.onmessage = function (event) {
  const now = new Date().toISOString();
  fs.writeFile(dir + `/${now}.json`, event.data, function (err) {
    if (err) {
      return console.log(err);
    }
  });
};
