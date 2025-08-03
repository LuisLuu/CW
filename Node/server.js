const http = require('http'); //Import node.js core module
const server = http.createServer(function(req, res) {
    //Creating server
    //handeling request here
    if (req.url == '/') { //check the url of the current request
        //set respond header
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<html><body><p>this is homepage</html></body></p>');
        res.end();
    }
    else if (req.url == "/student") {
        res.writeHead(200,{'content-type': 'text/html'});
        res.write('<html><body><p>Student page overhere</html></body></p>');
        res.end();
    }
    else if (req.url == "/admin") {
        res.writeHead(200,{'content-type': 'text/html'});
        res.write('<html><body><p>Preserved for admin</html></body></p>');
        res.end();
    }
    else if (req.url == "/data") {
        res.writeHead(200,{'content-type': 'application/json'});
        res.write(JSON.stringify ({ message: "Hello yall JSON here "}));
        res.end();
    }
    else
        res.end('invalid request');

})
server.listen(8000); //hear any incoming request
console.log('NOde.js web server at port 8000 is running...');
