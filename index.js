const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    if (req.url === '/resource') {
        const filePath = path.join(__dirname, '/resource.js');
        setTimeout(() => {
          fs.readFile(filePath, (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data);
        });
        }, 10000)
    }
}).listen(80);
