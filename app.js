const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())


// Connect to database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/wallets',require('./routes/walletRoute'));
app.use('/api',require('./routes/userRoute'));
app.use('/api',require('./routes/depositRoute'));
app.use('/api',require('./routes/withdrawRoute'));



// Start server
const PORT =   process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
