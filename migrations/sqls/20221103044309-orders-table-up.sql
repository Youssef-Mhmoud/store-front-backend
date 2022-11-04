CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(80),
  user_id bigint REFERENCES users(id)
)