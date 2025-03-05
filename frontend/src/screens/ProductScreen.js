import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Rating from '../components/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MeaasgeBox';
import { getError } from '../Util';
import { Store } from '../Store';
import CardHeader from '../components/CardHeadder';
import { Container } from 'react-bootstrap';
import { assets } from '../assets/assets';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 10;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity, selectedSize },
    });
    navigate('/cart');
  };

  const [selectedSize, setSelectedSize] = useState(null);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <CardHeader />
      <Container className="mt-5">
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              ></img>
            </Col>
            <Col md={5}>
              <ListGroup>
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {product.name}
                  </h1>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    color: '#801001',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  ID :- {product.code}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Fabric Detail :-</strong>
                  <p>{product.fabric}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Product Description :-</strong>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <Card style={{ marginTop: '20px' }}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>Size:</Col>
                        <Col md={10}>
                          <div className="d-flex flex-wrap">
                            {product.sizes.map((size) => (
                              <div
                                key={size.size}
                                className="p-3" // Padding inside the box
                                style={{
                                  border: '1px solid #ddd',
                                  borderRadius: '5px',
                                  margin: '5px',
                                  cursor: 'pointer',
                                  backgroundColor:
                                    selectedSize === size.size
                                      ? '#801001'
                                      : '#f8f9fa',
                                  color:
                                    selectedSize === size.size
                                      ? 'white'
                                      : 'black',
                                  fontSize: '16px', // Font size inside the box
                                  width: '30px', // Set fixed width for all boxes
                                  height: '30px', // Set fixed height for all boxes
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center', // Center text inside the box
                                  textAlign: 'center', // Ensure the text is centered properly
                                }}
                                onClick={() => setSelectedSize(size.size)}
                              >
                                {size.size}
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && selectedSize && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="who we are"
      >
        <div className="w-full max-w-none text-left">
          {/* Changed from text-center to text-left */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-customRed">
            Product More Descriptions
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed w-full">
            As Kobithan Garments (PVT) LTD we pride ourselves on our ability to
            craft high- quality products with efficiency and precision. We
            employ our advanced technology techniques to craft products that
            exceed international quality benchmarks, ensuring reliability and
            style for global markets.
          </p>
        </div>
      </section>

      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="export-grade-stitching"
      >
        {/* Heading */}
        <div className="w-full max-w-none text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-customRed">
            Fabric More Details
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              As Kobithan Garments (PVT) LTD we pride ourselves on our ability
              to craft high- quality products with efficiency and precision. We
              employ our advanced technology techniques to craft products that
              exceed international quality benchmarks, ensuring reliability and
              style for global markets.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <img
              src={assets.ROAD_MAP}
              alt="Export-Grade Stitching"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProductScreen;
