const http = require('http');
const {URL} = require('url')
const path = require('path')
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    if (req.url === '/resource') {
        console.log('===========');
        
        const filePath = path.join(__dirname, '/resource.js');
        let statObj = await fs.stat(filePath)
        // console.log('statObj', statObj)
        const content = await fs.readFile(filePath)
        let ctime = statObj.ctime.toGMTString()
        const date = new Date(ctime);
        date.setHours(date.getHours() + 8);
        const beijingTime = date.toISOString().replace('Z', ''); // 2025-03-23T22:12:29.286
        let ifModifyedSince = req.headers['if-modified-since']
        console.log(ifModifyedSince, ctime)
        if(ifModifyedSince !== ctime) {
            console.log(1)
            res.writeHead(200, {
                'Last-Modified': ctime,
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/javascript',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type'
            });

            res.end(content);
        } else {
            res.writeHead(304, {
                'Last-Modified': lastModified,
                'Cache-Control': 'no-cache'
            });
            res.end();
        }
    }
}).listen(80);
