const express=require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();
var infoLog = console.info;
var errLog = console.error;


hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getYear',  new Date().getFullYear());
hbs.registerHelper('highlighter', (text)=>{return text.toUpperCase();});

app.set('view engine', 'hbs');

// Middleware Start
app.use((req, res, next)=>{
    var now = new Date().toDateString();
    infoLog(`${now}:${req.url}:${req.method}`);
    
    fs.appendFile('server.log',`${now}:${req.url}:${req.method}\n`, (err)=>{
        if(err) errLog(err);
    } );
    next();
})

/*app.use((req, res, next)=>{
    res.render("maintenance.hbs");
});*/
// Middleware End

app.use(express.static(__dirname+"/public"));

app.get('/about', (req, res)=>{
        res.render('about', 
                  {
                    body: 'This is rendered about page',
                    title : 'About'
                });
        }
);


app.get('/project', (req, res)=>{
        res.render('projects', 
                  {
                    body: 'This is rendered project page',
                    title : 'Projects'
                });
        }
);

app.get('/jsonView', (req, res)=>{
        res.send({
            name : 'senthil',
            age : 30,
            languages : {
                            desc : 'List of languages known to me!!',
                            langugage:['Tamil', 'English', 'Hindi', 'Malayalam']
                        }
                });
});

//Server request API handlers
app.get('/*', (req, res)=>{
        res.render('home', 
                  {
                    body: 'This is rendered main page. To be continued',
                    title : 'Main'
                });
        }
);

// Server listener
app.listen(port, ()=>{
    infoLog(`Server is running in ${port}`);
});
