# Frontend-Backend Integration Guide

# Run and deploy your AI Studio app
## Table Banking App - PesaChama Manager

This contains everything you need to run your app locally.
This guide explains how to integrate the React frontend (PesaChama Manager) with the Spring Boot backend (Table Banking App).

View your app in AI Studio: https://ai.studio/apps/drive/1pVdxaGmC6sx5KyiVaA9Vt6rKN7jtfr0_
## Architecture Overview

## Run Locally
```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐│
│  │   Pages     │ │  Contexts   │ │   Hooks     │ │  Services  ││
│  │ - Dashboard │ │ - Auth      │ │ - useData   │ │ - api.ts   ││
│  │ - Members   │ │ - AppData   │ │ - useAuth   │ │ - auth     ││
│  │ - Loans     │ └─────────────┘ └─────────────┘ │ - member   ││
│  │ - Contrib.  │                                  │ - loan     ││
│  └─────────────┘                                  │ - contrib  ││
│                                                   └────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Spring Boot)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐│
│  │ Controllers │ │  Services   │ │Repositories │ │  Entities  ││
│  │ - Auth      │ │ - Auth      │ │ - Member    │ │ - Member   ││
│  │ - Member    │ │ - Member    │ │ - Loan      │ │ - Loan     ││
│  │ - Loan      │ │ - Loan      │ │ - Contrib.  │ │ - Contrib. ││
│  │ - Contrib.  │ │ - Contrib.  │ │ - Group     │ │ - Group    ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Prerequisites:**  Node.js
## Quick Start

### 1. Backend Setup

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
```bash
# Navigate to backend directory
cd table-banking-app

# Add the new files from frontend-integration/backend/
cp frontend-integration/backend/*.java src/main/java/com/tablebanking/loanmanagement/

# Update application.yml with CORS settings
```

Add to `application.yml`:
```yaml
app:
  cors:
    allowed-origins: http://localhost:3000,http://localhost:5173
    allowed-methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
  jwt:
    secret: ${JWT_SECRET:your-256-bit-secret-key-here-make-it-long}
    expiration: 86400000  # 24 hours
    refresh-expiration: 604800000  # 7 days
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd pesa-chama-manager

# Copy integration files
cp -r frontend-integration/services ./
cp -r frontend-integration/contexts ./
cp -r frontend-integration/hooks ./
cp -r frontend-integration/types ./

# Update existing files
cp frontend-integration/vite.config.ts ./
cp frontend-integration/pages/App.tsx ./
cp frontend-integration/pages/Auth.tsx ./pages/
cp frontend-integration/pages/Members.tsx ./pages/
cp frontend-integration/pages/Contributions.tsx ./pages/

# Create environment file
echo "VITE_API_URL=/api/v1" > .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Run Both Services

```bash
# Terminal 1 - Backend (port 8080)
cd table-banking-app
./mvnw spring-boot:run

# Terminal 2 - Frontend (port 3000)
cd pesa-chama-manager
npm run dev
```

Access the app at http://localhost:3000

## File Structure

### Frontend Files to Add/Update

```
pesa-chama-manager/
├── services/                    # API service layer
│   ├── api.ts                   # Base API client with auth
│   ├── authService.ts           # Authentication
│   ├── memberService.ts         # Member management
│   ├── contributionService.ts   # Contributions
│   ├── loanService.ts           # Loans & guaranteed loans
│   ├── groupService.ts          # Groups & financial years
│   └── index.ts                 # Exports
├── contexts/                    # React context providers
│   ├── AuthContext.tsx          # Auth state management
│   └── AppDataContext.tsx       # App data (group, year)
├── hooks/                       # Custom hooks
│   └── useData.ts               # Data fetching hooks
├── types/                       # TypeScript types
│   └── index.ts                 # Type definitions
├── pages/                       # Updated pages
│   ├── App.tsx                  # With providers
│   ├── Auth.tsx                 # Real authentication
│   ├── Members.tsx              # API-connected
│   └── Contributions.tsx        # API-connected
└── vite.config.ts               # With API proxy
```

### Backend Files to Add

```
table-banking-app/src/main/java/com/tablebanking/loanmanagement/
├── config/
│   └── SecurityConfig.java      # CORS + JWT security
├── controller/
│   └── AuthController.java      # Auth endpoints
├── dto/
│   ├── request/
│   │   └── AuthDTOs.java        # Login, Register requests
│   └── response/
│       └── AuthResponseDTOs.java # Auth, User responses
└── service/
    └── AuthService.java         # Auth business logic
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/register` | Register |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/auth/me` | Current user |
| POST | `/api/v1/auth/logout` | Logout |

### Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/members` | List members |
| GET | `/api/v1/members/{id}` | Get member |
| POST | `/api/v1/members` | Create member |
| PUT | `/api/v1/members/{id}` | Update member |
| PATCH | `/api/v1/members/{id}/status` | Update status |

### Contributions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/contributions/member/{id}` | By member |
| GET | `/api/v1/contributions/cycle/{id}` | By cycle |
| POST | `/api/v1/contributions/record` | Record payment |
| POST | `/api/v1/contributions/record-advance` | Advance payment |
| GET | `/api/v1/contributions/member/{id}/advance-status` | Advance status |

### Loans
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/loans` | List loans |
| GET | `/api/v1/loans/member/{id}` | By member |
| POST | `/api/v1/loans` | Create loan |
| POST | `/api/v1/loans/repayments` | Record repayment |

### Guaranteed Loans
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/guaranteed-loans/borrowers` | Create borrower |
| POST | `/api/v1/guaranteed-loans` | Create loan |
| POST | `/api/v1/guaranteed-loans/guarantors` | Add guarantor |
| GET | `/api/v1/guaranteed-loans/guarantors/member/{id}/exposure` | Exposure |

## Authentication Flow

```
1. User enters credentials
2. Frontend calls POST /api/v1/auth/login
3. Backend validates and returns JWT tokens
4. Frontend stores tokens in localStorage
5. API client adds Authorization header to all requests
6. On 401, frontend tries to refresh token
7. If refresh fails, redirect to login
```

## Using the Integration

### AuthContext
```tsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm onSubmit={login} />;
  }
  
  return <div>Welcome, {user.fullName}!</div>;
}
```

### Data Hooks
```tsx
import { useMembers, useMyLoans, useRecordContribution } from './hooks/useData';

function MembersPage() {
  const { data: members, isLoading, error, refetch } = useMembers();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error} onRetry={refetch} />;
  
  return <MemberList members={members} />;
}

function LoanPage() {
  const { data: loans } = useMyLoans();
  const { createLoan, isLoading } = useCreateLoan();
  
  const handleApply = async (data) => {
    await createLoan(data);
    // Refresh data...
  };
}
```

### AppDataContext
```tsx
import { useAppData } from './contexts/AppDataContext';

function Dashboard() {
  const { 
    currentGroup, 
    currentFinancialYear, 
    dashboard,
    formatCurrency 
  } = useAppData();
  
  return (
    <div>
      <h1>{currentGroup?.name}</h1>
      <p>Total: {formatCurrency(dashboard?.totalBalance)}</p>
    </div>
  );
}
```

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=/api/v1
VITE_API_BASE_URL=http://localhost:8080
```

### Backend (application.yml)
```yaml
app:
  cors:
    allowed-origins: http://localhost:3000
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400000
```

## Production Deployment

### Option 1: Separate Servers
- Deploy frontend to Vercel/Netlify
- Deploy backend to AWS/GCP/Azure
- Configure CORS for production domain

### Option 2: Embedded in Spring Boot
```bash
# Build frontend
cd pesa-chama-manager
npm run build

# Copy to Spring Boot static resources
cp -r dist/* ../table-banking-app/src/main/resources/static/

# Build Spring Boot
cd ../table-banking-app
./mvnw package
```

## Troubleshooting

### CORS Errors
- Check `allowed-origins` in backend config
- Ensure frontend URL matches exactly
- Check browser console for specific CORS error

### 401 Unauthorized
- Check token is being sent in header
- Verify token hasn't expired
- Check backend JWT secret matches
