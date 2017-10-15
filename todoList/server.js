var express = require('express');

var app = express();
var mongojs = require('mongojs');

var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var wellknown = require('nodemailer-wellknown');

app.use(express.static(__dirname +"/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
  console.log("I am indise the get");
   db.contactlist.find(function(err, docs){
     console.log(docs);
     res.json(docs);
   })
});

app.get('/sendMail',function(req, res){

  var transporter = nodemailer.createTransport({
      wellknown: 'Gmail',
      auth:{
        user: 'anki495@gmail.com',
        pass: 'Randyortons495'
      }

  });
  var mailOptions = {
    from: 'anki495@gmail.com>', // sender address
    to: 'anki495@gmail.com', // list of receivers
    subject: 'test', // Subject line
    text: 'Hello bro' //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
})


app.post('/contactlist',function(req,res){
  console.log(req.body);
  db.contactlist.insert(req.body,function(err, doc){
    res.json(doc);
  });
});



app.delete('/contactlist/:contact_id', function(req, res){
  var id = req.params.contact_id;
  console.log(id);
  db.contactlist.remove({"_id": mongojs.ObjectId(id)},function(err, doc){
    console.log(doc);
    res.json(doc);
  })
});



app.get('/contactlist/:id',function(req,res){
  var id = req.params.id;
  console.log("I am indise the edit");
  console.log(id);
   db.contactlist.findOne({"_id": mongojs.ObjectId(id)},function(err, doc){
     console.log(doc);
     res.json(doc);
   })
});


app.put('/contactlist/:_id', function(req, res){
  console.log(req);
  console.log("In put");
  var putid = req.params._id;
  console.log("Id is : "+putid);
  console.log("Body is : "+req.body.name);
  db.contactlist.findAndModify({
  query: {"_id": mongojs.ObjectId(putid)},
  update:{$set:{"name": req.body.name, "email":req.body.email, "number":req.body.number}},
  new : true},
function(err, doc){
  res.json(doc);
});

});



app.listen(3005);
console.log("listenning to port 3000");
