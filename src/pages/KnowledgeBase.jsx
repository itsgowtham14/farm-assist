import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

const KnowledgeBase = ({ navigateTo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="knowledgebase-container">
      <h2>Fertilizers & Pesticides</h2>
      <p>Explore government-approved products with their uses and prices to avoid being misled by shops.</p>
      <div className="knowledgebase-cards">
        {loading ? (
          <div>Loading products...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : products.length === 0 ? (
          <div>No products found.</div>
        ) : (
          products.map(product => (
            <div className={`card ${product.type}`} key={product._id}>
              <h3>{product.name}</h3>
              <p><strong>Type:</strong> {product.type}</p>
              {product.activeIngredients && <p><strong>Active Ingredients:</strong> {product.activeIngredients}</p>}
              {product.approval && <p><strong>Approval:</strong> {product.approval}</p>}
              <p><strong>Price (MRP):</strong> {product.priceMRP || 'N/A'}</p>
              {product.vendorInfo && Array.isArray(product.vendorInfo) && product.vendorInfo.length > 0 && (
                <p><strong>Vendors:</strong> {product.vendorInfo.map(v => `${v.name} (${v.location})`).join(', ')}</p>
              )}
            </div>
          ))
        )}
      </div>
      <p className="note">Prices are as per database. Verify with local dealers and check for subsidies to ensure fair pricing.</p>
    </section>
  );
};

export default KnowledgeBase;