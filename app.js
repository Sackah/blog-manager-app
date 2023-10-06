const express = require('express');
const app = express();

app.listen(4000);

app.use(express.static('public'));

app.get('/', (req, res)=>{
    console.log('request made');
    res.sendFile(`${__dirname}/views/index.html`);
});