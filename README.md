# Role-Based Access Control (RBAC) with NestJS

## Introduction

Role-Based Access Control (RBAC) is a crucial aspect of security and permission management in modern web applications. This repository serves as a comprehensive resource for understanding and implementing RBAC in NestJS.

## Features

- Role Management
- Permission Management (not implement yet)
- User Role Assignment
- API Endpoint Authorization
- Fine-Grained Access Control

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- NestJS CLI installed
- Mysql installed

### Installation

1. Clone the repository :

   ```bash
   git clone https://github.com/HtetAungKhant23/RBAC
   ```

2. Navigate to the project directory :

   ```bash
   cd RBAC
   ```

3. Install dependencies :

   ```bash
   pnpm install
   ```

4. Create .env :

   ```bash
   cp .env.example .env
   ```

5. Configure your database connection in .env:

   ```dotenv
   DATABASE_URL=your_database_url
   PORT=your_database_port
   JWT_ACCESS_TOKEN=your_jwt_access_token_key
   JWT_REFRESH_TOKEN=your_jwt_refresh_token_key
   ```

6. Migrate your database :

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

7. Start the NestJS application :

   ```bash
   pnpm start:dev
   ```

The application will be available at http://localhost:8800/docs.

#### Reference

[Medium Blog](https://medium.com/@dev.muhammet.ozen/role-based-access-control-in-nestjs-15c15090e47d)
[ by Muhammet Özen](https://medium.com/@dev.muhammet.ozen)

Special thanks to [ Muhammet Özen](https://medium.com/@dev.muhammet.ozen) for the insightful article that inspired this repository.
