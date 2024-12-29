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





// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const Success = () => {
//     const [searchParams] = useSearchParams();
//     const [paymentStatus, setPaymentStatus] = useState({
//         status: 'loading',
//         details: null
//     });

//     useEffect(() => {
//         const sessionId = searchParams.get('session_id');
        
//         if (sessionId) {
//             verifyPayment(sessionId);
//         }
//     }, [searchParams]);

//     const verifyPayment = async (sessionId) => {
//         try {
//             const response = await fetch(`/api/checkout-session/${sessionId}`);
//             const session = await response.json();

//             if (session.payment_status === 'paid') {
//                 setPaymentStatus({
//                     status: 'success',
//                     details: session
//                 });
//             } else {
//                 setPaymentStatus({
//                     status: 'failed',
//                     details: session
//                 });
//             }
//         } catch (error) {
//             setPaymentStatus({
//                 status: 'error',
//                 details: error.message
//             });
//         }
//     };

//     if (paymentStatus.status === 'loading') {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Verifying your payment...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (paymentStatus.status === 'error') {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50">
//                 <div className="text-center p-8 bg-white rounded-lg shadow-md">
//                     <div className="text-red-500 text-5xl mb-4">❌</div>
//                     <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
//                     <p className="text-gray-600">We couldn't verify your payment. Please contact support.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
//                 <div className="text-green-500 text-5xl mb-4">✅</div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
//                 <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
                
//                 {paymentStatus.details && (
//                     <div className="text-left bg-gray-50 p-4 rounded-md">
//                         <h2 className="font-semibold mb-2">Order Details:</h2>
//                         <div className="text-sm text-gray-600">
//                             <p>Amount: ${paymentStatus.details.amount_total / 100}</p>
//                             <p>Order ID: {paymentStatus.details.payment_intent}</p>
//                             <p>Email: {paymentStatus.details.customer_details?.email}</p>
//                         </div>
//                     </div>
//                 )}

//                 <div className="mt-8">
//                     <a 
//                         href="/"
//                         className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                         Return to Home
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Success;