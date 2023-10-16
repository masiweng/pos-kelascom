import dbPool from "../utilities/db.js";

const creatSales = (product_id, qty, price, total) => {
  const query = "INSERT INTO sales (product_id, qty, price, total) VALUES ?";
  const values = [[product_id, qty, price, total]];

  return dbPool.query(query, [values]);
}
export { creatSales };