const express = require('express');
const jwt_decode = require('jwt-decode');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public', {
    setHeaders(res, path, stat) {
        res.set('Cross-Origin-Opener-Policy', 'unsafe-none');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Access-Control-Allow-Origin', '');
    }
}));
app.post('/jwtres', (req, res) => {
    const resobj = (jwt_decode(req.body.credential));
    res.send(`<html><body><p> name : ${resobj.name}</p>
                            <p> email: ${resobj.email}</p>
                            <p> profile: <img src="${resobj.picture}"></p>
                            <p> issued on: ${Date(resobj.iat)}</p>
                            </body>
                            </html> `);
});
app.listen(5500, () => {
    console.log('listening at 5500');
});