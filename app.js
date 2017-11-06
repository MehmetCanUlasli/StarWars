var app = require('express')();
var request = require('request');
var fs = require("fs");

app.set("view engine","ejs");

app.use((req,res,next)=>
{
    var zaman = new Date().toString();
    var log = zaman + " " + req.url + " " + req.ip;
    
    fs.appendFile("server.log", log +"\n", (err) =>
{
    if(err)
    {
        console.log(err);
    }
});
    next();
})

// Bakım Olduğu Zaman
/*app.use((req,res,next) =>
{
    res.render("bakim");
})*/

app.get("/", (req,res) => 
{
    res.render("arama");
});

app.get("/sonuc",(req,res) =>
{
    var sorgu = req.query.sorgu;
    var url = "https://swapi.co/api/people/?search=" + sorgu;

    request(url, (error,response,body) =>
    {
        if (!error && response.statusCode == 200)
        {
            var veri = JSON.parse(body);
            
            res.render("sonuc",
            {
               veri: veri 
            });
        }
        else 
            console.log("Bir Hata Oluştu: \n",error);
    });
});


app.listen(process.env.PORT);