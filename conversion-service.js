const cote = require('cote');
const request = require('request');
const bodyParser = require('body-parser');
const responder = new cote.Responder({ name: 'currency conversion responder' });
const subscriber = new cote.Subscriber({ name: 'arbitration subscriber' });

const key = '6002a6eedee7b56e4b903d4d878e6bb5';

let rates = {};

    request({
        url: `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,AED`,
        json: true
    }, ( error, response, body ) => {
         rates = { eur_usd: body.rates.USD, eur_aed: body.rates.AED };
    })


subscriber.on('update rate', (update) => {
    rates[update.currencies] = update.rate;
});

responder.on('convert', (req, callback) => {
    callback(req.amount * rates[`${req.from}_${req.to}`])
})