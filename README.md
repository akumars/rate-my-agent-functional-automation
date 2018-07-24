# Rate-My-Agent Functional Automation

## 🔥 Quick Start

 1. Install [Node.js and NPM](https://nodejs.org).
 2. Run `npm install` within the project root directory in Terminal to install dependencies.
 3. Specify the base URL for frontend tests in conf.js (under the path  /protractor-tests)
 4. Run `npm run start:wd-manager` to start selenium server.
 5. Run `npm run start:protractor-tests` to run frontend tests.
 6. To override baseURL run `npm run start:protractor-tests --   --baseUrl=<websiteURL>`. Make sure to add the login credentials for the website in conf.js 
 7. Specify the API endpoint for mocha test as 'ENDPOINT' property in .env file
 8. Specify the login credentials for mocha test as 'EMAIL' and 'PASSWORD' property in .env file
 9. Run `npm run start:mocha-tests` to run backend tests. 

