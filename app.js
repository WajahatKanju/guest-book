const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

let entries = [];
app.locals.entries = entries;


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {
    message: "Hello World!",
  });
});

app.get("/new-entry", function (req, res) {
    res.render("new-entry");
});

app.post("/new-entry", function (req, res) {
    
    if(!req.body.title || !req.body.body){
        res.status(400).send('Entries Must have a body and a title')
        return;
    }

    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date() ,
    })
    res.redirect("/");
});

app.use((req, res) => {
    res.status(404).render('404');
})

http.createServer(app).listen(3000, () => {
    console.log("Guest Book App litening on Port 3000")
});
