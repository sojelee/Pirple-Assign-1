Node Master Class Home Assignment #1

Create a simple "Hello World" API. Meaning:


It should be a RESTful JSON API that listens on a port of your choice.

The API containes three files

config.js Configuration file containing running ports and environment names for staging and production
index.js  Application Entry file
lang.js   containts object of language options

When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

Solution

'Not Found handler' on for any request that does not have /hello in the path
On /hello it return greeting "Hello ! Join Pirple to Master Nodejs" which default to English.
You can add lang query parameter (eg. /hell?lang=sw) for another language.
You can add name query parameter to get you name added to the response (ex. /hello?lang=sw&name=Joselee).

Available langauges parameters:
en -> English
es -> Spanish
sw -> Swahili
