var express = require('Express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
require('dotenv').config(); // process.env.DB_CONNECT

var mongoose = require('mongoose');
const Entry = require('./models/Entry')  //Person Model

;//  -------- Connect to database ---------------
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {console.log("DB Connected")} );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("We are Connected")
});

const path = require('path');

var port = process.env.PORT || 8080;

// for parsing application/json
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/')); // Serve Static files

var options = { 
    root: path.join(__dirname) 
}; 

// app.use('/add', function(req, res, next){ 
     
    
      
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

app.post('/api/mongodb', function(req, res){ 
    console.log(req.body);

   const post = new Entry({
       fullname : req.body.fullname,
       entries : req.body.entries,
       seller : req.body.seller
   });

   console.log(req.body.fullname);

//    fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//   });

   post.save()
   .then(data => {  res.json(data);  })
   .catch(err => { res.json({ message: err})});

}); 

app.get('/api/mongodb', function(req, res){ 

    Entry.find(function (err, mydata) {
        if (err) return console.error(err);
        console.log(mydata);
        res.json(mydata); 
      })

}); 


app.get('/api/download', function(req, res, next){ 

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

  
app.listen(port, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", port); 
});