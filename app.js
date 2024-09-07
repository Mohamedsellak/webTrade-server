const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")


const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())

// app.use('/proves', express.static(path.join(__dirname, 'public/proves')));
app.use('/static', express.static(path.join(__dirname, 'public')));


// Connect to database
connectDB();

// admin routes
app.use('/api/admin/users',require('./routes/admin/userRoute'));
app.use('/api/admin/deposit',require('./routes/admin/depositRoute'));
app.use('/api/admin/withdraw',require('./routes/admin/withdrawRoute'));
app.use('/api/admin/trads',require('./routes/admin/tradeRoute'));


// user routes
app.use('/api/user/profile',require('./routes/user/userRoute'));
app.use('/api/user/deposit',require('./routes/user/depositRoute'));
app.use('/api/user/withdraw',require('./routes/user/withdrawRoute'));
app.use('/api/user/trads',require('./routes/user/tradeRoute'));


// global Routes
app.use('/api/auth', require('./routes/auth/authRoute'));
app.use('/api/wallets',require('./routes/walletRoute'));




// Start server
const PORT =   process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
