use habit_tracker;
drop table if exists habits;
drop table if exists users;
-- usersTest table
create table users
(
    id varchar(255) primary key,
    email varchar(127) null,
    first_name varchar(127) null,
    last_name  varchar(127) null,
    full_name varchar(127) null
);


-- habits table
create table habits
(
    name        varchar(255)         not null,
    user_id     varchar(255)         null,
    id          int                  auto_increment,
    frequency   varchar(64)          not null,
    time_of_day time                 not null,
    active      boolean default true not null,
    created_on  datetime             not null,
    constraint user_id_key
        foreign key (user_id) references users (id),
    constraint habit_key
        primary key (id)
);





