const Character = require('../models/character');
const Literature = require('../models/literature');
const router = require("express").Router();

// GET character by first and last name
router.get("/character/:firstName/:lastName", async (req, res, next) => {
    console.log(req.params)
    const searchFirst = req.params.firstName;
    const searchLast = req.params.lastName;
    
    Character.findOne({ firstName: searchFirst, lastName: searchLast })
    .populate("literature")
    .populate("children")
    .populate("parents")
    .exec((err, targetCharacter) => {
        if (err) return next(err);
        res.status(200).send(targetCharacter);
    });
});

// GET ALL characters in the database
router.get("/characters", async (req, res, next) => {
    Character.find({})
    .populate("literature")
    .populate("children")
    .populate("parents")
    .exec((err, targetCharacters) => {
        if (err) return next(err);
        res.status(200).send(targetCharacters);
    });
});

//GET single character by ID
router.get("/character/:id", async (req, res, next) => {
    const charID = req.params.id;

    Character.findOne({ _id: charID })
    .populate("literature")
    .populate("children")
    .populate("parents")
    .exec((err, targetCharacter) => {
        if (err) return next(err);
        res.status(200).send(targetCharacter);
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

//PUT character by ID
router.put("/character/:id", async (req, res, next) => {
    const characterId = req.params.id;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedDob = req.body.dob;
    const updatedDod = req.body.dod;

    Character.findOneAndUpdate(
        { _id: characterId },
        { firstName: updatedFirstName,
          lastName: updatedLastName,
          dob: updatedDob,
          dod: updatedDod
        },
        (err, updatedCharacter) => {
            if (err) throw err;
            else res.send(updatedCharacter);
        });
});

//DELETE a character by ID
router.delete("/character/:id", async (req, res, next) => {
    const characterId = req.params.id;    
    
    Character.findByIdAndRemove(characterId, (err, deletedChar) => {
        if (err) throw err;
        res.send(`The character with id ${characterId} has been deleted`)
    })
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