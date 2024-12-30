# Stripe Integration

## Prerequisites
- Node.js
- npm

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Backend Setup
```bash
cd backend
cp .env.example .env    # Copy and configure with your credentials
npm install
node server.js
```

3. Frontend Setup
```bash
# Open new terminal
cd frontend
cp .env.example .env    # Copy and configure with your credentials
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
STRIPE_SECRET_KEY=sk_test
STRIPE_PUBLISHABLE_KEY=pk_test
```

### Frontend (.env)
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Running the Application
- Backend runs on: http://localhost:3001
- Frontend runs on: http://localhost:3000
