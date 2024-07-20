/* Global Variables */
const apiKey = 'c2c2e03266826ccaf2b58838e228fe88&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function to GET Web API Data
const getWeatherData = async (zip) => {
    const res = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}`);
    try {
        const data = await res.json();
        if (data.cod !== 200) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to GET Project Data and update UI
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees' ;
        document.getElementById('content').innerHTML = allData.userResponse ;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(newZip)
        .then(function (data) {
            if (data && data.main) {
                postData('/add', {
                    temperature: data.main.temp,
                    date: newDate,
                    userResponse: feelings
                })
                .then(() => {
                    retrieveData();
                });
            } else {
             document.getElementById('temp').innerHTML = '';
                document.getElementById('content').innerHTML = '';
                document.getElementById('date').innerHTML = '';
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
            document.getElementById('temp').innerHTML = '';
            document.getElementById('content').innerHTML = '';
            document.getElementById('date').innerHTML = '';
        });
}