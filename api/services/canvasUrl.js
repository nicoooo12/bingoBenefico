const fs = require('fs');
function createCanvasUrl(id, canvasUrl){

  return new Promise((resolve, reject) =>{
    fs.writeFile(`../img/${id}.txt`, canvasUrl, (err)=>{
      if(err){
        reject(err);
      }
  
      resolve('created');
  
    })

  })

}

function getCanvasUrl(id){
  return new Promise((resolve, reject)=>{
    fs.readFile(`../img/${id}.txt`, 'UTF-8', (err, data)=>{
      if (err){
        reject(err)
      }
  
      resolve(data)
  
    })
  })
}

function deleteCanvasUrl(id){

  return new Promise((resolve, reject)=>{
    fs.unlink(`../img/${id}.txt`, (err)=>{
      if(err){
        reject(err);
      }
  
      resolve('removed');
  
    })
  })

}

module.exports = {
  createCanvasUrl,
  getCanvasUrl,
  deleteCanvasUrl
}