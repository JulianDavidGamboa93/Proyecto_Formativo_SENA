const app = require('./app');

app.listen(app.get('port'),()=>{
    console.log("Servidor Escuchando en el Puerto", app.get("port"));
})