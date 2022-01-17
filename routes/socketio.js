let { Monopoly } = require("./monopoly");
let game = new Monopoly();

function main(socket, io) {
  game.io = io;
  console.log('a user connected');
  game.sendState();
  socket.on('action', (action) => {
    game.processAction(action);
    game.sendState();
  });
  socket.on('setId', (id) => {
      game.addPlayer(id);
      game.sendState();
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}
module.exports = main;
