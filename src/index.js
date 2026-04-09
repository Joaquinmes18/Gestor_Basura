/**
 * Gestor de Basura
 * Sistema de Gestión de Residuos en JavaScript
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, '..', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la página');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

server.listen(PORT, () => {
    console.log(`¡Hola Gestor de Basura!`);
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Presiona Ctrl+C para detener el servidor`);
});
