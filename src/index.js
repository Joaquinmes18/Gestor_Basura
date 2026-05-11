import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
    let filePath = '';

    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, '..', 'index.html');

        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });

                res.end('Error al cargar la página');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            res.end(data);
        });

        return;
    }

    if (req.url === '/src/basura-presenter.js') {
        filePath = path.join(__dirname, 'basura-presenter.js');

    } else if (req.url === '/src/basura-model.js') {
        filePath = path.join(__dirname, 'basura-model.js');

    } else if (req.url === '/src/basura-view.js') {
        filePath = path.join(__dirname, 'basura-view.js');

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end('Página no encontrada');
        return;
    }

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain; charset=utf-8'
            });

            res.end('Error al cargar archivo JS');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/javascript; charset=utf-8'
        });

        res.end(data);
    });
});

server.listen(PORT, function () {
    console.log('¡Hola Gestor de Basura!');
    console.log('Servidor ejecutándose en http://localhost:' + PORT);
    console.log('Presiona Ctrl+C para detener el servidor');
});