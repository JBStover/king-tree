let chai = require ("chai");
let chaiHttp = require("chai-http");
let server = require ("../index");

let should = chai.should();
let createdCharId = null;

chai.use(chaiHttp);

describe('Character Routes Test', () => {    

    /**
     * Test the GET character using first and last name 
     */
    describe("/GET /characters", () => {
        it("should GET all characters", (done) => {
            chai.request(server)
                .get("/characters")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    //response.body.length.should.be.eql(2); //Change this to match the size of the database
                    done();
                });
        });
    });

    /**
     * Test the GET (by id) character route 
     */

    describe("/GET /character/:id", () => {
        it("should GET a character by id", (done) => {
            const charId = '62b21bd3cb159acb844e75de';  //This is the id of the static test character
            chai.request(server)            
                .get("/character/" + charId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('firstName')
                    response.body.should.have.property('lastName')
                    response.body.should.have.property('firstAppearance')
                    response.body.should.have.property('lastAppearance')
                    response.body.should.have.property('literature')
                    response.body.should.have.property('children')
                    response.body.should.have.property('parents')
                    done();
                });
        });
    });

    /**
     * Test the POST character route 
     */

    describe("/POST /character", () => {
        it("should POST a new character to the database", (done) => {
            const newTestCharacter = {
                firstName: "mochaFirstName",
                lastName: "mochaLastName",
                firstAppearance: "mochaFirstAppearance",
                lastAppearance: "mochaLastAppearance"
            };            

            chai.request(server)
                .post("/character")
                .send(newTestCharacter)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('firstName').eql('mochaFirstName'); 
                    response.body.should.have.property('lastName').eql('mochaLastName');
                    response.body.should.have.property('firstAppearance').eql('mochaFirstAppearance');
                    response.body.should.have.property('lastAppearance').eql('mochaLastAppearance');
                    response.body.should.have.property('literature');
                    response.body.should.have.property('children');
                    response.body.should.have.property('parents');
                    createdCharId = response.body._id; //Pass created _id to createdCharId for use in DELETE test
                    console.log("Post Test character ID is " + createdCharId);
                done();
                });
        });
    });

    /**
     * Test the PUT character route 
     */
    describe("/PUT /character/:id", () => {
        it("should /PUT update (by id) all non-array values on an existing character", (done) => {
            console.log("Put Test Character Id is " + createdCharId);
            const updatedCharacter = {
                firstName: "changedMochaFirstName",
                lastName: "changedMochaLastName",
                firstAppearance: "changedMochaFirstAppearance",
                lastAppearance: "changedMochaLastAppearance"                 
            }
            chai.request(server)
                .put("/character/" + createdCharId)
                .send(updatedCharacter)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });


    /**
     * Test the DELETE character route  
     * 
     */

     describe("/DELETE /character/:id", () => {
        it("should DELETE an existing character by id", (done) => {
            console.log("Delete Test character ID is " + createdCharId)
            chai.request(server)
                .delete("/character/" + createdCharId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });

     /**
     * Test the DELETE character route  
     * 
     */

    

    

    
});

