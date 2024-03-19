// This step requires an html document to display content in the server
// The fs module is used and 

const http = require ('http');
const fs = require ('fs')

http.createServer(function(req, res){
  fs.readFile('server.html', function(err, data){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.write(data);
    res.end()
  })
}).listen(8900);


// This is what we learnt in class
const http = require('http');
const myName = "Ajibode Daniel";

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`My name is ${myName}`);
});

const port = 8900;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
