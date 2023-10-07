const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();


mongoose.connect(process.env.DB_URI)
    .then((result)=>{
        console.log('db connected');
        app.listen(4000, '0.0.0.0');
    })
    .catch((err)=>{
        console.log(err.message);
    })

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    console.log('request made');
    res.redirect('/blogs');
});
app.get('/blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            const blogs = result.map((blog)=>{
                return { 
                    ...blog._doc,
                    date: convertToStandardTime(blog.createdAt)
                 };
            })
            res.render('index', {title: 'Home', blogs: blogs});
        })
        .catch((err)=>{
            console.log(err.message)
        })
    
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
});

app.get('/create', (req, res)=>{
    res.render('create', {title: 'Create Blog'});
});

app.post('/create', (req, res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err.message);
        });
});

app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;

    Blog.findById(id)
        .then((result)=>{
            res.render('blogDetails', {title: 'Blog Details', blog: result});
        })
        .catch((err)=>{
            console.log(err.message);
            res.status(404).render('404', {title: 'Blog Not Found'});
        });
});

app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({
                redirect: '/blogs'
            });
        })
        .catch((err)=>{
            console.log(err.message);
        });
});

app.use((req, res)=>{
    res.status(404).render('404', {title: 'Not Found'});
});


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