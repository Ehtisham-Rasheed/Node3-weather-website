const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

//Setup handlebars engine and view location.
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => 
{
    res.render("index", {
        title: "Weather App",
        name: "Ehtisham Rasheed",
    });
})

app.get("/about", (req, res) =>
{
    res.render("about", 
    {
        title: "About Page",
        name: "Ehtisham Rasheed"
    })
})

app.get("/help", (req, res) =>
{
    res.render("help", 
    {
        title: "Help Page",
        name: "Ehtisham Rasheed",
        helpText: "This is some helpful text"
    })
})

app.get("/weather", (req, res) => 
{
   if(!req.query.address)
   {
       return res.send({
           error: "You must provide an address",
       })
   }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => 
   {
       if(error)
       {
            return res.send({error});
       }

       forcast(latitude, longitude, (error, forcastData) => 
   {
       if(error)
       {
           return res.send({error});
       }
       res.send({
           forcast: forcastData,
           location,
           address: req.query.address
       })
   })
   })

   
})

app.get("/products", (req, res) =>
{ 
    if(!req.query.search)
    {
       return res.send({
            error: "You must provide a search term",
        })
    }

    console.log(req.query.search);
    res.send({
        products:[],
    })
})

app.get("/help/*", (req, res) =>
{
    res.render("404",({
        title: "404",
        name: "Ehtisham Rasheed",
        errorMessage: "Help article not found"
    }))
})

app.get("*", (req, res) =>
{
  res.render("404",({
      title: "404",
      name: "Ehtisham Rasheed",
      errorMessage: "Page not found"
  }))
})


app.listen(3000, () => 
{
    console.log("Server is up on port 3000");
})