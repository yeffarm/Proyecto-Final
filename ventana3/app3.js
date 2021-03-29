const  {ipcRenderer} = require("electron")


ipcRenderer.on("respuesta3",(event,args)=>{
    console.log(args)
})

var nom = document.getElementById("nombre")
var de = document.getElementById("desc")
var ca = document.getElementById("cate")
var e = document.getElementById("exis")
var el = document.getElementById("elim")
var d = document.getElementById("id")


document.getElementById("formularioP").addEventListener("submit",
function(){
    
    ipcRenderer.send("editar2",[nom.value,de.value,ca.value,e.value,d.value])

})
document.getElementById("eli").addEventListener("click",
function(){
    ipcRenderer.send("eliminar",[el.value])
})