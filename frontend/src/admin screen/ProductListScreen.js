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
    <div className="marginAll">
      <CardHeader />
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => navigate('/admin/product/new')}
          >
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
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>NAME</th>
                <th>CODE</th>
                <th>CATEGORY</th>
                <th>RATING</th>
                <th>STOCK</th>
                <th>COLORS</th>
                <th>SIZES</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.code}</td>
                  <td>{product.category}</td>
                  <td>
                    <Badge bg="warning" text="dark">
                      {product.rating} ★
                    </Badge>
                  </td>
                  <td>{product.countInStock}</td>
                  <td>{getAvailableColors(product)}</td>
                  <td>{getAvailableSizes(product)}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                className={x + 1 === Number(page) ? 'btn-active' : 'btn'}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
