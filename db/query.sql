SELECT employee.role_id AS Employee_Role, role.title 
FROM role
JOIN employee
ON role.title = employee.role_id
ORDER BY employee.role_id;


-- SELECT movies.movie_name AS movie, reviews.review
-- FROM reviews
-- LEFT JOIN movies
-- ON reviews.movie_id = movies.id
-- ORDER BY movies.movie_name;