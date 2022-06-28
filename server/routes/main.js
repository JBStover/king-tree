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



//POST a new character model
router.post("/character", async (req, res, next) => {
    let characterToBeAdded = new Character();

    characterToBeAdded.firstName = req.body.firstName;
    characterToBeAdded.lastName = req.body.lastName;
    characterToBeAdded.firstAppearance = req.body.firstAppearance;
    characterToBeAdded.lastAppearance = req.body.lastAppearance;

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
    const updatedFirstAppearance = req.body.firstAppearance;
    const updatedLastAppearance = req.body.lastAppearance;

    Character.findOneAndUpdate(
        { _id: characterId },
        { firstName: updatedFirstName,
          lastName: updatedLastName,
          firstAppearance: updatedFirstAppearance,
          lastAppearance: updatedLastAppearance
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

//GET a literature model by title
router.get("/literature/:title", async (req, res, next) => {
    console.log(req.params)
    const searchTitle = req.params.title;
    
    
    Literature.findOne({ title: {"$regex": searchTitle, "$options": "i" } })
    .populate("characters")
    .exec((err, targetBook) => {
        if (err) return next(err);
        res.status(200).send(targetBook);
    });
});


//POST a new literature model
router.post("/literature", async (req, res, next) => {
    let literatureToBeAdded = new Literature();

    literatureToBeAdded.title = req.body.title;
    literatureToBeAdded.releaseDate = req.body.releaseDate;
    literatureToBeAdded.characters = [];

    literatureToBeAdded.save((err) => {
        if(err) throw err;
    });

    res.send(literatureToBeAdded);    
});

//PUT (edit) an existing literature model by id
router.put("/literature/:id", async (req, res, next) => {
    const literatureId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedReleaseDate = req.body.releaseDate;

    //TODO add an if statement to determine if the characters array is being modified

    Literature.findOneAndUpdate(
        { _id: literatureId },
        { title: updatedTitle,
          releaseDate: updatedReleaseDate  
        },
        (err, updatedLiterature) => {
            if (err) throw err;
            else res.send(updatedLiterature);
        });
});

//DELETE an existing literature model by id
router.delete("/literature/:id", async (req, res, next) => {
    const literatureId = req.params.id;

    Literature.findByIdAndRemove(literatureId, (err, deletedLit) => {
        if (err) throw err;
        res.send(`The book/novel with id ${deletedLit} has been deleted`)
    })
});

//POST an existing literature model (by id) to an existing character and vice versa
router.post("/combineBookAndChar/:literature/:character", async (req, res, next) => {
    const literatureId = req.params.literature;
    const characterId = req.params.character;

    const targetBook = await Literature.findById(literatureId).exec();
    const targetCharacter = await Character.findById(characterId).exec();

    targetBook.characters.push(targetCharacter);
    targetBook.save();
    targetCharacter.literature.push(targetBook);
    targetCharacter.save();

    res.send(targetBook);
});

// roland ID = 62b21d8acd7ece657dc99f2d



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