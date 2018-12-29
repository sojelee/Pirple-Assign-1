// Dependencies
const http          = require('http');
const url           = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config        = require('./config');
const lang          = require('./lang');

// Instatiate the Http Sever
const server = http.createServer((req,res)=> {

// Parse the url
  let passedUrl = url.parse(req.url,true);
// Get the parth from the passed url
  let path      =passedUrl.pathname;
// Get the method fro the request
  let method    = req.method.toLowerCase();
// Trim slashes from the url
  let trimmedPath = path.replace(/^\/+|\/+$/g,'');
// Get the query string object from the url
  let queryStringObject = passedUrl.query;
// Get the headers comming with the request
  let headers = req.headers;
// Create the decoder instance
  let decoder = new StringDecoder('utf-8');
// Initialize the varialbe to hold the decoded data comming with the request
  let buffer = '';

// Extract the name key from the query string object
  const nameParam = typeof(queryStringObject.name)=='undefined'?'':queryStringObject.name;

// Extract the language key from the query string object
  const langParam = lang[queryStringObject.lang]?queryStringObject.lang:'en';

// Get the greet part from the languages object
  let greet = lang[langParam]['greet']
// Get the welcome phrase from the languages object
  let welcome = lang[langParam]['welcome']

  req.on('data', (data)=> buffer += decoder.write(data));
  req.on('end',()=>{

      buffer += decoder.end();
      let chosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath]: handlers.notFound;
      let data = {
        'trimmedPath':trimmedPath,
        'queryStringObject':queryStringObject,
        'method':method,
        'headers':headers,
        'payload':buffer,
        'name':nameParam,
        'greet':greet,
        'welcome':welcome
      }
      chosenHandler(data,(statusCode,payload)=>{

        statusCode = typeof(statusCode) =='number'?statusCode:200;
        payload = typeof(payload) =='object'?payload:{};
        let payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type','application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log(`Returning this response `,statusCode, payloadString);
      });
  });
});

// Create Server Instance
server.listen(config.port,()=>console.log(`Server is running on port ${config.port} on ${config.envName} environment`));

// Defind the handler object
let handlers = {};
// Add hello handler function
handlers.hello = (data,callback)=>{
  callback(200,{'message':`${data.greet} ${data.name}! ${data.welcome}`});
}
// Not found hanlder
handlers.notFound = (data,callback)=>{
  callback(404);
}

// The request router
const router = {
  'hello':handlers.hello,
}
