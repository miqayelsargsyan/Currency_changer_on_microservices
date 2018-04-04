const cote = require('cote');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
let port = 3000;

app.post('/api/convert', (req, res) => {
    const requester = new cote.Requester({name: 'currency conversion requester'});

    const request = { type: 'convert', from: 'usd', to: 'eur', amount: req.body.amount };
    
    
    requester.send(request, (res) => {
        console.log(res)
    })
})



app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})