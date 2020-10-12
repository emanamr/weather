/* Global Variables */

let d = new Date();
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=cd26640c3e69315cfedabc332feb49fd';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', Action);

/* Function called by event listener */
function Action(e) {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getZip(baseURL, zipCode, apiKey)
        .then(function(data){
            console.log(data);

            postData('/addData', { date: newDate, temp: data.list[0].main.temp , content:feeling});
            updateUI();
        });

};

/* Function to GET Web API Data*/
const getZip = async (baseURL, zip, key) => {

    const res = await fetch(`${baseURL}${zip}${key}`);
    try {

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
/* Function to POST data */
const postData = async (url='' , data={} ) => {
    console.log(data);
    const response = await fetch (url, {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
    
};

/* Function to UPDATE UI*/
const updateUI = async () => {
    const request = await fetch('/allData');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `${allData.temp}`;
        document.getElementById('date').innerHTML = `${allData.date}`;
        document.getElementById('content').innerHTML = `${allData.content}` ;

    } catch (error) {
        console.log("error", error);
    }
};

// Create a new date instance dynamically with JS

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();