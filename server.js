const exspress = require("express")
const BodyParser = require("body-parser")
const app = exspress();
const formRoutes = require('./routes/formRoutes');
const indexRoutes = require('./routes/indexRoutes');

app.use(exspress.static('public'));
app.use(BodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views", "views")

app.use('/', formRoutes);
app.use('/', indexRoutes);

app.listen(3000, () => {
    console.log("Server actived")
})

