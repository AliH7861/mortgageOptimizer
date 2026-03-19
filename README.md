# Mortgage Optimizer

An AI-assisted mortgage decision support platform that helps homebuyers and homeowners evaluate approval odds, compare rate directions, and explore renewal strategies with more confidence.

## Overview / Purpose

Mortgage decisions are high-stakes, but most people still have to piece together approval rules, rate tradeoffs, and repayment strategy from scattered calculators and generic advice. This project was built to make that process easier to understand, with a particular focus on the Ontario market where mortgage renewals and rate changes can create major financial pressure.

Mortgage Optimizer is designed for:

- First-time buyers who want a fast, structured approval-style check before speaking with a lender
- Returning homeowners comparing renewal or refinancing strategies
- Recruiters and technical reviewers looking at a practical full-stack AI project that combines frontend, backend, and machine learning services

The project matters because it turns complex financial inputs into a more understandable recommendation flow. Instead of giving users raw numbers only, it combines prediction, user preferences, and recommendation logic into a single experience.

## Features

- Mortgage approval prediction with approval probability
- Fixed vs. variable recommendation for approved applicants
- Renewal strategy recommendations for returning homeowners
- Preference-aware inputs for stability, flexibility, payoff speed, and equity growth
- Full-stack architecture with a React frontend, Spring Boot API layer, and FastAPI ML service
- Separate flows for new buyers and returning buyers

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router
- Backend API: Spring Boot 3, WebClient, Maven
- ML Service: FastAPI, Python
- Model Assets: Serialized approval and strategy pipelines (`approval_pipeline.pkl`, `strategy_pipeline.pkl`)
- Model Development: Jupyter Notebook workflow for experimentation and validation before deployment
- Testing: Pytest for the ML service
- Languages: JavaScript, Java, Python

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm
- Python 3.11+
- Java 17+
- Maven, or use the included Maven wrapper

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mortgageOptimizer
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install ML service dependencies

```bash
cd ml_service
pip install -r requirements.txt
cd ..
```

### 4. Run the FastAPI ML service

From the project root:

```bash
uvicorn ml_service.app:app --reload --host 0.0.0.0 --port 8001
```

### 5. Run the Spring Boot backend

In a new terminal:

```bash
cd backend/mortgageoptibackend/mortgageoptibackend
./mvnw spring-boot:run
```

On Windows:

```powershell
cd backend\mortgageoptibackend\mortgageoptibackend
mvnw.cmd spring-boot:run
```

### 6. Run the frontend

In a third terminal from the project root:

```bash
npm run dev
```

### Local service flow

- Frontend: `http://localhost:5173`
- Spring Boot backend: `http://localhost:8080`
- FastAPI ML service: `http://localhost:8001`

The frontend sends requests to the Spring Boot backend, and the backend forwards inference requests to the FastAPI service.

### Environment Variables

No environment variables are required for the current local setup.

## Usage

### New buyers

1. Start all three services.
2. Open the frontend in your browser.
3. Choose the new buyer flow.
4. Enter your income, debt, employment, and property details.
5. Set your mortgage preferences.
6. Submit the form to view approval likelihood and mortgage direction guidance.

### Returning buyers

1. Open the returning buyer flow.
2. Enter your current mortgage and financial details.
3. Adjust your repayment and risk preferences.
4. Submit the form to receive a renewal or repayment strategy recommendation.

## Screenshots / Demo

Add screenshots or a short demo video here to show:

- Landing page / dashboard
- New buyer workflow
- Returning buyer workflow
- Final recommendation cards and prediction output

For the strongest README, include at least one full UI screenshot and one result-state screenshot.

## Project Structure

```text
mortgageOptimizer/
|-- src/                                  # React frontend
|   |-- components/                       # Forms, UI pieces, result components
|   |-- pages/                            # Route-level pages
|   |-- assets/                           # Static images and media
|   |-- App.jsx
|   `-- main.jsx
|-- public/                               # Public static assets
|-- ml_service/                           # FastAPI service and ML pipelines
|   |-- app.py
|   |-- approval.py
|   |-- strategy.py
|   |-- approval_pipeline.pkl
|   |-- strategy_pipeline.pkl
|   `-- requirements.txt
|-- backend/
|   `-- mortgageoptibackend/
|       `-- mortgageoptibackend/          # Spring Boot backend
|-- package.json
`-- README.md
```

## Challenges & Learnings

- Designing a clean interaction between React, Spring Boot, and FastAPI without overcomplicating the request flow
- Translating mortgage-related user input into a format that both the backend and ML pipelines could consume consistently
- Balancing predictive output with recommendation logic so the system feels useful rather than opaque
- Moving beyond notebook-only ML work and integrating serialized models into a usable application

This project reinforced the importance of API contracts, input validation, and clear user-facing explanations when machine learning is involved in financial decision support.

## FAQ

**What information does the app ask for?**

The workflows use mortgage-related financial inputs such as income, debt, housing costs, employment history, property details, and user preferences.

**Does the project only support Ontario scenarios?**

The recommendation framing is most aligned to Ontario use cases. Other regions may require different lending assumptions and policy rules.

**Do I need to run all three services locally?**

Yes. The frontend, Spring Boot backend, and FastAPI ML service are all part of the local development flow.

## Contributing

Contributions are welcome. If you want to improve the project:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear commits.
4. Open a pull request with a short summary of what changed and why.

## Future Improvements

- Add authentication and saved mortgage scenarios
- Improve validation and error handling across every form flow
- Add stronger explainability around model decisions
- Expand support for more lending scenarios and regional assumptions
- Deploy the full stack as a live hosted application
- Add automated frontend and backend tests

## Contributors

- Ali Huq

## Contact

For questions, feedback, or collaboration, open an issue or reach out through the repository profile.

## License

This project is licensed under the [MIT License](LICENSE).
