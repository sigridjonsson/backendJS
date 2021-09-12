# Backend

This is the backend for the [editor app](https://github.com/sigridjonsson/frontendJS).
With this API it is possible to create and update documents saved in a MongoDB
database.
The app is made as part of the course [jsramverk](https://jsramverk.se) at BTH.

Get going
-----------------------------------
Install the essentials to get going.
```
npm install
```

Start the server.
```
npm start
```

Routes
-----------------------------------
- /documents (GET)
    - Gets all documents
- /documents (POST)
    - Creates a new document
- /documents/:id (PUT)
    - Updates document
