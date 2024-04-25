# Node.js App with PostgreSQL & Redis in Docker

This repository contains a Node.js application that uses PostgreSQL and Redis, and is Dockerized for easy deployment.

I've written a blog on how can you dockerize this Node.js app & run in docker. This reposirity contains the exampke codebase for this blog so check this blog for the better understanbding:

(link to be added) [Dockerizing Node.js REST API with Postgres and Redis]()


## Prerequisites

Before running the application, make sure you have Docker installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

Follow these steps to run the Node.js application with PostgreSQL and Redis in Docker:

1. Clone this repository:

   ```bash
   git clone https://github.com/tazbin/blog-website-backend-nodejs-REST-API nodejs-docker
   ```
2. Navigate to the repository:
    ```bash
   cd nodejs-docker
   ```
3. make a `.env` file following the format of `.env.example` file and set the values
4. build docker images & run containers
    ```bash
   docker-compose up --build
   ```
5. view running containers
    ```bash
   docker ps
   ```

#### You can stop the running containers anytime using this command
```bash
   docker-compose down 
   ```
   
### API endpoints:
- `GET localhost:3000`
- `GET localhost:3000/users`
- `POST localhost:3000/users`


