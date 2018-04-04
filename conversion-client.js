const cote = require('cote');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
let port = 3000;

app.post('/api/convert', (req, res) => {
    const requester = new cote.Requester({name: 'currency conversion requester'});

    let request = { type: 'convert', from: req.body.from, to: req.body.to, amount: req.body.amount };
    
    
    requester.send(request, (result) => {
        res.send(` ${req.body.amount} ${req.body.from} is ${result} ${req.body.to}`)
    })
})



app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})