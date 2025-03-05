import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import CardHeader from '../components/CardHeadder';
import { Container } from 'react-bootstrap';

export default function EnquiryMethodScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, enquiryMethod },
  } = state;

  const [enquiryMethodName, setEnquiryMethod] = useState(
    enquiryMethod || 'WhatsApp'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_ENQUIRY_METHOD', payload: enquiryMethodName });
    localStorage.setItem('enquiryMethod', enquiryMethodName);
    navigate('/placeorder');
  };

  const smallContainerStyle = {
    maxWidth: '600px',
  };

  return (
    <div>
      <CardHeader />
      <Container className="mt-5">
        <div className="marginAll">
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <div style={smallContainerStyle} className="container">
            <Helmet>
              <title>Enquiry Method</title>
            </Helmet>
            <br />
            <h1 style={{ fontSize: '2rem' }}>Enquiry Method</h1>
            <br />
            <Form onSubmit={submitHandler}>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  id="WhatsApp"
                  label="WhatsApp"
                  value="WhatsApp"
                  checked={enquiryMethodName === 'WhatsApp'}
                  onChange={(e) => setEnquiryMethod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  id="Email"
                  label="Email"
                  value="Email"
                  checked={enquiryMethodName === 'Email'}
                  onChange={(e) => setEnquiryMethod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Button type="submit">Continue</Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
