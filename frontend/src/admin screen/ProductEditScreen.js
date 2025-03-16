import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getError } from '../Util';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MeaasgeBox';
import CardHeader from '../components/CardHeadder';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function ProductEditScreen() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setCode(data.code);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setRating(data.rating);
        setNumReviews(data.numReviews);
        setDescription(data.description);
        setFabric(data.fabric);
        setSizes(data.sizes || []);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleColorChange = (sizeIndex, colorIndex, field, value) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors[colorIndex][field] = value;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([
      ...sizes,
      {
        size: '',
        colors: [{ color: '', quantity: 0 }],
      },
    ]);
  };

  const handleRemoveSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleAddColor = (sizeIndex) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors.push({ color: '', quantity: 0 });
    setSizes(newSizes);
  };

  const handleRemoveColor = (sizeIndex, colorIndex) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors = newSizes[sizeIndex].colors.filter(
      (_, i) => i !== colorIndex
    );
    setSizes(newSizes);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          code,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
          fabric,
          sizes,
          rating,
          numReviews,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. Click Update to apply it!');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };

  const smallContainerStyle = {
    maxWidth: '900px',
  };

  return (
    <div>
      <CardHeader />
      <Container style={smallContainerStyle}>
        <Helmet>
          <title>Edit Product {productId}</title>
        </Helmet>
        <h3 style={{ fontSize: '2rem' }}>
          Edit Product <h6>( {productId} )</h6>
        </h3>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Form
            className="updateform"
            noValidate
            validated={validated}
            onSubmit={submitHandler}
          >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="additionalImageFile">
                  <Form.Label>Upload Additional Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => uploadFileHandler(e, true)}
                  />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="additionalImage">
                  <Form.Label>Additional Images</Form.Label>
                  {images && (
                    <ListGroup variant="flush">
                      {images.length === 0 && <MessageBox>No image</MessageBox>}
                      {images.map((x) => (
                        <ListGroup.Item className="imagelink" key={x}>
                          {x}
                          <Button
                            variant="light"
                            onClick={() => deleteFileHandler(x)}
                          >
                            <i className="fa fa-times-circle"></i>
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="fabric">
                  <Form.Label>Fabric</Form.Label>
                  <Form.Control
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="countInStock">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="sizes">
              <Form.Label>Sizes & Colors</Form.Label>
              {sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="mb-3 p-3 border">
                  <Row className="mb-2">
                    <Col md={8}>
                      <Form.Control
                        placeholder="Size (e.g., S, M, L)"
                        value={size.size}
                        onChange={(e) =>
                          handleSizeChange(sizeIndex, 'size', e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveSize(sizeIndex)}
                      >
                        Remove Size
                      </Button>
                    </Col>
                  </Row>

                  {size.colors.map((color, colorIndex) => (
                    <Row key={colorIndex} className="mb-2 align-items-center">
                      <Col md={5}>
                        <Form.Control
                          placeholder="Color name"
                          value={color.color}
                          onChange={(e) =>
                            handleColorChange(
                              sizeIndex,
                              colorIndex,
                              'color',
                              e.target.value
                            )
                          }
                          required
                        />
                      </Col>
                      <Col md={5}>
                        <Form.Control
                          type="number"
                          placeholder="Quantity"
                          value={color.quantity}
                          onChange={(e) =>
                            handleColorChange(
                              sizeIndex,
                              colorIndex,
                              'quantity',
                              e.target.value
                            )
                          }
                          required
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline-danger"
                          onClick={() =>
                            handleRemoveColor(sizeIndex, colorIndex)
                          }
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button
                    variant="outline-success"
                    className="mt-2"
                    onClick={() => handleAddColor(sizeIndex)}
                  >
                    Add Color
                  </Button>
                </div>
              ))}

              <Button
                variant="primary"
                onClick={handleAddSize}
                className="mt-2"
              >
                Add New Size
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <Button disabled={loadingUpdate} type="submit">
                Update
              </Button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </Form>
        )}
      </Container>
    </div>
  );
}
