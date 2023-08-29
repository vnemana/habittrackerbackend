use habit_tracker;
drop table if exists habits;
drop table if exists users;
-- users table
create table users
(
    id         int auto_increment 
        primary key,
    email varchar(128) null,
    first_name varchar(128) null,
    last_name  varchar(128) null,
    full_name varchar(128) null
);


-- habits table
create table habits
(
    name        varchar(256)         not null,
    user_id     INT                  null,
    id          int auto_increment,
    frequency   int                  not null,
    time_of_day datetime             not null,
    active      boolean default true not null,
    created_on  datetime             not null,
    constraint user_id_key
        foreign key (user_id) references users (id),
    constraint habit_key
        primary key (id)
);





