# Chalo Kisaan Backend

FastAPI backend for the Chalo Kisaan agritourism PWA platform.

## Overview

The backend provides REST APIs for:
- Voice transcription (AWS Transcribe)
- Business plan generation (AWS Bedrock)
- Farm visualization (AWS SageMaker)
- Project management and persistence
- Cross-device synchronization
- PDF export and reporting

## Technology Stack

- **Framework**: FastAPI with async support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with Passlib
- **AWS Services**: Transcribe, Bedrock, SageMaker, S3
- **Testing**: pytest with hypothesis for property-based tests
- **Code Quality**: black, flake8, mypy

## Setup

### Prerequisites
- Python 3.10+
- PostgreSQL 12+
- AWS account with configured credentials

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── transcribe.py
│   │   │   ├── plans.py
│   │   │   ├── visualizations.py
│   │   │   ├── projects.py
│   │   │   ├── sync.py
│   │   │   └── export.py
│   │   └── dependencies.py
│   ├── models/
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── farm_details.py
│   │   ├── business_plan.py
│   │   └── image.py
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── middleware/
│   ├── config.py
│   └── main.py
├── migrations/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── property/
├── requirements.txt
├── pytest.ini
└── README.md
```

## API Endpoints

### Voice Transcription
- `POST /api/transcribe` - Transcribe audio to text

### Business Planning
- `POST /api/generate-plan` - Generate business plan from farm details

### Visualization
- `POST /api/generate-visualization` - Generate farm visualization

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Synchronization
- `POST /api/sync` - Sync offline changes

### Export
- `POST /api/export-pdf` - Generate PDF business plan

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run property-based tests only
pytest -m property

# Run specific test file
pytest tests/unit/test_transcription.py
```

## Development

### Code Style
- Format with black: `black app/`
- Lint with flake8: `flake8 app/`
- Type check with mypy: `mypy app/`

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Deployment

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for production deployment instructions.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - See [LICENSE](../LICENSE) for details.
