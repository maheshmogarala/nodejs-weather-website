const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');


const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
//Define paths for express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlers engine and views location

app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));



// app.get('/help',(req,res)=>{
//     res.send('Welcom toHelp page');
// })
// app.get('/about',(req,res)=>{
//     res.send('About Us');
// })

app.get('',(req,res)=>{
    res.render('index',{
        name:'Mahesh',
        title:'Weather App'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Mahesh M',
        title:'About Us'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!',
        message:'How may we help you ?',
        name:'Mahesh'
    })
})
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must enter an address!'
        })
    }
   else{
    const location=req.query.address;
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({
                error
            });
        }
        else{
            //console.log('Weather report for : ',location)
            forecast(latitude,longitude,(error,{temperature,feelslike}={})=>{
                if(error){
                    return res.send({
                        error
                    });
                }
                
                res.send({location,
                    temperature,
                    feelslike
                })
            })
        }
     })
   }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must enter a search value!'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Help Article Not Found',
        name:'Mahesh'
    });
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Page Not Found',
        name:'Mahesh'
    });
})
app.listen(port,()=>{
    console.log('Listening on Port 30000');
});