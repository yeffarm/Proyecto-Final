const {ipcRenderer} = require("electron")
document.getElementById("ids").disabled = true
ipcRenderer.on("respuesta4",(event,args)=>{
})

var np = document.getElementById("nomProducto")
var pr = document.getElementById("pro")
var num = document.getElementById("cantidad")
var a  = document.getElementById("mostrar")

document.getElementById("formulario4").addEventListener("submit",
function(){

   alert("Pedido agregado ")
    ipcRenderer.send("pedido",[np.value,pr.value,num.value])
    
})

document.getElementById("import").addEventListener("click",
function(){
    ipcRenderer.send("listaPEdidos")
})
//mostrando pedidos
ipcRenderer.on("respuestas", (event, args) => {
    for (let i = 0; i < args.length; i++) {
        var eleme = args[i];
        a.innerHTML += "NOMBRE:  "+eleme['nombreP'] + "<br>" + "PROVEEDOR:  " + eleme["nomProvee"] + "<br>" + "CANTIDAD: " + eleme["cantidad"]   + "<br>" + "<br>"

    }
})