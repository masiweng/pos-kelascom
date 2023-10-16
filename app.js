import * as userServices from './services/user.js';
import * as productServices from './services/product.js';
import * as sales from './services/sale.js';
import * as authServices from './services/auth.js';
import express from 'express';
import bodyParser from 'body-parser';

const host = "localhost";
const port = 8099;

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ 
  extended: true 
}));

var jsonParser = bodyParser.json({ type: 'application/*+json' })

app.post('/login', authServices.login);

app.get('/users', authServices.validateToken, userServices.getUsers);
app.post('/users', authServices.validateToken, userServices.createUser);
app.put('/users/:id', authServices.validateToken, userServices.updateUser);
app.delete('/users/:id', authServices.validateToken, userServices.deleteUser);

app.get('/products', authServices.validateToken, productServices.getProducts);
app.post('/products', authServices.validateToken, productServices.createProduct);
app.put('/products/:id', authServices.validateToken, productServices.updateProduct);
app.delete('/products/:id', authServices.validateToken, productServices.deleteProduct);

app.post('/sales', authServices.validateToken, sales.createSale);
app.get('/sales', sales.createSale);

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`)
})