const validator = require('validator');
const { nanoid } = require('nanoid');

const { ShortURL } = require('../model');

const newShortUrl = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            msg: "url field is missing",
            error: true
        });
    }
    else if (!validator.default.isURL(url)) {
        return res.status(422).json({
            msg: "url field must be a valid URL",
            error: true
        });
    }

    try {
        const code = nanoid(7).toString();

        const newUrl = new ShortURL({
            originalUrl: url,
            code
        });

        await newUrl.save();

        return res.status(201).json({
            shortUrl: `http://${process.env.API_HOST}:${process.env.API_PORT}/${code}`,
            code
        })
    }
    catch (e) {
        return res.status(500).json({
            msg: 'Error when trying to shorten url',
            error: false
        });
    }
}

const urlStats = async (req, res) => {

    const { urlCode } = req.params;

    try {
        const urlData = await ShortURL.findOne({
            where: { code: urlCode },
            attributes: {
                exclude: ['id']
            }
        })

        if (!urlData) {
            return res.status(400).json({
                msg: "Short url doesn't exist",
                error: true
            });
        }

        const { originalUrl, code, hits, createdAt, updatedAt } = urlData;

        return res.status(200).json({
            shortUrl: {
                originalUrl, code, hits, createdAt, lastHit: updatedAt
            },
            error: false
        })
    }
    catch (e) {
        return res.status(500).json({
            msg: 'Error when trying to get url hits',
            error: true
        })
    }
}

const redirectToURL = async (req, res) => {
    try {
        const shortUrl = await ShortURL.findByPk(req.params.urlCode);

        if (!shortUrl) {
            return res.status(400).json({
                msg: "Short url doesn't exist",
                error: true
            })
        }

        shortUrl.hits++;
        await shortUrl.save();

        return res.redirect(shortUrl.originalUrl);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: 'Error when trying to access url',
            error: false
        })
    }
}

module.exports = {
    UrlController: {
        newShortUrl,
        redirectToURL,
        urlStats
    }
}