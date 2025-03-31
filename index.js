const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    if (req.url === '/resource') {
        console.log('requested');
        
        const filePath = path.join(__dirname, '/resource.js');
        fs.readFile(filePath, (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                // 添加缓存控制头
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(data);
        });
    }
}).listen(80);
