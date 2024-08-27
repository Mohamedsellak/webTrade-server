const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();


// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users',require('./routes/userRoute'));
app.use('/api/wallets',require('./routes/walletRoute'));



// Start server
const PORT =  3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
