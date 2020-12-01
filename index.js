var express = require('Express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');


const path = require('path');
var PORT = 8080;
// for parsing application/json
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/')); // Serve Static files



// app.use('/add', function(req, res, next){ 
     
//     var options = { 
//         root: path.join(__dirname) 
//     }; 
      
//     var fileName = 'register.html'; 
//     res.sendFile(fileName, options, function (err) { 
//         if (err) { 
//             next(err); 
//         } else { 
//             console.log('Sent:', fileName); 
//             next(); 
//         } 
//     }); 

//     // res.render(fileName);
// }); 



// ------------- API Section-----------------------

app.post('/api/formdata', function(req, res, next){ 
    console.log(req.body);
    // Add to JSON file

     fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.push(req.body); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('data.json', json, 'utf8', function readFileCallback(err, data){}); // write it back 
    }});

    // res.sendStatus(200);
    // res.send("recieved your request!");
    res.send(req.body)
   
}); 


app.get('/api/download', function(req, res, next){ 

    var options = { 
        root: path.join(__dirname) 
    }; 
    res.setHeader('Content-Type', 'application/json');

    fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        json = JSON.stringify(obj); //convert it back to json
        res.end(json) 
    }});

}); 




// ERROR PAGE
app.get('*', function(req, res, next){ 
     
    var options = { 
        root: path.join(__dirname) 
    }; 
      
    var fileName = '404.html'; 

    // res.sendFile(fileName, options, function (err) { 
    //     if (err) { 
    //         next(err); 
    //     } else { 
    //         console.log('Sent:', fileName); 
    //         next(); 
    //     } 
    // }); 

    res.sendFile(fileName, options, function() {}); 

    // res.sendStatus(404)

}); 

  
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});