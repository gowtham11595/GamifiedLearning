const express = require('express');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');
const Course = require('../models/Course');
const Quest = require('../models/Quest');
const Badge = require('../models/Badge');
const RegisteredCourses = require('../models/RegisteredCourses');
const User = require('../models/User');
const UploadQuest = require('../models/UploadQuest');
var multer = require('multer');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const path = require('path');

router.post('/createTeam', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    console.log("body="+JSON.stringify(req.body));
    console.log("decoded="+JSON.stringify(decoded));
    const team = new Team({
      teamName:req.body.teamName,
      teamDetails:req.body.teamDetails,
      courseTitle:req.body.courseTitle,
      createdBy:decoded.email
  });
  console.log("created team = "+team);
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
var gloTime = {};
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
      gloTime.time = time;
      console.log("time"+time);

      const separator = ";;gk;-;";
      const extension = `${path.extname(file.originalname)}`;
      gloTime.filename = file.originalname+separator+time+extension;
      const newFilename = file.originalname+separator+time+extension;
      console.log(req.body);
      console.log(req.body.submissionDate);

      cb(null, newFilename);
      return time;
    },
  });
const upload = multer({ storage });
let t;
router.post('/createQuest', t=upload.single('file',10), (req, res) => {
      /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
      */
    var offset = '-5.0';
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    var dateTime = new Date(nd.toLocaleString());

    var submissionDateG = new Date(req.body.submissionDate);
    submissionDateG.setHours(submissionDateG.getHours() - 6);
    console.log(submissionDateG);

      const quest = new Quest({
        title:req.body.title,
        description:req.body.description,
        submissionDate:submissionDateG,
        courseTitle:req.body.courseTitle,
        fileName: gloTime.filename,
        createdDate: gloTime.time,
        points: req.body.points,
        createdDate: dateTime
    });
    console.log("my request looks like=");
    console.log(req.body);
    console.log("-------------Creating quest with the following data----------");
    console.log(quest);
        quest.save((err,play)=>{
        if(err){
          return err;
        } else{
            res.json({msg:"Quest created"});
        }
      });

      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(req.body.title));
      console.log(JSON.stringify(req.body.description));
      console.log("courseTitle"+JSON.stringify(req.body.courseTitle));
      //res.json({msg:"Quest created"});
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

router.post('/createBadge', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    console.log(req.body);
    const badge = new Badge({
      name: req.body.name,
      courseTitle: req.body.courseTitle,
      avatar: req.body.avatar
  });

    badge.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Badge created"});
    }
  });
  });
});

router.get('/getCourseNames', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

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


router.get('/getQuestFromCourse/:courseId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student") {
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    var courseId  = req.params.courseId;
    Quest.find({courseTitle:courseId}, function(err, quests) {

      for(var i = 0; i<quests.length; i++) {
        console.log("fileName= "+quests[i].fileName);
        console.log(quests[i]);
        var filename = quests[i].fileName;
        if(filename && filename!==null) {
          //quests[i].fileName = filename.split(";;gk;-;")[0];
          quests[i].fileName = "F:\\gl\\backend\\uploads\\"+filename;
          quests[i].fName = filename.split(";;gk;-;")[0];
          }
      }
      console.log("Quests"+JSON.stringify(quests));
       res.status(200).send(quests);
     });
  });
});

router.get('/getTeamFromCourse/:courseId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    var courseId  = req.params.courseId;
    Team.find({courseTitle:courseId}, function(err, teams) {
       res.status(200).send(teams);
     });
  });
});

router.get('/getBadgeFromCourse/:courseId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope==="Student"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    var courseId  = req.params.courseId;
    Badge.find({courseTitle:courseId}, function(err, courses) {
       res.status(200).send(courses);
     });
  });
});

router.get('/getCourseUsers/:courseId', function(req, res) {
  console.log("Auth = "+req.headers['authorization']);
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }

      console.log("courseIds="+req.params.courseId);
  User.find({}, function(err, users) {
    console.log("courseId="+req.params.courseId);
    RegisteredCourses.find({courseId: req.params.courseId}, function(err, regUsers) {
      var resp = [];

      for(var i=0; i<regUsers.length;i++){
        for(var j=0; j<users.length;j++){
          console.log(regUsers[i].suid+"--"+users[j].email);
          if(""+regUsers[i].suid===""+users[j].email){
            var json = {"_id":regUsers[i]._id, "email":regUsers[i].suid, "name":users[j].name};
            resp.push(json);
            break;
          }
        }
      }
      console.log(JSON.stringify(resp));
      if(resp.length==0){
        var json = {"_id":"1", "email":"NoMail", "name":"No registered Students"};
        resp.push(json);
      }
      res.status(200).send(resp);
      });
   });
 });
});

router.post('/getStudentSubmission', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    console.log("Email = "+req.body.email+" quest="+req.body.quest);
    UploadQuest.find({createdBy:req.body.email, questId:req.body.quest}, function(err, courses) {
       res.status(200).send(courses);
     });
  });
});


router.post('/awardStudentSubmission', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }
    console.log("Email = "+req.body.email+" quest="+req.body.quest);
    UploadQuest.update({createdBy:req.body.email, questId:req.body.quest}, {$set:{"givenPoints":req.body.givenPoints}}, function(err, courses) {
       res.status(200).send(courses);
     });

  });
});

module.exports = router;
