require('dotenv').config();

const express = require('express');
const { connectToDatabase } = require('./config/db');
const app = express();
const ProductRouter = require('./router/ProductRouter');
const cors = require('cors')

const corsOption = {
    origin: 'http://localhost:5173'
}
connectToDatabase();

app.use(cors(corsOption));
app.use('/api/products', ProductRouter);

app.listen(8000, () => {
    console.log('server is listening on 8000')
})