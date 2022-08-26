
create TABLE person(
    person_id SERIAL PRIMARY KEY NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    fullName TEXT,
    email TEXT,
    UNIQUE (login)
);

create TABLE album(
    album_id SERIAL PRIMARY KEY,
    album_logo TEXT,
    album_name TEXT NOT NULL,
    album_location TEXT,
    person_id INTEGER NOT NULL,
    date date,
     FOREIGN KEY (person_id) REFERENCES person (person_id)
);

create TABLE photo(
    photo_id SERIAL PRIMARY KEY,
    photo_logo TEXT,                    /*todo 380x380*/
    photo_name VARCHAR (255),
    photo_url TEXT,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES album (album_id)
);
