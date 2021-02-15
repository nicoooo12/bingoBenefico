module.exports = (socket)=>{
  socket.on('connect', (io)=>{
    io.on('soyBingo', ()=>{
      io.join('bingo')  
    })
    io.on('soyAdmin', ()=>{
      io.join('admin')  
    })
    io.on('soyUser', ()=>{
      io.join('users')
      
    })
    io.on('iniciarJuego', (serie, premio,color)=>{
      socket.to('bingo').to('users').emit('init', serie,premio, color)
    })
    io.on('lanzar', ()=>{
      socket.to('bingo').emit('lan')
    })
    io.on('lanzado', (o,data2)=>{
      socket.to('admin').to('users').emit('lando', o, data2)
    })
    io.on('end', ()=>{
      socket.to('bingo').to('users').emit('fine')
    })
    io.on('bingo!', (o, nom)=>{
      socket.to('bingo').to('admin').emit('gano', o, io.id, nom)
    })
    // io.on('gann', (data1,data2,id,user)=>{
    //   socket.to('admin').emit('gano', data1, data2, id, user)
    // })
    io.on('ganos', (id,user)=>{
      socket.to('bingo').to(id).emit('genne',user)
    })
    io.on('nop', (id,user)=>{
      socket.to('bingo').to(id).emit('nogenne',user)
    })

    io.on('message', (to, message)=>{
      socket.to(to).emit('mess', message)
    })
  })
}