import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
    const [searchParams] = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState({
        status: 'loading',
        details: null
    });

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            verifyPayment(sessionId);
        }
    }, [searchParams]);

    const verifyPayment = async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/checkout-session/${sessionId}`);
            const session = await response.json();
            setPaymentStatus({
                status: 'success',
                details: session
            });
        } catch (error) {
            setPaymentStatus({
                status: 'error',
                details: error.message
            });
        }
    };

    if (paymentStatus.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (paymentStatus.status === 'error') {
        return <div>Error processing payment. Please try again.</div>;
    }

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '500px', 
            margin: '40px auto', 
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{ color: '#28a745', marginBottom: '20px' }}>
                Payment Successful! ✅
            </h1>
            <p style={{ marginBottom: '20px' }}>
                Thank you for your purchase
            </p>
            
            {paymentStatus.details && (
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '15px', 
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ marginBottom: '10px' }}>Order Details:</h2>
                    <p>Amount: ${paymentStatus.details.amount_total / 100}</p>
                    <p>Email: {paymentStatus.details.customer_details?.email}</p>
                </div>
            )}

            <a 
                href="/"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                }}
            >
                Return to Home
            </a>
        </div>
    );
};

export default Success;