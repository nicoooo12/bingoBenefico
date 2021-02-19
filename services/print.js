const html_to_pdf = require('html-pdf-node')
const store = require('../libs/mongoose')

async function pdf(req,res,next){
  try {
    let num = req.body.num
    let cartonesUser = await store.get('cartones',{_id: num})
    let catalogos = await store.get('catalogos',{})
    let carton = {...cartonesUser[0]._doc, color: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].color,titulo: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].titulo, message: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].textoMedio}
    let cartonesUserAll = await store.get('cartones',{propietario_correo: carton.propietario_correo})
    let user = await store.get('users',{_id: carton.propietario_correo})
    let file = { content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bingoloteando</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <div class="container mt-5">
        <h1 class="fw-light"> Bingoloteando</h1>
        <small class="text-muted" style="font-size: 16px;">Codigo de referencia: ${(carton.propietario_correo).slice(-8)} (${user[0].nombre} ${user[0].apellido})</small>
        <br>
        <small class="text-muted" style="font-size: 16px;">Numero Carton: ${(cartonesUserAll.findIndex((e)=>{return e.id==carton._id}) +1)}</small>
      </div>
      <div class="m-3" style="position: relative; height:550px; width: 550px;">
        <div class="card mb-4 shadow-sm mt-5">
          <div>
            <div class="" style="position:relative; height:550px; width: 100%">
              <table  class="table table-bordered" style="border-color:${carton.color};height: 98%; top:2%; position:relative; width:96%; left:2%;">
                <tbody class="align-middle" style="text-align: center; font-size:24px">
                <tr>
                  <td scope="col" style="background-color: ${carton.color}; color:white; font-weight:bold">B</td>
                  <td scope="col" style="background-color: ${carton.color}; color:white; font-weight:bold">I</td>
                  <td scope="col" style="background-color: ${carton.color}; color:white; font-weight:bold">N</td>
                  <td scope="col" style="background-color: ${carton.color}; color:white; font-weight:bold">G</td>
                  <td scope="col" style="background-color: ${carton.color}; color:white; font-weight:bold">O</td>
                </tr>
                <tr>
                  <td scope="col" class="num">${carton.data[0][0]}</td>
                  <td scope="col" class="num">${carton.data[1][0]}</td>
                  <td scope="col" class="num">${carton.data[2][0]}</td>
                  <td scope="col" class="num">${carton.data[3][0]}</td>
                  <td scope="col" class="num">${carton.data[4][0]}</td>
                </tr>
                <tr>
                  <td scope="col" class="num">${carton.data[0][1]}</td>
                  <td scope="col" class="num">${carton.data[1][1]}</td>
                  <td scope="col" class="num">${carton.data[2][1]}</td>
                  <td scope="col" class="num">${carton.data[3][1]}</td>
                  <td scope="col" class="num">${carton.data[4][1]}</td>
                </tr>
                <tr>
                  <td scope="col" class="num">${carton.data[0][2]}</td>
                  <td scope="col" class="num">${carton.data[1][2]}</td>
                  <td >${carton.message}</td>
                  <td scope="col" class="num">${carton.data[3][2]}</td>
                  <td scope="col" class="num">${carton.data[4][2]}</td>
                </tr>
                <tr>
                  <td scope="col" class="num">${carton.data[0][3]}</td>
                  <td scope="col" class="num">${carton.data[1][3]}</td>
                  <td scope="col" class="num">${carton.data[2][3]}</td>
                  <td scope="col" class="num">${carton.data[3][3]}</td>
                  <td scope="col" class="num">${carton.data[4][3]}</td>
                </tr>
                <tr>
                  <td scope="col" class="num">${carton.data[0][4]}</td>
                  <td scope="col" class="num">${carton.data[1][4]}</td>
                  <td scope="col" class="num">${carton.data[2][4]}</td>
                  <td scope="col" class="num">${carton.data[3][4]}</td>
                  <td scope="col" class="num">${carton.data[4][4]}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted" style="font-size: 16px;">${carton.titulo}</small>
            </div>
          </div>
        </div>  
      </div>  
    </div>
  </body>
</html>
    `  } 
    let options = { 
      formt : 'Letter', 
      preferCSSPageSize : true,
      name: 'Mi carton.pdf', 
      printBackground :true}
    let pdfFinal = await html_to_pdf.generatePdf(file, options)
    // console.log(pdfFinal)
    // res.send(pdfFinal)
    res.setHeader('Content-Length', pdfFinal.length)
    res.write(pdfFinal, 'binary')
    // res.redirect('/public/carton.pdf')
  } catch (error) {
    next(error)  
  }
}

module.exports = {
  pdf
}