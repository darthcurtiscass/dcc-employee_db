-- SELECT e.id, e.first_name, e.last_name, r.title
-- FROM employee e
-- JOIN roles r ON e.role_id = r.id;

--Retrieves data for all employees.
SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.department_name, 
(SELECT em.first_name FROM employee em WHERE em.id = e.manager_id) manager_firstname,
(SELECT em.last_name FROM employee em WHERE em.id = e.manager_id) manager_lastname
-- e.manager_id
FROM employee e
JOIN roles r 
ON e.role_id = r.id
JOIN department d
ON d.id = r.department_id;

SELECT (SELECT id FROM roles WHERE roles.title = 'CEO') role_id,
(SELECT id FROM employee WHERE first_name = 'Dylan' AND last_name = 'Cassagnol') manager_id;



SELECT id FROM department WHERE department.department_name = 'Kitchen Staff'; department_id

SELECT (SELECT id FROM roles WHERE roles.title = 'Fry Cook') role_id,
(SELECT id FROM employee WHERE first_name = 'Dylan' AND last_name = 'Cassagnol') emp_id;


-- SELECT 'hello';
-- SELECT r.title, r.salary, d.department_name, d.id
-- FROM roles r
-- JOIN department d
-- ON r.department_id = d.id;
-- SELECT movies.movie_name AS movie, reviews.review
-- FROM reviews
-- LEFT JOIN movies
-- ON reviews.movie_id = movies.id
-- ORDER BY movies.movie_name;