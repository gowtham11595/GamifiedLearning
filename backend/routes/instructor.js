const express = require('express');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');
const Course = require('../models/Course');
const Quest = require('../models/Quest');
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
      cb(null, './uploads/');
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
      //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      //var id = util.random_string(16) + Date.now() + path.extname(file.originalname);
      //console.log(id);
      //const dummy = `${uuidv4()}`;
      var time= new Date().getTime();

      console.log("time"+time);
      const separator = ";;gk;-;";
      const newFilename=file.originalname+separator+time;
      console.log(req.body);
      console.log(req.body.courseTitle);
      const quest = new Quest({
        title:req.body.title,
        description:req.body.description,
        submissionDate:req.body.submissionDate,
        courseTitle:req.body.courseTitle,
        createdDate:time
    });

    quest.save((err,play)=>{
    if(err){
      //return err;
    } else{
        //res.json({msg:"Quest created"});
        return 0;
    }
  });

      cb(null, newFilename);
    },
  });
const upload = multer({ storage });
router.post('/createQuest', upload.single('file',10), (req, res) => {
      /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
      */
      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(req.body.title));
      console.log(JSON.stringify(req.body.description));
      console.log("courseTitle"+JSON.stringify(req.body.courseTitle));
      res.json({msg:"Quest created"});
    });

  /*  router.get('/download', function(req, res){
    //var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
    console.log("location-"+__dirname);
    res.download(file); // Set disposition and send it.
  });
*/
  router.get('/download/:file(*)',(req, res) => {
    console.log("Came in");
    var file = req.params.file;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
});

router.post('/createCourse', function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    console.log(req.body);
    const course = new Course({
      courseTitle: req.body.courseTitle,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate
  });

    course.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Course created"});
    }
  });
  });
});

router.get('/getCourseNames', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }

    Course.find({}, function(err, courses) {
       res.status(200).send(courses);
     });
  });
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
