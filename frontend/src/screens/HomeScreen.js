import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Feature Products</h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <Link href={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link href={`/product/${product.slug}`}>
                <p> {product.name}</p>
              </Link>
              <p>
                {' '}
                <strong>Code:-{product.code}</strong>
              </p>
              <button>Add to card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
