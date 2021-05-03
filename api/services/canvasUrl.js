const fs = require('fs');
const path = require('path')
function createCanvasUrl(id, canvasUrl){
  return new Promise((resolve, reject) =>{
    console.log(  );
    fs.writeFile(path.join(__dirname, '..', 'img', `${id}.txt` ), canvasUrl, (err)=>{
      if(err){
        reject(err);
      }
  
      resolve('created');
  
    })

  })

}

function getCanvasUrl(id){
  return new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, '..', 'img', `${id}.txt` ), 'UTF-8', (err, data)=>{
      if (err){
        reject(err)
      }
  
      resolve(data)
  
    })
  })
}

function deleteCanvasUrl(id){

  return new Promise((resolve, reject)=>{
    fs.unlink(path.join(__dirname, '..', 'img', `${id}.txt` ), (err)=>{
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