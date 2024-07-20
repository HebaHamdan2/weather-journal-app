// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
var express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cors for cross origin allowance
var cors = require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// GET route to return projectData
app.get('/all', (req, res) => {
  
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
  projectData = {
      temperature: req.body.temperature,
      date: req.body.date,
      userResponse: req.body.userResponse
  };
  res.send(projectData);
})

// Setup Server
let port=3000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};