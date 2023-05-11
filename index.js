
// import filesystem 
const fs = require('fs');

// import axios
const axios = require('axios');



try{
//do this so we dont expose our api key in repo
const API_KEY = fs.readFileSync('keys/api-key.txt', 'utf8');
} catch (error) {
  console.error('Error: API key file not found. Please add your API key to keys/api-key.txt');
  return;
}

//make sure its not null`
if (API_KEY === '') {
  console.error('Error: API key is null. Please check your API key in keys/api-key.txt');
  return;
}


//our api root endpoint
const BASE_URL = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/';

//config for axios
const axiosConfig = {
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  }
}



// get all outages
const getAllOutages = async (axiosInstance) => {
  const response = await axiosInstance.get('outages');
  d('outages response received')
  return response.data;
};


// get site info
const getSiteInfo = async (siteId, axiosInstance) => {
  const response = await axiosInstance.get(`site-info/${siteId}`);
  d('siteInfo response received')
  d(response.data)
  return response.data;
};

// filter outages to only include those that are not in the future, not older than jan 1, 2022 and are for devices at the site
// return the filtered outages
const filterOutages = (outages, siteInfo) => {
  const filteredOutages = outages.filter(outage =>
    new Date(outage.begin) >= new Date('2022-01-01T00:00:00.000Z') &&
    siteInfo.devices.some(device => device.id === outage.id)
  );
  return filteredOutages;
};

// attach device names to outages and return the outages
const attachDeviceNames = (outages,siteInfo) => {

  const outagesWithNames = outages.map(outage => {
    const device = siteInfo.devices.find(device => device.id === outage.id);
    return {
      ...outage,
      name: device.name,
    };
  });
  return outagesWithNames;
};

// post outages to site
const postSiteOutages = async (siteId, outages, axiosInstance) => {
  const response = await axiosInstance.post(`site-outages/${siteId}`, outages);
  d('postSiteOutages response received')
  return response.status;
};

// main function
const main = async () => {
  try {

    //create our axios instance
    const axiosInstance = axios.create(axiosConfig);

    const siteId = 'norwich-pear-tree';

    //get all outages, site info, filter outages, attach device names, post outages
    const outages = await getAllOutages(axiosInstance);
    const siteInfo = await getSiteInfo(siteId, axiosInstance);
    const filteredOutages = filterOutages(outages, siteInfo);
    const outagesWithNames = attachDeviceNames(filteredOutages, siteInfo);
    const result = await postSiteOutages(siteId, outagesWithNames, axiosInstance);
    
    if(result !== 200) throw new Error('Error posting outages'); //if something very unexpected happens
    
    //some debug output
    d(['outages', outages]);
    d(['siteInfo', siteInfo]);
    d(['filteredOutages', filteredOutages]);
    d(['outagesWithNames', outagesWithNames]);
    d(['Outages successfully posted:', result]);
  } catch (error) {
    if(typeof error.response === 'undefined') {
      console.error('Error processing outages: no error object defined');
      return;
    }
    console.error('Error processing outages:', error);

    switch (error.response.status) {
      case 400:
        message = "We cannot process your request because it doesn't match the required format."
        break;
      case 403:
        message = "You do not have the required permissions to make this request."
        break;
      case 404:
        message = "You have requested a resource that does not exist."
        break;
      case 429:
        message = "You've exceeded your limit for your API key."
        break;
      case 500:
        message = "An internal server error occurred."
        break;
      default:
        message = "An error occurred while processing your request."
        break;
    }

    console.error(message);

  }
};

function d(message) {
  if (process.env.DEBUG) {
    console.log("DEBUG: " + Date.now() +": ", message);
  }
}

main();


//export our functions for test suite
module.exports = {
  getAllOutages,
  getSiteInfo,
  filterOutages,
  attachDeviceNames,
  postSiteOutages,
};