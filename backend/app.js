import express  from 'express';
import cors from 'cors';
import 'dotenv/config';
import { products } from './products.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/products', async(req, res) => {
  res.json(products);
});

app.get('/api/health', async (req,  res ) => {
  res.json({ message: "The application is running!!" });
})

app.listen(7000, () => {
  console.log("server running on localhost:7000")
});