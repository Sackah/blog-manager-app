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
    let curDate = new Date;
    const date = convertToStandardTime(curDate.toISOString()); 
    const blogs = [
        {title: 'First blog', snippet: 'this is the first blog', author: 'NY Times', date, id: '1'},
        {title: 'Second blog', snippet: 'this is the second blog', author: 'yoshi', date, id: '2'},
        {title: 'Third blog', snippet: 'this is the third blog', author: 'mario', date, id:'3'}
    ]

    res.render('index', {title: 'Home', blogs});
})
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
})
app.get('/create', (req, res)=>{
    res.render('create', {title: 'Create Blog'});
})


//helper functions
function convertToStandardTime(isoDateString) {
    // Create a new Date object from the ISO date string
    let date = new Date(isoDateString);

    // Define options for toLocaleString method
    let options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };

    // Convert date to specified format
    let standardTime = date.toLocaleString('en-US', options);

    // Replace comma before time with "at"
    standardTime = standardTime.replace(',', ' at');

    return standardTime;
}

//console.log(convertToStandardTime('2023-10-05T21:44:06.703+00:00'));