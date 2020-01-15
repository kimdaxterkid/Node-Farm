const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//------------------------------------------------------------------------------
//  File System
//------------------------------------------------------------------------------

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//------------------------------------------------------------------------------
//  Server
//------------------------------------------------------------------------------
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    const pathName = req.url;
    if (pathname === '/' || pathname === '/overview') {
        console.log(pathName);

        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    else if (pathname === '/product') {
        console.log(pathName);

        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    else if (pathname === '/api') {
        console.log(pathName);

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    else {
        console.log(pathName);

        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

