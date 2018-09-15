var express = require('express');
var router = express.Router();
const Artworks = require('../../models/db').Artworks;

router.get('/', (req, res, next) => {
    Artworks.all((err, artwork) => {
        if (err) return next(err);

        res.format({
            html: () => {
                res.render('pages/artworks', { artwork, title: 'View all prints | Prints | Tate Shop' });
            },
            json: () => {
                res.send(artwork);
            }
        });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Artworks.find(id, (err, artwork) => {
        if(err) return next(err);

        res.format({
            html: () => {
                res.render('pages/artwork', { artwork, title: 'artist: title | Custom prints | Tate Shop' });
            },
            json: () => {
                res.send(artwork);
            }
        });
    });
});

router.post('/artworks', (req, res, next) => {
    const url = req.body.url;

    read(url, (err, result) => {
        if(err || !result) res.status(500).send('Error downloading article');
        Artworks.create(
            { title: result.title, content: result.content },
            (err, artwork) => {
                if(err) return next(err);
                console.log(artwork);
                res.send('OK');
            }
        );
    });
});

module.exports = router;
