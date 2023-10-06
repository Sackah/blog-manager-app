const express = require('express');
const app = express();

app.listen(4000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res)=>{
    console.log('request made');
    res.redirect('/blogs');
});
app.get('/blogs', (req, res)=>{
    res.render('index', {title: 'Home'});
})
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
})
app.get('/create', (req, res)=>{
    res.render('create', {title: 'Create Blog'});
})