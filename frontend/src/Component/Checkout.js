// // src/components/Checkout.js

// src/components/Checkout.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const productData = {
    name: 'Stubborn Attachments',
    price: 20.00,
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            name: productData.name,
            price: productData.price,
            quantity: 1
          }],
          amount: productData.price
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px',
        gap: '20px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
        </div>
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            color: '#1a237e',
            margin: '0 0 8px 0'
          }}>
            {productData.name}
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#666',
            margin: 0 
          }}>
            ${productData.price.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '18px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.2s ease'
        }}
      >
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Checkout;
