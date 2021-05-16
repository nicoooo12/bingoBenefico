module.exports = (socket)=>{
  socket.on('connect', (io)=>{
    io.on('holaMundo', (id)=>{
      // io.join('bingo');
      if (id) {
        io.join(id);
      }
      console.log(io.id, id);
    });
  });
};
