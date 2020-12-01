const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');

const { request } = require('http');
const { default: Axios } = require('axios');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response)=>{
    response.sendFile(__dirname+ '/index.html');
    //response.send("<h1>HAWAU World?!</h1>");
});

app.post('/', (request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);

    Axios.get('https://api.coindesk.com/v1/bpi/currentprice/EUR.json')
    .then(res => {

        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log('EUR', eur);
        console.log('USD', usd);
        let message = "";


        if(userChoice === "EUR"){
            message = "EUR" + eur;
        } else {
            message = "USD" + usd;
        }
        response.send(message);
    });


});


app.get('/about', (request, response) => {
    response.send("Alex says HUD!");
});

app.get('/contact', (request, response) => {
    response.send("+372 5832 7686");
});



app.listen(3000, ()=>{
    console.log('Server is runningon Port 3000');
});