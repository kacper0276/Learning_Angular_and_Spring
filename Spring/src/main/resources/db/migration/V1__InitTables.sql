CREATE TABLE users(
    id serial primary key,
    login varchar not null,
    password varchar not null,
    email varchar not null,
    role varchar not null
);