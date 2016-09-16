
//O programa envia, recebe, codifica, cria um buffer e descodifica
var fs = require('fs');
var SerialPort = require('serialport');
var port = new SerialPort('COM1');


//abre a conexão e envia o pacote
port.on('open', onOpen);
//abre a conexão e recebe um pacote
port.on('data', onData);




//callback de erro
function onError(err) {
    if (err !== null)
        console.log("Erro: " + err);
    return;
}


function onOpen() {
    console.log("Open Connection!");

    if (fs.existsSync('text.zip')) {

        var base64str = base64_encode('text.zip');
        console.log(base64str);
        port.write(base64str, onError);
    } else {
        console.log("Arquivo não existe!")
    }
    return;
}
console.log(port);
function onData(data) {
    console.log("Arquivo disponível");
    console.log(data);
    
    base64_decode(data, "Arquivo_Recebido.zip");
}


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap);

}


function base64_decode(base64str, fileName) {

    var bitmap = new Buffer(base64str, 'base64');


    fs.writeFileSync(fileName, bitmap);

}


