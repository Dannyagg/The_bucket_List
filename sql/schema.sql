CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email varchar(200) NOT NULL,
    password varchar NOT NULL
);

CREATE TABLE tasks (
    id serial PRIMARY KEY,
    is_complete boolean NOT NULL,
    task_content varchar(2000) NOT NULL,
    user_id integer REFERENCES users(id)
);