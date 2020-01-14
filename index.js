const fs = require('fs');
const http = require('http');
const url = require('url');

//------------------------------------------------------------------------------
//  File System
//------------------------------------------------------------------------------

fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    console.log(data);
});

const data = fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//------------------------------------------------------------------------------
//  Server
//------------------------------------------------------------------------------
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW page');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT page');
    }
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to reqests on port 8000');
});

