const Character = require('../models/character');
const Literature = require('../models/literature');
const router = require("express").Router();

router.get("/character/", async (req, res, next) => {
    const searchFirst = req.body.firstName;
    const searchLast = req.body.lastName;
    
    Character.findOne({ firstName: searchFirst, lastName: searchLast })
    .populate("literature")
    .populate("children")
    .populate("parents")
    .exec((err, targetMember) => {
        if (err) return next(err);
        res.send(targetMember);
    });
});


/*

    firstName: String,
    lastName: String,
    dob: String,
    dod: String,
    literature: [{ type: Schema.Types.ObjectId, ref: "Literature" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    parents: [{ type: Schema.Types.ObjectId, ref: "Character" }]

*/

router.post("/character", async (req, res, next) => {
    let characterToBeAdded = new Character();

    characterToBeAdded.firstName = req.body.firstName;
    characterToBeAdded.lastName = req.body.lastName;
    characterToBeAdded.dob = req.body.dob;
    characterToBeAdded.dod = req.body.dod;

    characterToBeAdded.children = [];
    characterToBeAdded.parents = [];

    characterToBeAdded.save((err) => {
        if(err) throw err;
    });

    res.send(characterToBeAdded);
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