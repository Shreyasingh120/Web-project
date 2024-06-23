const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Read products data from file
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', (req, res) => {
  res.render('products', { products });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
