# **Mortgage Optimizer**

## Description
Mortgage Optimizer is a full-stack web application designed specifically for the Ontario population, where thousands of households are facing mortgage renewals amid sudden interest rate jumps. Built with FastAPI, Spring Boot, React, and Jupyter Notebooks, the system helps homeowners navigate these challenging decisions by combining AI predictions with clear rule-based reasoning. Users enter their mortgage and financial details, and the application provides approval outcomes, fixed vs. variable rate recommendations, and tailored strategies such as extending amortization, making lump-sum payments, or downsizing—each backed by transparent explanations and probabilities. The AI models are developed and tested in Jupyter, deployed via FastAPI microservices, orchestrated by Spring Boot, and presented through a modern React dashboard. By targeting Ontario’s urgent mortgage renewal crisis, this project demonstrates how technology can deliver practical, reliable, and personalized financial guidance when families need it most.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)
- [Contact](#contact)

## Features
- **Approval Prediction**  
    Instantly evaluates mortgage approval with Pass/Fail outcome, probability, and reasons (e.g., credit score, debt ratios, affordability).

- **Rate Recommendation**  
    AI-powered guidance on whether to choose a fixed or variable rate, backed by transparent reasoning.

- **Strategy Optimization**  
    Personalized strategies such as extending amortization, making lump-sum payments, downsizing, or staying baseline—ranked by feasibility and user preferences.


## Getting Started
### Dependencies
* **Python 3.8+** (for FastAPI + ML pipelines)
* **pip** (Python package manager for installing requirements)
* **Java 17+** (for Spring Boot backend)
* **Maven** (to build and run Spring Boot)
* **Node.js 16+** (for React frontend)
* **npm** or **yarn** (JavaScript package manager for frontend dependencies)
* **Visual Studio Code / IntelliJ IDEA** (recommended IDEs for development)
* **Jupyter Notebook** (for training, testing, and experimenting with ML models)

### Installing
1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

2. Install required packages:

   ```bash
   pip install -r requirements.txt

### Executing Program
1. Terminal 01: FastAPI Setup

   ```bash
   uvicorn ml_service:app --reload

2. Terminal 02: Java Setup

   ```bash
   mvn spring-boot:run
   
3. Terminal 02: React Setup

   ```bash
   npm install
   npm run dev

   

## Usage

1. Sign up and create your own account.

2. Log in with your username and password.

3. Workflow 1 – **Approval Check**  
   - Enter your personal and mortgage details.  
   - Click **Submit**.  
   - Instantly see whether you are approved or not, along with probability and reasons.  

4. Workflow 2 – **Strategy Recommendation**  
   - Enter your personal and mortgage details.  
   - Click **Submit**.  
   - Instantly get the best strategy (Extend, Lump Sum, Downsize, Stay Baseline) with supporting explanations.  
 


## Tech Stack

**Programming Languages**
- **Python 3.11** – used for ML models, FastAPI microservice, and data processing  
- **Java 17+** – used for Spring Boot backend and business logic  
- **JavaScript (ES6+)** – used for React frontend  

**Frontend**
- **React** – user-facing dashboard for submitting details and viewing predictions  
- **Tailwind CSS** – styling and UI components  
- **Custom Components** – floating inputs, steppers, and interactive forms  

**Backend**
- **Spring Boot** – main backend handling API orchestration between React and FastAPI  
- **FastAPI** – Python microservice serving ML models (approval + strategy)  
- **Maven** – build tool for Spring Boot  
- **WebClient (Spring)** – for making API calls from Java to FastAPI  

**Machine Learning**
- **scikit-learn / XGBoost** – ML pipelines for mortgage approval and strategy prediction  
- **pandas + NumPy** – data preprocessing and feature engineering  
- **joblib** – saving/loading trained models  
- **Jupyter Notebook** – experimentation, training, and validation of models before deployment  

**Other Features**
- **Modular Routing** – separate FastAPI endpoints for approval, rate recommendation, and strategy  
- **Swagger UI (FastAPI)** – auto-generated API documentation for testing endpoints  


## Contributing

We welcome contributions to improve this project! To contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Create a pull request

Please make sure your code follows our style and includes relevant tests/documentation.



## FAQ

**Q: What information do I need to provide to use the app?**  
A: You will need to enter your debt, income, expenses, preferences, house price, mortgage balance, age, and employment years (and related financial details).

---

**Q: How does the approval check work?**  
A: It evaluates your financial data against key rules and machine learning models, checking credit, debt ratios, affordability, and other factors to decide if you’re approved.

---

**Q: How does the strategy recommendation work?**  
A: The system compares multiple strategies (extend, lump sum, downsize, stay baseline) and tells you which is best, along with an explanation for why it fits your case.

---

**Q: Is my personal financial data stored?**  
A: No, your financial data is not stored. It is only used for generating predictions while you are using the app.

---

**Q: Can this be used outside Ontario?**  
A: The app was built specifically for Ontario’s mortgage renewal crisis, so results outside Ontario may not be accurate.

---

**Q: Do I need to install all three (FastAPI, Spring Boot, React) to run it?**  
A: Yes, the system relies on all three components running together for full functionality.


## License
This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software for personal or commercial purposes,  
provided that you include the original license file in any redistributed versions.

## Contact

Have questions, feedback, or ideas???

We’d love to hear from you!