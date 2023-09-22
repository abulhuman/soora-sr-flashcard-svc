# Flashcard CRUD Microservice for Soora Spaced Repetition Test

This repository serves the Flashcard CRUD microservice for the Soora Spaced Repetition Test.

## Instructions

### 1. Clone the repository

```bash
git clone https://github.com/abulhuman/soora-sr-flashcard-svc.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variables

```bash
cp .env.example .env
```

Then, open the `.env` file and set the environment variables.

```bash
# .env
DATABASE_URL= # Your MongoDB connection string (separate db for this microservice)
```


### 4. Run the service

```bash
npm run dev
```

### 4. Start the Gateway Service

Go to the [Gateway Service](https://github.com/abulhuman/soora-sr-api-gateway.git) and follow the instructions there to start the gateway service.