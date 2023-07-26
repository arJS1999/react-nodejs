import axios from "../Interceptor/axios";
import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { useNavigate, Link } from "react-router-dom";
import "../Cart/cart.css";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const navigate = useNavigate();

  const [allproduct, setdata] = useState([]);

  useEffect(() => {
    productdata();
  }, []);

  const productdata = async (page) => {
    await axios
      .get("/product/ordering")
      .then((res) => {
        console.log("data", res);

        setdata(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  let cardStyle = {
    width: "21.5vw",
    height: "20vw",
  };

  function addcart(data) {
    const data1 = {};
    console.log("last", data);
    data1.name = data.product_name;
    data1.price = data.product_price;
    data1.image = data.product_image;
    console.log("final", data1);
    axios.post("/cart/addcart", data1).then((res) => {
      console.log(res);
      navigate("/cart");
    });
  }
  return (
    <div>
      <Container>
        <br></br>
        <div className="row">
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={"/Images/1652090599063.jpg"}
                width="1500px"
                height="350px"
                alt="First slide"
              />
              <Carousel.Caption>
                {" "}
                <h3>Graphite Batminton</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={"/Images/1652091186506.jpg"}
                width="1500px"
                height="350px"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Racket Batminton</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={"/Images/sports2.jpg"}
                width="1500px"
                height="350px"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Tennis bat</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          {allproduct.map((e) => {
            return (
              <div className="col-md-3">
                <Card style={cardStyle}>
                  <div key={e.id}>
                    <p className="product">{e.product_name}</p>
                    <Link to={"/singleprod/" + e.id} className="nav-link">
                      <div className="text-center">
                        <img
                          src={"/Images/" + e.product_image}
                          width="200px"
                          height="150px"
                          alt=""
                        />
                      </div>
                    </Link>

                    <h3>Price:₹{e.product_price}</h3>
                    <button
                      className="btn btn-primary button3"
                      onClick={(event) => {
                        addcart(e);
                      }}
                    >
                      Add Cart
                    </button>
                  </div>
                </Card>
                <br />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home;
