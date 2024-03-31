const express = require("express");
const app = express();

// Configuration
const port = process.env.DEPLOYPORT || 3000;

// Static Files
app.use(express.static('./src/public'));
app.use("/css", express.static(__dirname + './src/public/css'));
app.use("/img", express.static(__dirname + './src/public/img'));
app.use("/js", express.static(__dirname + './src/public/js'));

// Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routes
// Home - Router
const HomeRouter = require('./src/routes/home.js');
app.use('/', HomeRouter);

// API Youtube - Router
const YoutubeRouter = require('./src/routes/youtube.js');
app.use('/api/youtube', YoutubeRouter);

// Listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});