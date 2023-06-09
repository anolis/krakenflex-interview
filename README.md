# KrakenFlex Backend Test Submission 

## Description
This is a small coding project to assess my skills as a backend engineer, it's basic functionality is to request a list of outages, link them with a site id and subsequent devices associated with the site, also preliminarily filtering the outage set by site and time, after it has done this it posts the outage(s) to an endpoint for later consumption by the front-end assumedly. 

I have created this program mainly using axios as the request/response framework, other than that I have used Jest and raw js to achieve the goals herein.

## Installation
the installation is fairly straightforward, using an up-to-date version of node/npm please use the `npm ci` command to install required dependencies.

One more thing, they key file should be stored in the repo root in a folder titled "keys" and the file should be titled api-key.txt with the token on one line

## Using This Program
You may run the program by running `node index.js` from the repo root
You may also run the program with debugging output enabled by prepending `DEBUG=true` to the command like so `DEBUG=true node index.js`

TL;DR prod: `node index.js`

TL;DR debug: `DEBUG=true node index.js`

## Testing 
this program can be tested by using jest
simply run the command 

`npm test` 

if this does not work it could be possible that jest is not installed some how. 
run this command from within the repo root directory to install it
`npm install --save-dev jest` 

## Subsequent Thoughts and Considerations

 - Could use command line options to generate/populate outage reports by siteId
 - Could output json/csv/xls documents to further the reporting of these metrics
 - Could add this to a cron schedule or work queue to automate these reports

