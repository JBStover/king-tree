const Character = require('../models/character');


const router = require("express").Router();

router.get("/familymember", async (req, res, next) => {
    const searchFirst = req.body.firstName;
    const searchLast = req.body.lastName;
    const searchDate = req.body.dob;

    Familymember.findOne({ firstName: searchFirst, lastName: searchLast, dob: searchDate })
    .populate("children")
    .populate("parents")
    .exec((err, targetMember) => {
        if (err) return next(err);
        res.send(targetMember);
    });
});

router.post("/familymember/", async (req, res, next) => {
    let memberToBeAdded = new Familymember();

    memberToBeAdded.firstName = req.body.firstName;
    memberToBeAdded.lastName = req.body.lastName;
    memberToBeAdded.dob = req.body.dob;
    memberToBeAdded.dod = req.body.dod;
    memberToBeAdded.parents = [];
    memberToBeAdded.children = [];

    memberToBeAdded.save((err) => {
        if(err) throw err;
    });

    res.send(memberToBeAdded);
});

router.put("", async (req, res, next) => {

});

router.delete("", async (req, res, next) => {

});

//Login with any family name 
router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;    

    User.findOne({ username: username })
    .exec((err, user) => {
        if (err) return next(err);
        // if user is found, check if their password matches the password
        if (user && user.password == password) {           
            res.send(user);
        } else if (user && user.password !== password) {
            res.send(401, 'Wrong password.')
        } else if (!user) {
            res.send(401, 'No user found.')
        }
    })
});

module.exports = router;