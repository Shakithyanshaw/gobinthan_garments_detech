import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import { getError } from '../Util';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MeaasgeBox';
import CardHeader from '../components/CardHeadder';

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
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },
  {
    name: '3stars & up',
    rating: 3,
  },
  {
    name: '2stars & up',
    rating: 2,
  },
  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const size = sp.get('size') || 'all';
  const color = sp.get('color') || 'all';
  const fabric = sp.get('fabric') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products = [], pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&size=${size}&color=${color}&fabric=${fabric}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, query, rating, size, color, fabric]);

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [fabrics, setFabrics] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data: categories } = await axios.get(
          `/api/products/categories`
        );
        const { data: sizeData } = await axios.get(`/api/products/sizes`);
        const { data: colorData } = await axios.get(`/api/products/colors`);
        const { data: fabricData } = await axios.get(`/api/products/fabrics`);

        setCategories(categories);
        setSizes(sizeData);
        setColors(colorData);
        setFabrics(fabricData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchFilters();
  }, []);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterSize = filter.size || size;
    const filterColor = filter.color || color;
    const filterFabric = filter.fabric || fabric;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&size=${filterSize}&color=${filterColor}&fabric=${filterFabric}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <CardHeader />
      <Container className="mt-5">
        <div className="marginAll">
          <Helmet>
            <title>Search Products</title>
          </Helmet>

          {/* Category Filter at the Top */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-wrap gap-2 overflow-auto justify-center">
                <Button
                  variant="outline-secondary"
                  style={{
                    borderColor: category === 'all' ? '#801001' : '#801001',
                    color: category === 'all' ? 'white' : '#801001',
                    backgroundColor:
                      category === 'all' ? '#801001' : 'transparent',
                    minWidth: '100px', // Ensure buttons have a minimum width
                  }}
                  onClick={() => navigate(getFilterUrl({ category: 'all' }))}
                >
                  All
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c}
                    variant="outline-secondary"
                    style={{
                      borderColor: c === category ? '#801001' : '#801001',
                      color: c === category ? 'white' : '#801001',
                      backgroundColor:
                        c === category ? '#801001' : 'transparent',
                      minWidth: '100px', // Ensure buttons have a minimum width
                    }}
                    onClick={() => navigate(getFilterUrl({ category: c }))}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              xs={3}
              md={3}
              className="pe-2"
              style={{
                maxHeight: '140vh',
                overflowY: 'auto',
                borderRight: '1px solid #ddd',
              }}
            >
              {/* Size Filter */}
              <div className="searchCard mb-4">
                <h4 style={{ fontSize: '2rem' }}>Size</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className={'all' === size ? 'text-bold' : 'searchCard'}
                      to={getFilterUrl({ size: 'all' })}
                    >
                      <input
                        type="checkbox"
                        checked={'all' === size}
                        readOnly
                      />
                      All Sizes
                    </Link>
                  </li>
                  {sizes.map((s) => (
                    <li key={s}>
                      <Link
                        className={s === size ? 'text-bold' : 'searchCard'}
                        to={getFilterUrl({ size: s })}
                      >
                        <input type="checkbox" checked={s === size} readOnly />
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Filter */}
              <div className="searchCard mb-4">
                <h4 style={{ fontSize: '2rem' }}>Color</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className={'all' === color ? 'text-bold' : 'searchCard'}
                      to={getFilterUrl({ color: 'all' })}
                    >
                      <input
                        type="checkbox"
                        checked={'all' === color}
                        readOnly
                      />
                      All Colors
                    </Link>
                  </li>
                  {colors.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === color ? 'text-bold' : 'searchCard'}
                        to={getFilterUrl({ color: c })}
                      >
                        <input type="checkbox" checked={c === color} readOnly />
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fabric Filter */}
              <div className="searchCard mb-4">
                <h4 style={{ fontSize: '2rem' }}>Fabric</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className={'all' === fabric ? 'text-bold' : 'searchCard'}
                      to={getFilterUrl({ fabric: 'all' })}
                    >
                      <input
                        type="checkbox"
                        checked={'all' === fabric}
                        readOnly
                      />
                      All Fabrics
                    </Link>
                  </li>
                  {fabrics.map((f) => (
                    <li key={f}>
                      <Link
                        className={f === fabric ? 'text-bold' : 'searchCard'}
                        to={getFilterUrl({ fabric: f })}
                      >
                        <input
                          type="checkbox"
                          checked={f === fabric}
                          readOnly
                        />
                        {f}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating Filter */}
              <div className="searchCard mb-4">
                <h4 style={{ fontSize: '2rem' }}>Rating</h4>
                <ul className="list-unstyled">
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={
                          `${r.rating}` === `${rating}`
                            ? 'text-bold rating-link'
                            : 'searchCard rating-link'
                        }
                      >
                        <Rating caption={' & up'} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={getFilterUrl({ rating: 'all' })}
                      className={
                        rating === 'all'
                          ? 'text-bold rating-link'
                          : 'searchCard rating-link'
                      }
                    >
                      <Rating caption={' & up'} rating={0}></Rating>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col
              xs={9}
              md={9}
              style={{
                maxHeight: '140vh',
                overflowY: 'auto',
              }}
            >
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <>
                  <Row className="justify-content-between mb-3">
                    <Col md={6}>
                      <div>
                        {countProducts === 0 ? 'No' : countProducts} Results
                        {query !== 'all' && ' : ' + query}
                        {category !== 'all' && ' : ' + category}
                        {size !== 'all' && ' : Size ' + size}
                        {color !== 'all' && ' : Color ' + color}
                        {fabric !== 'all' && ' : Fabric ' + fabric}
                        {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                        {(query !== 'all' ||
                          category !== 'all' ||
                          rating !== 'all' ||
                          size !== 'all' ||
                          color !== 'all' ||
                          fabric !== 'all') && (
                          <Button
                            className="closebtn"
                            variant="light"
                            onClick={() => navigate('/search')}
                          >
                            <i className="fas fa-times-circle"></i>
                          </Button>
                        )}
                      </div>
                    </Col>
                    <Col md={6} className="text-end mt-2">
                      Sort by{' '}
                      <select
                        value={order}
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                      >
                        <option value="newest">Newest Arrivals</option>

                        <option value="toprated">Avg. Customer Reviews</option>
                      </select>
                    </Col>
                  </Row>

                  {products.length === 0 && (
                    <MessageBox>No Product Found</MessageBox>
                  )}

                  <Row>
                    {products.map((product) => (
                      <Col sm={6} lg={4} className="mb-3" key={product._id}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>

                  <div>
                    {[...Array(pages).keys()].map((x) => (
                      <Link
                        key={x + 1}
                        className="mx-1"
                        to={{
                          pathname: '/search',
                          search: getFilterUrl({ page: x + 1 }).substring(7),
                        }}
                      >
                        <Button
                          className={Number(page) === x + 1 ? 'text-bold' : ''}
                          variant="light"
                        >
                          {x + 1}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
