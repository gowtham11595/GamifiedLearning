const express = require('express');
const jwt = require('jsonwebtoken');
var multer = require('multer');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const path = require('path');

const Team = require('../models/Team');
const Course = require('../models/Course');
const Quest = require('../models/Quest');
const RegisteredCourses = require('../models/RegisteredCourses');
const TeamDiscussions = require('../models/TeamDiscussion');
const UploadQuest = require('../models/UploadQuest');

router.post('/registerCourse', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const registeredCourse = new RegisteredCourses({
      courseId: req.body.courseTitle,
      courseTitle: req.body.courseName,
      suid: decoded.emailid
    });

    registeredCourse.save((err,play)=>{
    if(err){
      console.log(err);
      res.json(err);
    } else{
        res.json({msg:"Course registered"});
    }
  });
  });
});


router.get('/download/:file(*)',(req, res) => {
  console.log("Came in");
  var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
  console.log(fileLocation);
  res.download(fileLocation, file);
});

router.get('/getTeamDiscussionBoard/:teamId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    TeamDiscussions.find({teamId:req.params.teamId}, function(err, data) {
      console.log(data)
       res.status(200).send(data);
     });
  });
});


router.get('/getTeamDetails/:courseTitle', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    Team.find({courseTitle:req.params.courseTitle}, function(err, teams) {
      console.log(teams);
      var teamId = "";
      var retTeamDetails;
        for(var i=0; i<teams.length; i++){

          console.log(teams[i]);
          var teamDetails = teams[i].teamDetails;

          for(var j=0; j<teamDetails.length; j++) {
            if(""+teamDetails[j].email===""+decoded.emailid){
              console.log("Found"+JSON.stringify(teams[i]));
                teamId = teams[i]._id;
                retTeamDetails = teams[i];
                break;
            }
          }
          if(teamId!==""){
            break;
          }
        }
       res.status(200).send(retTeamDetails);
     });
  });
});

router.get('/getResults/:courseTitle', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    UploadQuest.find({courseTitle:req.params.courseTitle}, function(err, teams) {
      console.log(teams);
      var teamId = "";
      var retTeamDetails;
        for(var i=0; i<teams.length; i++) {

          console.log(teams[i]);
          var teamDetails = teams[i].teamDetails;

          for(var j=0; j<teamDetails.length; j++) {
            if(""+teamDetails[j].email===""+decoded.emailid){
              console.log("Found"+JSON.stringify(teams[i]));
                teamId = teams[i]._id;
                retTeamDetails = teams[i];
                break;
            }
          }
          if(teamId!==""){
            break;
          }
        }
       res.status(200).send(retTeamDetails);
     });
  });
});


router.get('/getTeamDiscussionBoard/:courseTitle', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      var teamId = "";
          Team.find({courseTitle:req.params.courseTitle}, function(err, teams) {

              for(var i=0; i<teams.length; i++){
                var teamDetails = teams[i].teamDetails;
                for(var j=0; j<teamDetails.length; j++){

                  if(teamDetails[j].email===decoded.emailid){
                    console.log("Found");
                      teamId = teams[i]._id;
                      break;
                  }
                }
                if(teamId!==""){
                  break;
                }
              }
              console.log("teamId = "+teamId);
              TeamDiscussions.find({teamId:teamId},function(err,result){
                if(err){
                  res.status(500).send({"msg":"Some Internal Server error"});
                } else {
                  res.status(200).send(result);
                }
              });
          });
    });
});

router.post('/teamPostComment', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    var emailId = decoded.emailid;
    var commentedAt = Date.now;
    var courseId = req.body.courseTitle;
    Team.find({courseTitle:courseId}, function(err, teams) {
      console.log("\n\n\nTeams\n"+teams);
      console.log("looking for email = "+emailId);
      var teamId="";
        for(var i=0; i<teams.length; i++){
          var teamDetails = teams[i].teamDetails;
          for(var j=0; j<teamDetails.length; j++){
            if(teamDetails[j].email===emailId){
              console.log("Found");
                teamId = teams[i]._id;
                break;
            }
          }
          if(teamId!==""){
            break;
          }
        }
      console.log("Team ID = "+teamId+"\n\n\n");
      TeamDiscussions.find({},function(err,result){

        console.log(result);

        for(var i=0; i<result.length; i++){
          console.log(result[i].teamId+"---"+teamId+"----"+(result[i].teamId === teamId));
          if(""+result[i].teamId === ""+teamId) {
            console.log("Team data found in discussions\n");
            console.log(JSON.stringify(result[i]));
            result = result[i];
            console.log("took="+JSON.stringify(result));
            break;
          }
        }

        var temp;
        console.log(result.length);
        if(result.length>0){
          console.log("f");
        } else {
          console.log("s");
        }

          if(result.length==0) {
            console.log("()()()()Came to if part ()()()()");
            var data = [];
            var date = new Date();
            var commentData = {_id:0, decision:"Like", name:decoded.emailid, comment: req.body.comment, date: date, likes:0};
            console.log("comment = "+commentData);
            data.push(commentData);

            const teamDiscussions = new TeamDiscussions({
              teamId: teamId,
              courseTitle: req.body.courseTitle,
              data:data,
              createdBy:decoded.emailid
            });
            console.log(teamDiscussions);
            teamDiscussions.save((err,play)=>{
              if(err) {
                console.log(err);
                res.json(err);
              } else{
                  res.json({msg:"Comment Posted"});
              }
            });
          }

          else {
            console.log("()()()()Came to else part ()()()()");
            var data = result.data;
            var date = Date.now();
            var length = result.data.length;
            var commentData = {_id:length, decision:"Like",name:decoded.emailid, comment: req.body.comment, date: new Date(), likes:0};
            data.push(commentData);
            var teamDisc = {
              teamId: teamId,
              courseTitle: req.body.courseTitle,
              data:data,
              createdBy:decoded.emailid
          };

            console.log("\n\n\n\n"+JSON.stringify(teamDisc)+"\n\n\n\n");

            TeamDiscussions.update({_id : result._id}, {$push:{"data":commentData}}, function (err, result)
             {
                      if(err){
                        console.log(err);
                        return res.status(500).json({message:"Some issue while updating"});}
                      return  res.status(200).send(result);
             });
          }
         });
    });


  });
});

router.post('/teamPostCommentLike', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    TeamDiscussions.find({_id:req.body.id},function(err,result)
     {
              if(err){
                console.log(err);
                return res.status(500).json({message:"Some issue while updating"});
              }

              console.log(JSON.stringify(result[0].data[req.body.dataNumber]));
              var likeData = result[0].data[req.body.dataNumber];


              if(!likeData.likedBy){
                likeData.likedBy = [];
              }

              if(likeData.likedBy.indexOf(decoded.emailid)==-1) {
                likeData.likes = likeData.likes + 1;
                likeData.likedBy.push(decoded.emailid);
              }

              var newData = [];
              for(var i=0; i<result[0].data.length; i++){
                if(i==req.body.dataNumber){
                  newData.push(likeData);
                } else {
                  newData.push(result[0].data[i]);
                }
              }

              TeamDiscussions.update({_id : req.body.id}, {$set:{"data":newData}}, function (err, result)
               {
                        if(err){
                          console.log(err);
                          return res.status(500).json({message:"Some issue while updating"});}
                        return  res.status(200).send(result);
               });

              //return  res.status(200).send(result);
     });

  });
});



function getTeam(courseId, emailId){
  Team.find({courseTitle:courseId}, function(err, teams) {
    console.log("\n\n\nTeams\n"+teams);
    console.log("looking for email = "+emailId);
    var teamId="";
      for(var i=0; i<teams.length; i++){
        var teamDetails = teams[i].teamDetails;
        for(var j=0; j<teamDetails.length; j++){
          if(teamDetails[j].email===emailId){
            console.log("Found");
              teamId = teams[i]._id;
              return teamId;
          }
        }
      }
    });
}

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
router.post('/uploadQuest', t=upload.single('file',10), (req, res) => {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    Team.find({courseTitle:req.body.courseTitle}, function(err, teams) {
      console.log("\n\n\nTeams\n"+teams);
      var emailId = decoded.emailid;
      console.log("looking for email = "+emailId);
      var teamId="";
        for(var i=0; i<teams.length; i++){
          var teamDetails = teams[i].teamDetails;
          for(var j=0; j<teamDetails.length; j++){

            if(teamDetails[j].email===emailId){
                console.log("Found");
                teamId = teams[i]._id;
                break;
            }
          }
          if(teamId!==""){
            break;
          }
        }

      var emailId = decoded.emailid;
    //  var teamId = getTeam(req.body.courseTitle, emailId);
      console.log("teamId = "+teamId);
      const uploadQuest = new UploadQuest({
        comments: req.body.comments,
        courseTitle: req.body.courseTitle,
        questId: req.body.questId,
        teamId: teamId,
        fileName: gloTime.filename,
        accuracy: req.body.accuracy,
        perfection: req.body.perfection,
        creativity: req.body.creativity,
        percision: req.body.percision,
        instructorFeedback: null,
        peerFeedback:null,
        createdBy: emailId,
        createdDate: gloTime.time,
    });
    console.log("my request looks like=");
    console.log(req.body);
    console.log("Uploading quest\n");
    console.log(uploadQuest);
        uploadQuest.save((err, uploadedQuest)=>{
        if(err){
          return err;
        } else{
            res.json({msg:"Quest created"});
        }
      });
      //
      // console.log(JSON.stringify(req.body));
      // console.log(JSON.stringify(req.body.title));
      // console.log(JSON.stringify(req.body.description));
      // console.log("courseTitle"+JSON.stringify(req.body.courseTitle));
      // res.json({msg:"Quest Uploaded"});
      });
    });
  });



//Getting students registered courses
router.get('/getStudentRegisteredCourses', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    RegisteredCourses.find({suid: decoded.emailid}, function(err, courses) {
       res.status(200).send(courses);
     });
  });
});

//getting students unregistered courses
router.get('/getStudentCourses', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    RegisteredCourses.find({suid: decoded.emailid}, function(err, courses) {

      Course.find({}, function(err, allCourses) {
         //res.status(200).send(courses);
         console.log(JSON.stringify(courses));
         console.log("\n\n\n\n");
         console.log(JSON.stringify(allCourses));
         var unregisteredCourses = [];

         for(var i=0; i<allCourses.length; i++) {
           var isFound = false;
           for(var j=0; j<courses.length; j++) {
             if(""+courses[j].courseId === ""+allCourses[i]._id){
               isFound = true;
               break;
             }
           }
           var json = {"courseId":allCourses[i]._id,"courseTitle":allCourses[i].courseTitle};
           console.log(json);
           if(isFound === false) {
             unregisteredCourses.push(json);
           }
         }

         //console.log("Un registered Courses = "+unregisteredCourses);
         res.status(200).send(unregisteredCourses);
       });

       //res.status(200).send(courses);
     });
  });
});


router.get('/getStudentQuest/:questId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    var questId  = req.params.questId;
    Quest.find({_id:questId}, function(err, quest) {
      console.log(JSON.stringify(quest));
      res.status(200).send(quest);
    });

  });
});



router.get('/getMyCourses', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    RegisteredCourses.find({suid: decoded.emailid}, function(err, courses) {
      if(err){
        console.log(err);
        res.json(err);
      } else{
          res.status(200).send(courses);
      }

     });
  });
});

router.get('/getQuestFromCourse/:courseId', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

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


router.get('/getLeaderBoard/:courseTitle', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    var courseTitle = req.params.courseTitle;

    UploadQuest.find({courseTitle: courseTitle}, function(err, uploadedQuests) {
      if(err){
        console.log(err);
        res.json(err);
      } else {
          var table = [];
          for(var i=0; i<uploadedQuests.length; i++) {
            if(table.length == 0){
              var questArray = [];
              questArray.push(uploadedQuests[i]);
              table[uploadedQuests[i].questId] = questArray;
            } else {
              if(table[uploadedQuests[i].questId]){
                var questArray = table[uploadedQuests[i].questId];
                questArray.push(uploadedQuests[i]);
                table[uploadedQuests[i].questId] = questArray;
              } else {
                var questArray = [];
                questArray.push(uploadedQuests[i]);
                table[uploadedQuests[i].questId] = questArray;
              }
            }
          }

          for(var i=0; i<table.length; i++){
            var total = [];
            var team = [];
            var questArray = table[i];

            for(var j=0; j<questArray.length; j++){
                var teamId = questArray[j].teamId;
                if(!total[teamId]){
                  total[teamId] = questArray[j].givenPoints;
                } else if(total[teamId] < questArray[j].givenPoints){
                  total[teamId] = questArray[j].givenPoints;
                }
            }
            console.log(JSON.stringify(total));
          }

        res.status(200).send(courses);
      }
     });
  });
});

module.exports = router;
