const store = require('../libs/mongoose')


function createCatalogo(){

}

async function getCatalogo(){
  try{

    let requestCatalogo = await store.get('catalogos', (req.body.id&&req.body.id)) 

    res.json({
      error:false, 
      data:requestCatalogo,
      message:'ok',
    }).status(200)

  }
  catch(err){
    res.json({
      error:true,
      stack: config.dev ? err : false,
      message: 'Internal server error'
    }).status(500)
  }
}

function editCatalogo(){

}

function deleteCatalogo(){

}