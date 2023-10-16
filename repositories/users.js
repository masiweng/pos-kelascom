import dbPool from "../utilities/db.js";

const getDataUsers = () => {
  const query = "SELECT id_user, level_id, name, email, is_active, created_at FROM users";

  return dbPool.query(query);
}

const creatDataUser = (level_id, name, email, password, is_active) => {
  const query = "INSERT INTO users (level_id, name, email, password, is_active) VALUES (?,?,?,?,?)";
  const value = [level_id, name, email, password, is_active];

  return dbPool.query(query, value);
}

const updateDataUser = (id, name, email, is_active) => {
  const query = "UPDATE users SET name = ? , email = ? , is_active = ? WHERE id_user = ?";
  const value = [name, email, is_active, id];

  let result = dbPool.query(query, value);
  
  return result;
}

const deleteDataUser = (id) => {
  const query = "DELETE FROM users WHERE id_user = ?";

  return dbPool.query(query, [id]);
}

const getUserByEmail = (email) => {
  const query = "SELECT id_user, name, email, password FROM users WHERE email = ?";

  return dbPool.query(query, [email]);
}

export { getDataUsers, creatDataUser, updateDataUser, deleteDataUser, getUserByEmail };