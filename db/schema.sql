/*DROP DATABASE IF EXISTS meme_pieDB;*/

CREATE DATABASE meme_pieDB;
USE meme_pieDB;

CREATE TABLE memes (
    file_path VARCHAR(75) not null default '',
    date_created TIMESTAMP(6)
);

CREATE TABLE tagged (
    file_path VARCHAR(75) not null default '',
    tag_id VARCHAR(50) not null
);

SELECT * FROM memes;


SELECT  memes.file_path, tagged.tag_id
FROM memes
INNER JOIN tagged ON memes.file_path=tagged.file_path
WHERE tag_id = "?"
