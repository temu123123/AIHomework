-- Calculating total sales volume for March 2024
SELECT SUM(amount) AS total_sales
FROM orders
WHERE order_date LIKE '2024-03%';

-- Finding the customer who spent the most overall
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Calculating the average order value for the last three months
SELECT AVG(amount) AS avg_order_value
FROM orders
WHERE order_date >= '2023-12-01';