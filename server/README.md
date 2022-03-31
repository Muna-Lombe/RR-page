----SERVER-SIDE----

- WATCHING
  - request from frnt end won't be made with body due to cors
  
- Dependencies
    - comes with production and dev environments
    - need to define database path in .env file,
      otherwise won't work
    - make sure to follow the steps below to get the server:
      - # INSTALL DEPENDENCIES
        $ npm install
      - # CREATE ENVIRONMENT CREDENTIALS FILE YOUR PROJECT'S ROOT 
        DIRECTORY
        $ touch .env 
      - # In your .env file add your database path with username,  
        # password and db name if you are using postgres
        DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<db name>

