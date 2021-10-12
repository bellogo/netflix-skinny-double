import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";

chai.should();

chai.use(chaiHttp);

describe("Should welcome user to netflix skinny double", () => {
  it("it should get the welcome page", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

export default describe;
