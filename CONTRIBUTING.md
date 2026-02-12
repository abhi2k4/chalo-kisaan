# Contributing to Chalo Kisaan

Thank you for your interest in contributing to Chalo Kisaan! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/chalo-kisaan.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit with clear messages: `git commit -m "feat: description of changes"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run test
npm run test:pbt
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
pytest
```

## Commit Message Convention

Follow the Conventional Commits format:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, missing semicolons, etc.)
- `refactor:` Code refactoring without feature changes
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process, dependencies, or tooling changes

Example: `feat: add voice recording component with language selection`

## Testing Requirements

- All new features must include unit tests
- Property-based tests required for core logic
- Maintain 80%+ code coverage
- Run tests before submitting PR: `npm run test` or `pytest`

## Code Style

### Frontend (React/TypeScript)
- Use TypeScript for type safety
- Follow ESLint configuration
- Use functional components with hooks
- Add JSDoc comments for complex functions

### Backend (Python/FastAPI)
- Follow PEP 8 style guide
- Use type hints for all functions
- Add docstrings to all modules and functions
- Use meaningful variable names

## Pull Request Process

1. Update README.md with any new features or changes
2. Ensure all tests pass
3. Update documentation as needed
4. Request review from maintainers
5. Address feedback and make requested changes
6. Squash commits if requested

## Reporting Issues

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, device)
- Screenshots or logs if applicable

## Feature Requests

When requesting features, please include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation approach
- Any relevant mockups or examples

## Questions?

Feel free to open an issue or reach out to the maintainers at support@chalokisaan.com

---

Thank you for contributing to Chalo Kisaan!
