import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 10;
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

  return (
    <Card className="rounded-5 overflow-hidden shadow-sm">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
          alt={product.name}
          style={{
            width: '100%', // Set the width to 100% of the parent container (or use a fixed value like '200px')
            height: '400px', // Set a fixed height for the image
            objectFit: 'cover', // Ensure the image covers the area without distortion
          }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>ID :- {product.code}</Card.Text>
        {product.countInStock === 0 ? (
          <Button
            variant="light"
            disabled
            style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              opacity: 1,
              border: 'none',
            }}
          >
            Un-Available
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
