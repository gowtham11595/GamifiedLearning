const express = require('express');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');
var multer = require('multer');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const path = require('path');

router.post('/createTeam', function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }

    const team = new Team({
      teamName:req.body.teamName,
      teamDetails:req.body.teamDetails,
      courseId:req.body.courseId,
      createdBy:decoded.email
  });

    team.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Team created"});
    }
  });
  });
});


// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      console.log("Came to store");
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      console.log("Store");
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
const upload = multer({ storage });
router.post('/createQuest', upload.single('file'), (req, res) => {
      /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
      */
      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(req.body.title));
      console.log(JSON.stringify(req.body.description));
      console.log(JSON.stringify(req.body.file));


      res.json({"status":"Success"});
    });

router.post('/createQuest1', function(req, res) {

  console.log("called me");
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body.title));
  console.log(JSON.stringify(req.body.description));
  console.log(JSON.stringify(req.body.file));
  // const Quest = new Team({
  //   teamName:req.body.teamName,
  //   teamDetails:req.body.teamDetails,
  //   courseId:req.body.courseId,
  //   createdBy:decoded.email
  // });

  // team.save((err,play)=>{
  // if(err){
  //   res.json(err);
  // } else{
  //     res.json({msg:"Team created"});
  // }
  // });

res.json(req.body);
});


router.get('/getAllTeams', function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    Team.find({}, function(err, teams) {
       res.status(200).send(teams);
     });
  });
});

router.get('/getTeam/:teamName', function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    var teamName  = req.params.teamName;
    Team.find({teamName:teamName}, function(err, teams) {
       res.status(200).send(teams);
     });
  });
});


module.exports = router;
