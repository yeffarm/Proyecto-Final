const { ipcMain } = require("electron")

const { app, BrowserWindow } = require("electron")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")



let ventana
function ventanaPrincipal() {
    ventana = new BrowserWindow({
        width: 600,
        heigth: 300,
        webPreferences: ({
            nodeIntegration: true
        })
    })
    ventana.loadFile("./index.html")
}
app.whenReady().then(ventanaPrincipal)

let ventana2
function ventanaPrincipal2() {
    ventana2 = new BrowserWindow({
        width: 601,
        heigth: 310,
        webPreferences: ({
            nodeIntegration: true
        })
    })
    ventana2.loadFile("./ventana2/index2.html")
}

let ventana3
function ventanaPrincipal3() {
    ventana3 = new BrowserWindow({
        width: 601,
        heigth: 310,
        webPreferences: ({
            nodeIntegration: true
        })
    })
    ventana3.loadFile("./ventana3/index3.html")
}

let ventana4
function ventanaPrincipal4() {
    ventana4 = new BrowserWindow({
        width: 601,
        heigth: 310,
        webPreferences: ({
            nodeIntegration: true
        })
    })
    ventana4.loadFile("./ventana4/index4.html")
}


//conceccion de base de datos
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "SuperMercado2021"
})
//ingreso de datos de registro
ipcMain.on("registro", (event, args) => {
    let nombre = args[0]
    let contraseña = args[1]
    let dpi = args[2]
    

    bcrypt.hash(contraseña,8, (err, con_hash) => {
        connection.query('INSERT INTO usuario VALUES(0,?,?,?)',
            [nombre, con_hash, dpi]
        )
        
       })
})
//verificando contraseña 
ipcMain.on("sesion",(event,args)=>{
    let nombre = args[0]
    let contraseña = args[1]

    connection.query('SELECT contraseña FROM usuario WHERE nombre = ?',
    nombre,
    function(err,results,fields){
        if(err){
            console.log(err)
        }else{
            let contraRes = results[0]
            bcrypt.compare(contraseña,contraRes.contraseña, function(error,same){
                 if(same){
                    ventanaPrincipal2()
                    ventana2.webContents.on("did-finish-load", () => {
                        ventana2.webContents.send("respuesta")
                        ventana.close()
                    })
                }else{
                   console.log(error)
                }

            })
        }

    } )
         
    
})

//consulta de productos
ipcMain.on("consulta", function (event, args) {
    connection.query('SELECT * FROM productos',
        function (err, results, fields) {
            event.reply("respuesta2", results)
        }

    )
})

//resiviendo mensaje y abriendo ventana 3
ipcMain.on("editar", (event, args) => {
    ventanaPrincipal3()
    ventana3.webContents.on("did-finish-load", () => {
        ventana3.webContents.send("respuesta3")
    })
})

//editar producto
ipcMain.on("editar2", (event, args) => {
    connection.query('UPDATE supermercado2021.productos SET nombre = ?, descripcion = ?, categoria = ?, existencia = ? WHERE idProduc = ?', args)
})

//eliminar producto
ipcMain.on("eliminar", (event, args) => {
    connection.query('DELETE FROM supermercado2021.productos WHERE idProduc = ?', args)

})
//realizar pedido
ipcMain.on("solicitar", (event, args) => {
    ventanaPrincipal4()
    ventana4.webContents.on("did-finish-load", () => {
        ventana4.webContents.send("respuesta4")
    })
})
//guardando pedido
ipcMain.on("pedido", (event, args) => {
    connection.query('INSERT INTO pedidos VALUES(0,?,?,?)', args)
})

//mostrando pedidos
ipcMain.on("listaPEdidos", function (event, args) {
    connection.query('SELECT * FROM pedidos',
        function (err, results, fields) {
            event.reply("respuestas", results)
        }

    )
})







