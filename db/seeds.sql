USE meme_pieDB;

INSERT INTO memes (file_path)
VALUES ('memes/andrea.jpeg');
INSERT INTO memes (file_path)
VALUES ('memes/rathew.jpeg');
INSERT INTO memes (file_path)
VALUES ('memes/gayland.jpeg');

INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/andrea.jpeg', 'student');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/andrea.jpeg', 'columbine');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/andrea.jpeg', 'whamen');

INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/rathew.jpeg', 'student');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/rathew.jpeg', 'murican');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/rathew.jpeg', 'cyka');

INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/gayland.jpeg', 'student');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/gayland.jpeg', 'gaylandian');
INSERT INTO tagged (file_path, tag_id)
VALUES ('memes/gayland.jpeg', 'soy boi');
