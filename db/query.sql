-- SELECT e.id, e.first_name, e.last_name, r.title
-- FROM employee e
-- JOIN roles r ON e.role_id = r.id;

SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.department_name, e.manager_id
FROM employee e
JOIN roles r 
ON e.role_id = r.id
JOIN department d
ON d.id = r.department_id;

SELECT r.title, r.salary, d.department_name, d.id
FROM roles r
JOIN department d
ON r.department_id = d.id;
-- SELECT movies.movie_name AS movie, reviews.review
-- FROM reviews
-- LEFT JOIN movies
-- ON reviews.movie_id = movies.id
-- ORDER BY movies.movie_name;