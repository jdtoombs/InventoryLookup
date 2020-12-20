require('dotenv').config();

const express = require('express');
const request = require('request');

var totp = require('notp').totp;
var base32 = require('thirty-two');

const getTwoFactor = () => {
    return totp.gen(base32.decode(process.env.BIT_SKINS_SECRET));
}

var app = express();

var port = process.env.PORT || 4000;
app.listen(port);

// a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

app.get('/inventory/:bitID', function(req, resp) {
    var url = `http://steamcommunity.com/inventory/${req.params.bitID}/730/2?l=english&cou`;
    request.get(url, function(error, res, body) {
        resp.setHeader('Content-Type', 'application/json');
        resp.send(body);
    });
});

app.get('/profile/:bitId', function(req, resp) {
    var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${req.params.bitId}`;
    request.get(url, function(error, res, body) {
        resp.setHeader('Content-Type', 'application/json');
        resp.send(body);
    });
});

app.get('/bitId/lookup/:steamId', function(req, resp) {
    var url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${req.params.steamId}`;
    request.get(url, function(error, res, body) {
        resp.setHeader('Content-Type', 'application/json');
        resp.send(body);
    });
});

app.post('/prices', function(req, resp) {
    var url = `https://bitskins.com/api/v1/get_all_item_prices/?api_key=${process.env.BIT_SKINS_API_KEY}&code=${getTwoFactor()}&app_id=730`;
    request.get(url, function(error, res, body) {
        resp.setHeader('Content-Type', 'application/json');
        resp.send(body);
    });
});