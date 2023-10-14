# Complete App Setup Guide

Welcome to the installation guide for setting up and running the complete app locally.
This guide will walk you through all the necessary steps to successfully set up the app on your local machine.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/): The JavaScript runtime used for building the app.
- [npm](https://www.npmjs.com/): A package manager for installing and managing app dependencies.
- [Git](https://git-scm.com/): A version control system for cloning the repository.
- [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database system.
- [Keycloak](https://www.keycloak.org/): An open-source identity and access management system that allows you to secure your applications and services with ease.

## Clone the Repository

1. Open your terminal or command prompt.
2. Clone the repository using the following command:

```bash
git clone git@github.com:humanitech-net/supply-trail.git
```

1.  **Change to the app's directory:**

    - Change your current working directory to the repository you just cloned:

      ```bash
      cd supply-trail
      ```

2.  **Install Dependencies**

    - Install the app's dependencies using npm: in the root directory

      ```bash
        npm install
      ```

3.  **Database Setup**

    - Install and set up PostgreSQL on your machine.
    - Create a PostgreSQL database and user for the app.
    - Make sure it is running on your local machine with the appropriate setup

4.  **Keycloak Setup**

    - Install and set up Keycloak on your machine.
    - Make sure it is running on your local machine with the appropriate setup
    - Create a necessary realm and clients such that:
      - a realm called "humanitech"
      - clients called "supply-trail-app" and "nest-application"
    - set up the necessary access settings for clients

5.  ## **Create .local.env File**

    - create .local.env file inside inside supply-trial/services/service-core directory
    - add those necessary environment variables
      DB_HOST=
      DB_PORT=
      DB_USERNAME=
      DB_PASSWORD=
      DB_DATABASE=

6.  **START THE APP**

    - To start backend parts of the app, run the below script inside:
      <supply-trail/services/service-core> directory

            ```bash
            npm run start:dev
            ```

    - To start frontend parts of the app, run the below script inside:
      <supply-trail/applications/webapp> directory

                ```bash
                npm run start
            ```

7.  **Access the App**
    - Open your web browser and navigate to [http://localhost:3000] to access the locally running app.
