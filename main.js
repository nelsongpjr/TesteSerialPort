var fs = require('fs');
var SerialPort = require('serialport');
var port = new SerialPort('COM1', {parser: SerialPort.parsers.readline("\r\n")});

function start() {

    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }

        // write errors will be emitted on the port since there is no callback to write 
        port.write('main screen turn on');
    });

// the open event will always be emitted 

}
start();

port.on('open', onOpen);

port.on('data', onData);

function onOpen() {
    console.log("Open Connection!")
}
function onData(data) {
    console.log("data: " + data);
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);

    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, fileName) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file

    fs.writeFileSync(fileName, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
var base64str = base64_encode('k.pdf');
//console.log(base64str);
// convert base64 string back to image 
base64_decode(base64str, 'copy.pdf');