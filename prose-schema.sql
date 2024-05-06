CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  prompt TEXT NOT NULL,
  rating TEXT NOT NULL, 
  rewrite TEXT NOT NULL, 
  type TEXT NOT NULL, 
  adj TEXT NOT NULL, 
  FOREIGN KEY (username) REFERENCES users(username)
);
