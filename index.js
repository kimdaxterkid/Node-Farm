const fs = require('fs');
const http = require('http');
const url = require('url');

fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    console.log(data);
});

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW page');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT page');
    } else {
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

