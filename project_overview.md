# Engineering Trial Week Overview

## Introduction

This trial week is designed to evaluate skills in database modeling, backend API development, frontend implementation, and deployment. Each day builds upon the previous one, culminating in a fully functional, scalable, and observable application.

## Project Theme: Simple Banking App

Over the next five days, we will build a simple banking application where users can:

- Log in to view their balance
- See a transaction history
- Transfer money in and out, ensuring they never withdraw more than their balance
- Experience real-world banking behavior where one to ten random transactions are generated upon login

## How This Process Works

- Each day has a defined focus, covering different aspects of the application
- Use of generative AI is encouraged, but it should complement engineering judgment and best practices
- At the end of each day, zip your artifacts and upload them to the designated Slack channel
- Submissions should be turned in by 9 PM ET each day and will be reviewed by 9 PM ET the following day
- You are not expected to take more than six hours per day on any given task

## Expectations for Generative AI Usage

You are encouraged to use ChatGPT, Copilot, or other AI-powered tools to assist in:

- Generating boilerplate code such as SQL schema, API endpoints, and UI components
- Debugging issues and optimizing performance
- Refactoring and improving readability

However, AI-generated code should not be copied without review. You are expected to:

- Review and validate AI-generated solutions
- Refactor and optimize where necessary
- Document your thought process in the provided readme files

## Daily Workflow and Submissions

Each day, you will complete a structured task and must submit your work via Slack. Follow these guidelines:

### Zip Your Artifacts 
At the end of each day, create a zip archive containing:

- Your code (backend, frontend, database scripts, etc.)
- Any documentation (readme files, architecture descriptions, API specs, etc.)
- Test results or screenshots if applicable

### Upload to Slack
To submit your work:

- Navigate to the designated Slack channel
- Create a message with the subject:
  - YourName - DayX Submission (e.g., JohnDoe - Day1 Submission)
- Attach your zip file
- Ensure the upload completes and is accessible

### Daily Review Process

- Your submissions will be reviewed based on functionality, architecture, and clarity
- If an artifact is incomplete, submit what you have. Progress and problem-solving are more important than perfection

## Trial Week Schedule

### Day 1: Database and Backend API Development

- Design the database schema using PostgreSQL or MSSQL
- Build a REST API with authentication, transaction handling, and balance retrieval
- Ensure transactional integrity and implement security best practices
- Deliverables: schema.sql, backend.zip, openapi.yaml, architecture.pdf, readme.md, security.md

### Day 2: Frontend Development (React or Svelte)

- Build a client-side application for balance display and transactions
- Implement authentication and error handling
- Deliverables: frontend.zip, screenshots/, readme.md

### Day 3: Server-Side Rendering with Turbo or HTMX

- Convert the frontend to a server-rendered version
- Ensure feature parity between client and server versions
- Deliverables: ssr-frontend.zip, readme.md

### Day 4: Deployment and Observability

- Containerize the application using Docker and Docker Compose
- Set up structured logging, monitoring, and tracing
- Provide a Grafana dashboard for performance and system metrics
- Deliverables: docker.zip, monitoring/, readme.md

### Day 5: Advanced Backend Features and Performance Optimization

- Optimize API queries and implement caching
- Add structured logging and background processing for transaction updates
- Implement database connection pooling for scalability
- Deliverables: backend-optimized.zip, performance.md, test-results/

## Final Notes

- Focus on functionality first, then optimizations
- Submit work daily. Incomplete work is better than no submission
- Use generative AI responsibly. It is a tool, not a replacement for engineering expertise

This trial week is an opportunity to demonstrate your ability to approach real-world engineering challenges.
