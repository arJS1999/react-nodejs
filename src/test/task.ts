import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { server } from "../index";
chai.should();
chai.use(chaiHttp);

describe("GET Api", () => {
  /**
   * Test GET Route
   */
  describe("GET /category/getcategory", () => {
    it("It should GET All Category data", (done) => {
      const id=1
      chai
        .request(server)
        .get("/category/getcategory"+id)
        .end((err, response) => {
          expect(response).have.status(200);
          expect(response.body.result).to.be.a("array");
          expect(response.body.result).to.have.length(4);
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("category_name");

          done();
        });
    });
  });

  describe("GET /product/getproduct", () => {
    it("It should GET All Product data", (done) => {
      chai
        .request(server)
        .get("/product/getproduct")
        .end((err, response) => {
          expect(response).have.status(200);
          expect(response.body.result).to.be.a("array");
          expect(response.body.result).to.have.length(12);
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("product_name");
          expect(response.body.result[0]).to.have.property("product_price");
          expect(response.body.result[0]).to.have.property("product_image");
          done();
        });
    });
  });
});
