let chai = require ("chai");
let chaiHttp = require("chai-http");
let server = require ("../index");

let should = chai.should();

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
                    response.body.length.should.be.eql(1);
                    done();
                })
        })
    })

    /**
     * Test the GET (by id) character route 
     */

    /**
     * Test the POST character route 
     */

    /**
     * Test the PUT character route 
     */

    /**
     * Test the DELETE character route 
     */

    
})

