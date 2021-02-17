const bcrypt = require('bcrypt')


let password = '300606Jfl'


async function create(){
  bcrypt.hash(password, 10)
  .then((e)=>{
    console.log(e);
  })
  .catch((err)=>{
    console.log(err);
  })
  // return o
}

create()
