const { ipcRenderer, ipcMain } = require("electron");


        var nom = document.getElementById("nombre");
        var dpi = document.getElementById("dpi");
        var pas = document.getElementById("pass");
        var err = document.getElementById("error");  
        var me  = document.getElementById("mensaje")
document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        pass.classList.remove("invalid");
        err.innerHTML = "";

       if (pass.value.length < 8) {
            err.innerHTML += "Necesitas 8 caracteres contraseña <br>";
            pass.classList.add("invalid");
        }
        var exprMay = RegExp("[A-Z]");
        var exprNum = RegExp("[0-9]");

        if (!pass.value.match(exprMay)) {
            err.innerHTML += "Necesitar tener una mayuscula<br>";
            pass.classList.add("invalid");
        }
        if (!pass.value.match(exprNum)) {
            err.innerHTML += "Necesitar tener un numero<br>";
            pass.classList.add("invalid");
        }
        //validando para poder enviar informacion 
        if (!pass.classList.contains("invalid")) {
            ipcRenderer.send("registro", [nom.value, pas.value, dpi.value])
            document.getElementById("dpi").disabled = true
            me.innerHTML = "REGISTRADO INICIE SESION"
            err.innerHTML = ""
            nom.value = ""
            dpi.value = ""
            pas.value = ""
        }
        
    });
   

    //boton inicio sesion------------
    document.getElementById("iniciar").addEventListener("click",
    function(event){
         ipcRenderer.send("sesion",[nom.value,pas.value])
    }
    )


