CREATE TABLE order_products (
  quantity INT,
  order_id bigint REFERENCES orders(id),
  products_id bigint REFERENCES products(id)
)