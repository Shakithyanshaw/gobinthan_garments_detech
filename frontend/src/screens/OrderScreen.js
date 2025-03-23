import React, { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getError } from '../Util';
import MessageBox from '../components/MeaasgeBox';
import Container from 'react-bootstrap/Container';
import CardHeader from '../components/CardHeadder';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    fetchOrder();
  }, [orderId, userInfo, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <CardHeader />
      <Container className="mt-5">
        <div className="marginAll">
          <Helmet>
            <title>Order {orderId}</title>
          </Helmet>
          <h1 style={{ fontSize: '2rem' }}>Order ID - {orderId}</h1>
          <br />

          <Row>
            <Col>
              <Row>
                <Col md={6} className="d-flex">
                  <Card className="mb-3 mt-5 bg-light text-dark w-100 h-90">
                    <Card.Body>
                      <Card.Title style={{ color: '#801001' }}>
                        Shipping Details
                      </Card.Title>
                      <Card.Text>
                        <strong>Name:</strong> {order.shippingAddress.fullName}
                        <br />
                        <strong>Address:</strong>{' '}
                        {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                        <br />
                        <strong>WhatsApp:</strong>{' '}
                        {order.shippingAddress.whatsapp}
                        <br />
                        <strong>Email:</strong> {order.shippingAddress.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mb-3 bg-light text-dark">
                <Card.Body>
                  <Card.Title style={{ color: '#801001' }}>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col
                            md={5}
                            className="d-flex align-items-center gap-3"
                          >
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
                              to={`/product/${item.slug}`}
                            >
                              <strong style={{ color: '#801001' }}>
                                {item.name}
                              </strong>
                            </Link>
                          </Col>

                          <Col
                            md={7}
                            className="d-flex align-items-center justify-content-between flex-wrap gap-2"
                          >
                            <strong style={{ color: '#801001' }}>
                              ID: {item.code}
                            </strong>
                            {item.selectedSize && (
                              <strong style={{ color: '#801001' }}>
                                Size: {item.selectedSize}
                              </strong>
                            )}
                            <span>Qty: {item.quantity}</span>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
