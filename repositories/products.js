import dbPool from "../utilities/db.js";

const getDataProducts = () => {
  const query = "SELECT id_product, code, name, stock, price FROM products";

  return dbPool.query(query);
}

const creatDataProduct = (code, name, stock, price) => {
  const query = "INSERT INTO products (code, name, stock, price) VALUES (?,?,?,?)";
  const value = [code, name, stock, price];

  return dbPool.query(query, value);
}

const updateDataProduct = (id, code, name, stock, price) => {
  const query = "UPDATE products SET code = ? , name = ? , stock = ? , price = ? WHERE id_product = ?";
  const value = [name, code, stock, price, id];

  let result = dbPool.query(query, value);
  
  return result;
}

const deleteDataProduct = (id) => {
  const query = "DELETE FROM products WHERE id_product = ?";

  return dbPool.query(query, [id]);
}

export { getDataProducts, creatDataProduct, updateDataProduct, deleteDataProduct };