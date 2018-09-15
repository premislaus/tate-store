var express = require('express');
var router = express.Router();
const Artists = require('../../models/db').Artists;

router.get('/', (req, res, next) => {
    Artists.all((err, artist) => {
        if (err) return next(err);

        res.format({
            html: () => {
                res.render('pages/artists', { artist, title: 'All prints by artist A-Z | Prints | Tate Shop' });
            },
            json: () => {
                res.send(artist);
            }
        });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Artists.find(id, (err, artist) => {
        if(err) return next(err);

        res.format({
            html: () => {
                res.render('pages/artist', { artist, title: 'artist: title | Custom prints | Tate Shop' });
            },
            json: () => {
                res.send(artist);
            }
        });
    });
});

module.exports = router;
