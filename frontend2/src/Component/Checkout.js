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



// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const Checkout = () => {
//   const [loading, setLoading] = useState(false);

//   // Sample product data - replace with your actual products
//   const sampleItems = [
//     {
//       name: 'Product 1',
//       description: 'Description for Product 1',
//       price: 29.99,
//       quantity: 1
//     },
//     {
//       name: 'Product 2',
//       description: 'Description for Product 2',
//       price: 39.99,
//       quantity: 1
//     }
//   ];

//   const handleCheckout = async () => {
//     try {
//       setLoading(true);
      
//       // Create checkout session on the server
//       const response = await fetch('http://localhost:3001/api/create-checkout-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: sampleItems,
//           amount: sampleItems.reduce((total, item) => total + item.price * item.quantity, 0)
//         }),
//       });

//       const { url } = await response.json();
      
//       // Redirect to Stripe Checkout
//       window.location.href = url;
//     } catch (error) {
//       console.error('Error:', error);
//       alert('There was an error processing your payment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate total amount
//   const totalAmount = sampleItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
//       {/* Product List */}
//       <div className="space-y-4 mb-6">
//         {sampleItems.map((item, index) => (
//           <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded">
//             <div>
//               <h3 className="font-semibold">{item.name}</h3>
//               <p className="text-sm text-gray-600">{item.description}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold">${item.price.toFixed(2)}</p>
//               <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Total */}
//       <div className="border-t pt-4 mb-6">
//         <div className="flex justify-between items-center">
//           <span className="font-semibold">Total:</span>
//           <span className="font-bold text-xl">${totalAmount.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       <button
//         onClick={handleCheckout}
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold
//                  hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
//       >
//         {loading ? 'Processing...' : 'Proceed to Payment'}
//       </button>
//     </div>
//   );
// };

// export default Checkout;