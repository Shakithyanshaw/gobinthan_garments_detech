import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import { toast } from 'react-toastify';
import { getError } from '../Util';
import CardHeader from '../components/CardHeadder';
import { Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import WhatsAppInstructions from '../components/WhatsAppInstructions';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const [showInstructions, setShowInstructions] = React.useState(false);
  const [pdfFileName, setPdfFileName] = React.useState('');

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,

          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // Generate PDF
      const doc = new jsPDF();
      let yPos = 10;

      // Order Details
      doc.setFontSize(18);
      doc.text(`Order Summary - #${data.order._id}`, 10, yPos);
      yPos += 15;

      // Customer Info
      doc.setFontSize(12);
      doc.text(`Customer: ${cart.shippingAddress.fullName}`, 10, yPos);
      yPos += 8;
      doc.text(`WhatsApp: ${cart.shippingAddress.whatsapp}`, 10, yPos);
      yPos += 8;
      doc.text(
        `Address: ${cart.shippingAddress.address}, ${cart.shippingAddress.city}`,
        10,
        yPos
      );
      yPos += 15;

      // Items Header
      doc.setFontSize(14);
      doc.text('Order Items:', 10, yPos);
      yPos += 10;

      // Items List
      doc.setFontSize(10);
      cart.cartItems.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} (${item.code}) - Size: ${
            item.selectedSize || 'N/A'
          } x ${item.quantity}`,
          15,
          yPos
        );
        yPos += 7;
      });

      // Save PDF locally
      const fileName = `order_${data.order._id}.pdf`;
      doc.save(fileName);
      setPdfFileName(fileName);

      // Prepare WhatsApp message
      const shopNumber = +94770305824;
      const message =
        `New Order Received! 🎉\n\n` +
        `*Order ID:* ${data.order._id}\n` +
        `*Customer:* ${cart.shippingAddress.fullName}\n` +
        `*WhatsApp:* ${cart.shippingAddress.whatsapp}\n` +
        `Please check the attached PDF for full order details.`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${shopNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, '_blank');

      setShowInstructions(true);
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.enquiryMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      <WhatsAppInstructions
        show={showInstructions}
        onClose={() => setShowInstructions(false)}
        fileName={pdfFileName}
      />
      <div>
        <CardHeader />
        <Container className="mt-5">
          <div className="marginAll">
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Helmet>
              <title>Preview Order</title>
            </Helmet>
            <br />
            <h1 style={{ fontSize: '2rem' }}>My Order summary</h1>
            <br />

            <Row>
              <Col md={8}>
                <Row>
                  <Col md={6} className="d-flex">
                    <Card className="mb-3 mt-5 bg-light text-dark w-100 h-90">
                      <Card.Body>
                        <Card.Title style={{ color: '#801001' }}>
                          Shipping
                        </Card.Title>
                        <Card.Text>
                          <strong>Name:-</strong>{' '}
                          {cart.shippingAddress.fullName} <br />
                          <strong>Address:- </strong>
                          {cart.shippingAddress.address},{' '}
                          {cart.shippingAddress.city},{' '}
                          {cart.shippingAddress.postalCode},{' '}
                          {cart.shippingAddress.country}
                          <br />
                        </Card.Text>
                        <Card.Text>
                          <strong>Whatsapp Number:-</strong>{' '}
                          {cart.shippingAddress.whatsapp} <br />
                          <strong>Email Address:- </strong>{' '}
                          {cart.shippingAddress.email}
                          <br />
                        </Card.Text>
                        <Link className="custom-btn" to="/shipping">
                          Edit
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6} className="d-flex">
                    <Card className="mb-3 mt-5 bg-light text-dark w-100 h-90">
                      <Card.Body>
                        <Card.Title style={{ color: '#801001' }}>
                          Enquiry Method
                        </Card.Title>
                        <Card.Text className="mt-8">
                          <strong>Method:</strong> {cart.enquiryMethod}
                        </Card.Text>
                        <Link className="custom-btn mt-10" to="/payment">
                          Edit
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Col>
              <Card className="mb-3 bg-light text-dark">
                <Card.Body>
                  <Card.Title style={{ color: '#801001' }}>Items</Card.Title>

                  <ListGroup variant="flush">
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          {/* Image and Name */}
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

                          {/* ID, Size, Quantity Controls, and Delete Button */}
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

                            {/* Quantity Controls */}
                            <div className="d-flex align-items-center gap-2">
                              <span>{item.quantity}</span>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="d-flex justify-content-between mt-3">
                    <Link className="custom-btn" to="/cart">
                      Edit
                    </Link>
                    <ListGroup.Item className="mt-3">
                      <div className="d-grid">
                        <Button
                          type="button"
                          onClick={placeOrderHandler}
                          disabled={cart.cartItems.length === 0}
                          className="btn btn-primary"
                        >
                          Place Order
                        </Button>
                      </div>
                      {loading && <LoadingBox />}
                    </ListGroup.Item>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </Container>
      </div>
    </div>
  );
}
