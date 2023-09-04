use habit_tracker;
drop table if exists habits;
drop table if exists usersTest;
-- usersTest table
create table usersTest
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
    user_id     varchar(255)                  null,
    id          int auto_increment,
    frequency   int                  not null,
    time_of_day datetime             not null,
    active      boolean default true not null,
    created_on  datetime             not null,
    constraint user_id_key
        foreign key (user_id) references usersTest (id),
    constraint habit_key
        primary key (id)
);





