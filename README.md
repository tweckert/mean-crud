MEAN-CRUD
=========
A RESTful CRUD application built on the MEAN stack (Mongo, Express, Angular, Node)
----------------------------------------------------------------------------------

Follow these steps to run this Node.js application:

* download and install Node.js from
``` 
http://nodejs.org/download/
```
* download MongoDB from
``` 
http://www.mongodb.org/downloads
```
* install and startup MongoDB as described
```
http://docs.mongodb.org/manual/installation/
```
* install the required Node.js packages:
```
npm install express --save
npm install mongoose --save
npm install morgan --save
npm install body-parser --save
npm install method-override --save
```
* install in Chrome the Postman REST client
	https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm/related
* run startup.bat to start the Node.js server application
* retrieving all Tshirts (GET): open the Postman REST client in Chrome (note: there aren't any tshirts yet!) and request
	http://localhost:8080/tshirt
* adding a new Tshirt (POST): add a request header "Content-Type" with value "application/json", in the body enter:
```JSON
{
    "model" : "001",
    "price" : "50",
    "style" : "Casual",
    "color" : "red",
    "size" : "40"
}
```		
* you should receive a positive response such as:
```JSON
{
    "status": "OK",
    "tshirt": {
        "__v": 0,
        "model": "001",
        "style": "Casual",
        "size": 40,
        "color": "red",
        "price": 50,
        "_id": "548eac11ae17b81014a335bb",
        "modified": "2014-12-15T09:38:25.939Z"
    }
}	
```
* view the data of the newly created Tshirt by requesting (GET):
```
http://localhost:8080/tshirt/548eac11ae17b81014a335bb
```

That's it!