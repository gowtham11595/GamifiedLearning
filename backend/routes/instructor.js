const express = require('express');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');
const router = express.Router();

router.post('/createTeam', function(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const team = new Team({
      teamName:req.body.teamName,
      teamDetails:req.body.teamDetails,
      courseId:req.body.courseId
  });

    team.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Team created"});
    }
  });

    //res.status(200).send(decoded);
  });
});

module.exports = router;
