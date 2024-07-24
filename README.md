 
# Events
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; justify-content: center; align-items: center;">
  <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer" style="display: block; text-align: center;">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45" style="display: block; margin: 0 auto;">
  </a>
  <a alt="NestJS logo" href="https://nestjs.com/" target="_blank" rel="noreferrer" style="display: block; text-align: center;">
    <img src="https://nestjs.com/img/logo.svg" width="45" style="display: block; margin: 0 auto;">
  </a>
  <a alt="GraphQL logo" href="https://graphql.org/" target="_blank" rel="noreferrer" style="display: block; text-align: center;">
    <img src="https://graphql.org/img/logo.svg" width="45" style="display: block; margin: 0 auto;">
  </a>
  <a alt="PostgreSQL logo" href="https://www.postgresql.org/" target="_blank" rel="noreferrer" style="display: block; text-align: center;">
    <img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="45" style="display: block; margin: 0 auto;">
  </a>
</div>


 

## Overview

This project is a monorepo managed with Nx that includes a backend built with NestJS and GraphQL, and a PostgreSQL database. The backend provides various functionalities including user management, authentication, and address management.

## Technologies Used

- **[Nx](https://nx.dev)**: Smart monorepos for fast CI
- **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient and scalable server-side applications
- **[GraphQL](https://graphql.org/)**: A query language for APIs and a runtime for executing those queries
- **[PostgreSQL](https://www.postgresql.org/)**: A powerful, open-source relational database system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (local or remote instance)
- Nx CLI (install globally using `npm install -g nx`)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the necessary environment variables, such as database connection details.

4. **Run migrations**

   Ensure the database is set up and then run the migrations to set up the schema.

   ```bash
   npx nx migrate
   ```

### Running the Project

1. **Start the development server**

   ```bash
   npx nx serve <project-name>
   ```

   Replace `<project-name>` with the appropriate project name defined in your Nx workspace.

2. **Access GraphQL Playground**

   Open `http://localhost:3000/graphql` in your browser to interact with the GraphQL API.

### Code Generation and Nx Plugins

Add Nx plugins to leverage their code generators and automated tasks.

```bash
# Add a plugin
npx nx add @nrwl/react

# Use code generator
npx nx generate @nrwl/react:app demo

# Run development server for the demo app
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and their generators. Use `npx nx list <plugin-name>` to see what generators are available for a specific plugin.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the documentation.

## Running Tasks

To execute tasks with Nx, use the following syntax:

```bash
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```bash
npx nx run-many -t <target1> <target2>
```

...or filter specific projects:

```bash
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

## Contributing

Feel free to submit issues or pull requests. Contributions are always welcome!
 

Feel free to adjust any specifics based on your project's details.
