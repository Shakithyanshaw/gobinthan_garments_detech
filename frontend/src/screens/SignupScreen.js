import { Helmet } from 'react-helmet-async';
import { Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import Col from 'react-bootstrap/Col';
import { getError } from '../Util';
import CardHeader from '../components/CardHeadder';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : `/`;
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const smallContainerStyle = {
    maxWidth: '600px',
  };

  function validateName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    if (!validateName(name)) {
      toast.error('Name should only contain alphabets and spaces!');
      return;
    } else if (!validateEmail(email)) {
      toast.error('Email address is not valid!');
      return;
    } else if (password !== confirmPassword || password === '') {
      toast.error('Passwords do not match or empty');
      return;
    }
    try {
      const { data } = await Axios.post(`/api/users/signup`, {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || `/`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <CardHeader />
      <Container className="mt-5">
        <Container style={smallContainerStyle}>
          <Helmet>
            <title>Sign Up</title>
          </Helmet>
          <h1 style={{ fontSize: '2rem' }}>Sign Up</h1>
          <br />
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid" className="invalidmessage">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid" className="invalidmessage">
                Please provide a valid Email.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalidmessage"
                  >
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mb-3">
              <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </Form>
        </Container>
      </Container>
    </div>
  );
}
