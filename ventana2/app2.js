const { ipcRenderer } = require("electron")
alert("Bienvenido")

var a = document.getElementById("contenido")
ipcRenderer.on("respuesta", (event, args) => {
})

document.getElementById("bot").addEventListener("click",
    function () {
        ipcRenderer.send("consulta", "realizado")

    })

    //boton editar mostrar ventana 3
document.getElementById("bot1").addEventListener("click",
function(){
    ipcRenderer.send("editar","hecho")
})
//mostrando productos
ipcRenderer.on("respuesta2", (event, args) => {
    for (let i = 0; i < args.length; i++) {
        var element = args[i];
        a.innerHTML += "ID:  "+element['idProduc'] +" / "+ "NOMBRE:  " + element['nombre'] + "<br>" + "DESCRIPCION:  " + element["descripcion"] + "<br>" + "CATEGORIA: " + element["categoria"] + "<br>" + "EXISTENCIA: " + element["existencia"] + "<br>" + "PEDIDO:  "  + "<br>" + "<br>"

        console.log(args[0])
    }
})

document.getElementById("bot2").addEventListener("click",
function(){
    ipcRenderer.send("solicitar")
})


