INSERT INTO department (department_name)
VALUES  ("Kitchen Staff"),
        ("Engineering"),
        ("Annoyance"),
        ("Wabbit Hunting"),
        ("Management"),
        ("Public Relations"),
        ("Geology"),
        ("Scaring"),
        ("Mental Health");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Fry Cook", 35000, 1),
        ("Software Engineer", 85000, 2),
        ("Therapist", 100000, 9),
        ("Carrot Muncher", 25000000, 3),
        ("Hunter", 30000, 4),
        ("CEO", 200000, 5),
        ("Cashier", 25000, 1),
        ("Geologist", 85000, 7),
        ("Quacking", 15000000, 6),
        ("Head of Scares", 15000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Dylan", "Cassagnol", 2, 1),
        ("Victoria", "Phillips", 9, 2),
        ("Spongebob", "Squarepants", 1, 3),
        ("Squidward", "Tentacles", 7, 4),
        ("Eugene", "Krabs", 6, 5),
        ("Bugs", "Bunny", 4, 6),
        ("Daffy", "Duck", 9, 7),
        ("Ickis", "", 10, 8),
        ("Randy", "Marsh", 8, 9),
        ("Elmer", "Fudd", 5, 10);




