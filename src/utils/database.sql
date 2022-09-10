CREATE TABLE accounts (
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    chapter INTEGER(15) NOT NULL DEFAULT "0",
    stats LONGTEXT NOT NULL DEFAULT '{}',
    objectifs LONGTEXT NOT NULL DEFAULT '[]',
    objectifsProgress LONGTEXT NOT NULL DEFAULT '[]'
)