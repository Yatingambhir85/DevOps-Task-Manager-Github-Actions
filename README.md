
## DevOps Task Manager Application

# Pre Requisites:
- Node.js (version20) should be installed
- Github should be installed
- Docker should be installed (if running using docker)


# To Run the file using Docker Compose 

Step 1: Build the file
- docker-compose --env-file ./backend/.env.docker --build

Step 2: To run the container
- docker-compose --env-file ./backend/.env.docker up -d

Step 3: On browser
- http://0.0.0.0:3000

# To Run it locally

- git clone <url>

- cd backend/

- node server.js

- In browser http://localhost:3000

# Added Github Actions workflows

- {inprogress}