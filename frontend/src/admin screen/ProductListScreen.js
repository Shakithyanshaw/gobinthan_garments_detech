import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import { Store } from '../Store';
import { getError } from '../Util';
import CardHeader from '../components/CardHeadder';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MeaasgeBox';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    { loading, error, products, pages, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  };

  const getAvailableColors = (product) => {
    const colors = new Set();
    product.sizes.forEach((size) => {
      size.colors.forEach((color) => {
        if (color.quantity > 0) colors.add(color.color);
      });
    });
    return Array.from(colors).join(', ') || 'N/A';
  };

  const getAvailableSizes = (product) => {
    const sizes = new Set();
    product.sizes.forEach((size) => {
      if (size.colors.some((color) => color.quantity > 0)) {
        sizes.add(size.size);
      }
    });
    return Array.from(sizes).join(', ') || 'N/A';
  };

  return (
    <div>
      <CardHeader />
      <Container>
        <Row className="align-items-center mb-4">
          <Helmet>
            <title>Product Management</title>
          </Helmet>
          <Col>
            <h1 style={{ fontSize: '2rem' }}>Product Management</h1>
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              onClick={() => navigate('/admin/product/new')}
              className="rounded-pill px-4"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create Product
            </Button>
          </Col>
        </Row>

        {loadingDelete && <LoadingBox />}

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="table-responsive">
              <Table striped bordered hover className="align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th className="px-4">Product Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Stock</th>
                    <th>Colors</th>
                    <th>Sizes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="hover-highlight">
                      <td className="fw-semibold">{product.name}</td>
                      <td className="text-muted">{product.code}</td>
                      <td>
                        <Badge bg="info" className="text-uppercase">
                          {product.category}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg="warning" pill className="px-2">
                          {product.rating} ★
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          bg={product.countInStock > 0 ? 'success' : 'danger'}
                        >
                          {product.countInStock}
                        </Badge>
                      </td>
                      <td className="text-nowrap">
                        <small>{getAvailableColors(product)}</small>
                      </td>
                      <td className="text-nowrap">
                        <small>{getAvailableSizes(product)}</small>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 rounded-pill px-3"
                          onClick={() =>
                            navigate(`/admin/product/${product._id}`)
                          }
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => deleteHandler(product)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-center mt-4">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  className={`mx-1 btn ${
                    x + 1 === Number(page)
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  } rounded-pill`}
                  to={`/admin/products?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
