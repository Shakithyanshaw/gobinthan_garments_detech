import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MessageBox from '../components/MeaasgeBox';
import { Link, useNavigate } from 'react-router-dom';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Header1 from '../components/Header1';
import Container from 'react-bootstrap/Container';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is Unavaible');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Header1 />
      <Container className="mt-5">
        <div>
          <Helmet>
            <title>Shopping Card</title>
          </Helmet>
          <h1 style={{ fontSize: '2rem' }}>Shopping Cart</h1> <br />
          <Row>
            <Col md={9}>
              {cartItems.length === 0 ? (
                <MessageBox>
                  Dear valuable customer, Your Cart is empty.
                  <Link to="/products">Go Shopping</Link>
                </MessageBox>
              ) : (
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroupItem key={item._id}>
                      <Row className="align-items-center">
                        {/* Image and Name in the Same Line */}
                        <Col md={5} className="d-flex align-items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                            }}
                          />
                          <Link
                            className="cardname"
                            to={`/product/${item._id}`}
                          >
                            <strong style={{ color: '#801001' }}>
                              {item.name}
                            </strong>
                          </Link>
                        </Col>

                        {/* ID, Size, Quantity Controls, and Delete Button in the Same Line */}
                        <Col
                          md={7}
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2"
                        >
                          <strong style={{ color: '#801001' }}>
                            ID: {item.code}
                          </strong>
                          <strong style={{ color: '#801001' }}>
                            Size: {item.selectedSize}
                          </strong>

                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              style={{ color: '#801001' }}
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 10)
                              }
                              variant="light"
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              style={{ color: '#801001' }}
                              variant="light"
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 10)
                              }
                              disabled={item.quantity === item.countInStock}
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            style={{ color: '#801001' }}
                            onClick={() => removeItemHandler(item)}
                            variant="light"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>

            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3 className="text-center" style={{ color: '#801001' }}>
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={checkoutHandler}
                          disabled={cartItems.length === 0}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
