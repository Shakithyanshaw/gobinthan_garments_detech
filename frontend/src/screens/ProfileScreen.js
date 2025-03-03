import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../Store';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from '../Util';
import Header from '../components/Header1';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo ? userInfo.name : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  const smallContainerStyle = {
    maxWidth: '600px',
  };

  return (
    <div className="d-flex flex-column site-container">
      <Header />
      <div style={smallContainerStyle} className="container ">
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <br />
        <h1 style={{ fontSize: '2rem' }}>My Profile</h1> <br />
        <form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
