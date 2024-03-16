const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PORT = 8000;

const server = (req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url);

    if (req.url === '/') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } else if (req.url === '/cars') {
        filePath = path.join(PUBLIC_DIR, 'rentCar.html');
    }

    fs.exists(filePath, (exists) => {
        if (exists) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    const contentType = getContentType(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404);
            res.end('File Not Found');
        }
    });
};

const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/plain';
    }
};

http.createServer(server).listen(PORT);
console.log('Server is up and running on port ' + PORT);
