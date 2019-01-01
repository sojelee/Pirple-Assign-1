// Defind the handler object
let handlers = {};

// hello handler function

handlers.hello = (data,callback)=>{
  callback(200,{'message':`${data.greet} ${data.name}! ${data.welcome}`});
}
// Not found hanlder
handlers.notFound = (data,callback)=>{
  callback(404);
}


module.exports = handlers;
