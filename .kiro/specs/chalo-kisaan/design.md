# Design Document: Chalo Kisaan - Agritourism PWA

## Overview

Chalo Kisaan is a Progressive Web App that bridges the gap between traditional farming and agritourism entrepreneurship. The system is built with a mobile-first React frontend, Python FastAPI backend, and AWS services for AI/ML capabilities. The architecture prioritizes offline-first functionality, voice-based interaction, and accessibility for low-literacy users in rural India.

### Key Design Principles

1. **Mobile-First**: Optimized for low-end Android devices with 2GB RAM and slow connections
2. **Offline-First**: All critical functionality works without internet; sync when online
3. **Voice-Primary**: Voice interaction is the primary input method; text is secondary
4. **Visual-Heavy**: Minimal text; maximum use of cards, charts, and visual feedback
5. **Accessibility**: Support for screen readers, large touch targets, simple language
6. **Resilience**: Graceful degradation when services fail; automatic retry mechanisms

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    React PWA Frontend                        │
│  (Mobile-First, Offline-First, Voice-Enabled)              │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌──────────┐
   │ Browser │  │ Service │  │ IndexedDB│
   │ Storage │  │ Worker  │  │ (Cache)  │
   └─────────┘  └─────────┘  └──────────┘
        │            │            │
        └────────────┼────────────┘
                     │
        ┌────────────▼────────────┐
        │   FastAPI Backend       │
        │  (Python, Async)        │
        └────────────┬────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
        ▼            ▼            ▼              ▼
   ┌─────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐
   │   AWS   │  │   AWS    │  │  AWS   │  │ Database │
   │Transcribe│ │ Bedrock  │  │SageMaker│ │(PostgreSQL)
   └─────────┘  └──────────┘  └────────┘  └──────────┘
```

### Frontend Architecture

**React Components Structure**:
- `OnboardingFlow`: Voice-first form capture with language selection
- `BusinessPlanViewer`: Card-based display of setup costs, itinerary, ROI
- `DreamVisualization`: Before/After slider for farm images
- `Dashboard`: Project management and summary cards
- `OfflineManager`: Local storage sync and conflict resolution
- `VoiceRecorder`: Audio capture and transcription UI

**State Management**:
- Redux for global state (projects, user data, sync status)
- Local Context for UI state (current language, offline status)
- IndexedDB for large data (images, business plans)

**Service Worker**:
- Intercepts network requests
- Serves cached content when offline
- Queues requests for retry when online
- Handles background sync

### Backend Architecture

**FastAPI Endpoints**:
- `POST /api/transcribe`: Send audio to AWS Transcribe
- `POST /api/generate-plan`: Send farm details to AWS Bedrock
- `POST /api/generate-visualization`: Send image to AWS SageMaker
- `POST /api/projects`: Create/update projects
- `GET /api/projects`: Retrieve user projects
- `POST /api/sync`: Sync offline changes to backend
- `POST /api/export-pdf`: Generate PDF business plan

**AWS Service Integration**:
- **AWS Transcribe**: Converts speech to text (Hindi, Marathi, English)
- **AWS Bedrock**: Generates business plans using Claude or similar LLM
- **AWS SageMaker**: Generates farm visualizations using image generation models
- **AWS S3**: Stores images and generated PDFs

## Components and Interfaces

### 1. Voice Onboarding Component

**Input Interface**:
```
{
  language: "hi" | "mr" | "en",
  farmDetails: {
    landSize: number,
    landUnit: "acres" | "hectares",
    crops: string[],
    budget: number,
    amenities: string[],
    farmDescription: string
  }
}
```

**Output Interface**:
```
{
  projectId: string,
  farmDetails: FarmDetails,
  createdAt: timestamp,
  savedLocally: boolean,
  syncedToBackend: boolean
}
```

**Key Functions**:
- `startVoiceRecording()`: Begin audio capture
- `stopVoiceRecording()`: End audio capture and send to Transcribe
- `transcribeAudio(audioBlob, language)`: Call AWS Transcribe API
- `extractFarmDetails(transcribedText)`: Parse text to extract structured data
- `validateFarmDetails(details)`: Ensure all required fields present
- `saveFarmDetails(details)`: Store to local storage and backend

### 2. Business Plan Generator Component

**Input Interface**:
```
{
  farmDetails: FarmDetails,
  region: string,
  targetMarket: string
}
```

**Output Interface**:
```
{
  businessPlan: {
    setupCosts: {
      items: Array<{name, cost, category}>,
      total: number
    },
    dailyItinerary: Array<{time, activity, duration}>,
    roiCalculator: {
      initialInvestment: number,
      monthlyRevenue: number,
      breakEvenMonths: number,
      annualProfit: number,
      projections: Array<{year, profit}>
    }
  }
}
```

**Key Functions**:
- `generateBusinessPlan(farmDetails)`: Call AWS Bedrock API
- `parseBedrockResponse(response)`: Extract structured data from LLM output
- `calculateROI(costs, revenue)`: Compute financial metrics
- `formatForDisplay(plan)`: Prepare data for card-based UI

### 3. Dream Visualization Component

**Input Interface**:
```
{
  farmImage: File,
  farmDetails: FarmDetails,
  style: "traditional" | "modern" | "eco-friendly"
}
```

**Output Interface**:
```
{
  originalImage: string (base64),
  generatedImage: string (base64),
  generatedAt: timestamp,
  savedLocally: boolean
}
```

**Key Functions**:
- `uploadFarmImage(file)`: Validate and compress image
- `generateVisualization(image, farmDetails)`: Call AWS SageMaker API
- `createBeforeAfterSlider(original, generated)`: Render interactive slider
- `downloadVisualization(image)`: Export image file

### 4. Offline Manager Component

**Local Storage Schema**:
```
{
  projects: {
    [projectId]: {
      id, name, farmDetails, businessPlan, 
      visualizations, createdAt, modifiedAt, syncStatus
    }
  },
  images: {
    [imageId]: base64EncodedImage
  },
  syncQueue: [
    {action, projectId, timestamp, retryCount}
  ]
}
```

**Key Functions**:
- `saveToLocalStorage(data)`: Persist data to IndexedDB
- `loadFromLocalStorage(projectId)`: Retrieve project data
- `queueForSync(action, data)`: Add to sync queue
- `syncWithBackend()`: Send queued changes to backend
- `resolveConflicts(localData, remoteData)`: Merge changes

### 5. Dashboard Component

**Data Structure**:
```
{
  projects: Array<{
    id, name, createdAt, modifiedAt,
    setupCost, projectedProfit, breakEvenMonths,
    lastViewed
  }>
}
```

**Key Functions**:
- `loadProjects()`: Fetch all user projects
- `displayProjectCards()`: Render summary cards
- `deleteProject(projectId)`: Remove project
- `renameProject(projectId, newName)`: Update project name
- `exportProject(projectId)`: Create backup file

### 6. PDF Export Component

**Key Functions**:
- `generatePDF(businessPlan, farmDetails)`: Create professional PDF
- `formatPDFContent(plan)`: Structure content for PDF layout
- `embedCharts(roiData)`: Include visualizations in PDF
- `downloadPDF(filename)`: Trigger browser download

## Data Models

### Project Model
```
{
  id: UUID,
  userId: string,
  name: string,
  farmDetails: {
    landSize: number,
    landUnit: string,
    crops: string[],
    budget: number,
    amenities: string[],
    description: string,
    location: {latitude, longitude}
  },
  businessPlan: {
    setupCosts: Array,
    dailyItinerary: Array,
    roiCalculator: Object
  },
  visualizations: {
    originalImageId: string,
    generatedImageId: string
  },
  createdAt: timestamp,
  modifiedAt: timestamp,
  syncStatus: "synced" | "pending" | "failed"
}
```

### User Model
```
{
  id: UUID,
  email: string,
  name: string,
  language: "hi" | "mr" | "en",
  region: string,
  createdAt: timestamp,
  lastLogin: timestamp
}
```

### Image Model
```
{
  id: UUID,
  projectId: UUID,
  type: "original" | "generated",
  data: base64,
  size: number,
  uploadedAt: timestamp
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.


### Correctness Properties

Based on the acceptance criteria analysis, here are the key correctness properties that the system must satisfy:

#### Property 1: Voice Recording State Consistency
*For any* voice recording session, when the microphone button is tapped, the recording state should transition to active and visual feedback should be displayed. When released, recording should stop and audio should be queued for transcription.
**Validates: Requirements 1.2, 1.3**

#### Property 2: Farm Details Extraction Accuracy
*For any* transcribed text containing farm information, the system should correctly extract and populate farm details (land size, crops, budget, amenities) into the corresponding form fields.
**Validates: Requirements 1.5**

#### Property 3: Multi-Field Voice Accumulation
*For any* sequence of voice inputs across multiple form fields, all transcribed data should be accumulated and retained in the onboarding session without loss.
**Validates: Requirements 1.6**

#### Property 4: Form Validation Completeness
*For any* farm details submission, if all required fields are populated, validation should pass. If any required field is missing, validation should fail and prevent submission.
**Validates: Requirements 1.7**

#### Property 5: Onboarding Data Persistence Round-Trip
*For any* completed onboarding form, submitting the data should result in the same data being retrievable from both local storage and the backend.
**Validates: Requirements 1.8, 4.1**

#### Property 6: Business Plan Structure Integrity
*For any* business plan generated from farm details, the plan should contain all required components (setup costs with itemized list and total, daily itinerary with time-based ordering, ROI calculator with financial metrics).
**Validates: Requirements 2.2, 2.4, 2.5**

#### Property 7: Setup Costs Calculation Accuracy
*For any* setup costs list, the sum of all itemized costs should equal the displayed total cost.
**Validates: Requirements 2.4**

#### Property 8: Itinerary Chronological Ordering
*For any* daily itinerary, all activities should be ordered chronologically by start time.
**Validates: Requirements 2.5**

#### Property 9: Business Plan Persistence Round-Trip
*For any* generated business plan, saving and retrieving it should produce an equivalent plan with all data intact.
**Validates: Requirements 2.8, 4.2**

#### Property 10: Image Validation Enforcement
*For any* image upload attempt, if the image format is not JPEG/PNG or file size exceeds 10MB, the upload should be rejected with an error message.
**Validates: Requirements 3.2**

#### Property 11: Visualization Image Persistence
*For any* generated visualization, both the original and AI-generated images should be saved to local storage and retrievable.
**Validates: Requirements 3.7, 4.3**

#### Property 12: Before/After Slider Interactivity
*For any* Before/After slider interaction, moving the slider should smoothly transition the displayed image between the original and generated versions.
**Validates: Requirements 3.6**

#### Property 13: Offline Content Accessibility
*For any* previously saved project, when the system is offline, all project data (farm details, business plan, visualizations) should be accessible from local storage.
**Validates: Requirements 4.4**

#### Property 14: Offline Action Prevention
*For any* action requiring internet connectivity (voice transcription, business plan generation, visualization generation), when the system is offline, the action should be prevented and an appropriate message should be displayed.
**Validates: Requirements 4.5**

#### Property 15: Automatic Sync on Reconnection
*For any* data modified while offline, when the system regains internet connectivity, the modified data should be automatically synced to the backend.
**Validates: Requirements 4.6**

#### Property 16: Project Metadata Integrity
*For any* created project, the project should have a unique ID and a creation timestamp.
**Validates: Requirements 5.1**

#### Property 17: Dashboard Project Listing
*For any* set of saved projects, the dashboard should display all projects with their summary metrics (setup cost, projected profit, break-even timeline).
**Validates: Requirements 5.2, 5.3**

#### Property 18: PDF Content Completeness
*For any* generated PDF business plan, the PDF should contain all required sections: project title, farm details, executive summary, setup costs breakdown, daily itinerary, ROI analysis, and assumptions.
**Validates: Requirements 5.5**

#### Property 19: Project Deletion Finality
*For any* deleted project, the project should be removed from the dashboard and all storage locations (local storage and backend).
**Validates: Requirements 5.7**

#### Property 20: Project Rename Propagation
*For any* renamed project, the new name should be updated in the dashboard and all associated data references.
**Validates: Requirements 5.8**

#### Property 21: Cross-Device Synchronization
*For any* project created or modified on one device, the same project should appear on all other devices logged in with the same account within 5 seconds.
**Validates: Requirements 6.3, 6.4**

#### Property 22: Conflict Resolution Correctness
*For any* conflicting changes made on multiple devices, the system should merge changes using a consistent strategy (last-write-wins) without data loss.
**Validates: Requirements 6.5**

#### Property 23: Session Persistence on Launch
*For any* PWA launch, the system should restore the last viewed project or dashboard view.
**Validates: Requirements 6.6**

#### Property 24: Offline PWA Functionality
*For any* PWA running offline, all previously synced data should be accessible and the app should function without internet connectivity.
**Validates: Requirements 6.7**

#### Property 25: Data Encryption at Rest
*For any* sensitive data stored in local storage, the data should be encrypted and not readable in plain text.
**Validates: Requirements 7.2**

#### Property 26: HTTPS Enforcement
*For any* network request to the backend, the request should use HTTPS/TLS encryption.
**Validates: Requirements 7.3**

#### Property 27: Logout Data Clearing
*For any* logout action, all sensitive data should be cleared from memory and local storage.
**Validates: Requirements 7.4**

#### Property 28: Transcription Error Handling
*For any* failed voice transcription, an error message should be displayed and a retry option should be provided.
**Validates: Requirements 8.1**

#### Property 29: Network Error Retry Queuing
*For any* failed network request, the request should be queued for retry when connectivity is restored.
**Validates: Requirements 8.4**

#### Property 30: Language Detection and Switching
*For any* language selection, all UI elements should be displayed in the selected language (Hindi, Marathi, or English).
**Validates: Requirements 9.2**

#### Property 31: UI Feedback on Interaction
*For any* user interaction with UI elements, visual feedback (animation, color change, or state change) should be provided.
**Validates: Requirements 9.4**

#### Property 32: Accessible Button Sizing
*For any* interactive button, the button should have a minimum touch target size of 48x48 pixels for accessibility.
**Validates: Requirements 9.5**

#### Property 33: Screen Reader Support
*For any* UI element, appropriate ARIA labels and semantic HTML should be present for screen reader compatibility.
**Validates: Requirements 9.6**

#### Property 34: Initial Load Performance
*For any* app launch on a 4G connection, the initial screen should load within 3 seconds.
**Validates: Requirements 10.1**

#### Property 35: Image Compression Quality
*For any* uploaded image, the system should compress it to reduce file size while maintaining acceptable visual quality.
**Validates: Requirements 10.3**

#### Property 36: Graceful Error Recovery
*For any* error encountered during operation, the app should display an error message and remain functional without crashing.
**Validates: Requirements 10.7**

## Error Handling

### Error Categories and Responses

**Voice Transcription Errors**:
- Network timeout: Display "Connection lost. Please try again." with retry button
- Invalid audio: Display "Could not understand audio. Please speak clearly and try again."
- Language mismatch: Display "Language not recognized. Please select the correct language."

**Business Plan Generation Errors**:
- AWS Bedrock timeout: Display "Plan generation taking longer than expected. Please try again."
- Invalid farm details: Display "Some farm details are missing. Please complete all fields."
- Service unavailable: Display "Service temporarily unavailable. Please try again later."

**Visualization Generation Errors**:
- Invalid image: Display "Image format not supported. Please use JPEG or PNG."
- Image too large: Display "Image is too large. Please use an image under 10MB."
- AWS SageMaker timeout: Display "Visualization generation taking longer. Please try again."

**Network Errors**:
- Connection lost: Queue request for retry; display "Offline. Changes will sync when online."
- Request timeout: Retry up to 3 times with exponential backoff
- Server error (5xx): Display error and queue for retry

**Offline Errors**:
- Action requires internet: Display "This action requires internet connection. Please try again when online."
- Storage full: Display "Storage is full. Please delete some projects to continue."

### Error Recovery Strategies

1. **Automatic Retry**: Network requests retry up to 3 times with exponential backoff (1s, 2s, 4s)
2. **User-Initiated Retry**: All errors provide a "Retry" button for manual retry
3. **Graceful Degradation**: If a service fails, the app continues with cached data
4. **Sync Queue**: Failed syncs are queued and retried when connectivity is restored
5. **Error Logging**: All errors are logged to backend for debugging (with user consent)

## Testing Strategy

### Dual Testing Approach

The system requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** (Specific Examples and Edge Cases):
- Test specific language transcriptions (Hindi, Marathi, English)
- Test edge cases: empty farm details, zero budget, single crop
- Test error conditions: network failures, invalid images, storage full
- Test integration points: onboarding → business plan → visualization
- Test UI interactions: button clicks, slider movements, language switching

**Property-Based Tests** (Universal Properties):
- For each correctness property listed above, implement a property-based test
- Use fast-check (JavaScript) or Hypothesis (Python) for property generation
- Configure each test to run minimum 100 iterations
- Tag each test with the property number and requirements reference

### Property-Based Testing Configuration

**Testing Library**: fast-check (for React frontend), pytest with hypothesis (for Python backend)

**Test Structure**:
```javascript
// Example property test
describe('Feature: chalo-kisaan, Property 5: Onboarding Data Persistence', () => {
  it('should persist and retrieve farm details correctly', () => {
    fc.assert(
      fc.property(farmDetailsArbitrary, (farmDetails) => {
        // 1. Save farm details
        saveFarmDetails(farmDetails);
        
        // 2. Retrieve from local storage
        const retrieved = loadFromLocalStorage(farmDetails.projectId);
        
        // 3. Verify round-trip
        expect(retrieved).toEqual(farmDetails);
      }),
      { numRuns: 100 }
    );
  });
});
```

**Test Tagging Format**:
- Comment: `// Feature: chalo-kisaan, Property N: [Property Title]`
- Each property gets exactly one property-based test
- Each test validates the universal property across 100+ generated inputs

### Testing Priorities

1. **High Priority** (Must Test):
   - Voice transcription accuracy (Property 2)
   - Data persistence round-trips (Properties 5, 9, 11)
   - Offline functionality (Properties 13, 14, 15)
   - Cross-device sync (Properties 21, 22)
   - Error handling (Properties 28, 29)

2. **Medium Priority** (Should Test):
   - Business plan structure (Properties 6, 7, 8)
   - Dashboard functionality (Properties 17, 19, 20)
   - UI interactions (Properties 31, 32, 33)
   - Performance (Property 34)

3. **Low Priority** (Nice to Test):
   - Language detection (Property 30)
   - Accessibility features (Properties 32, 33)
   - Graceful degradation (Property 36)

### Test Coverage Goals

- Unit tests: 80% code coverage
- Property tests: All 36 correctness properties covered
- Integration tests: All major workflows (onboarding → plan → visualization → export)
- End-to-end tests: Critical user journeys (new farmer → business plan → PDF export)

## Implementation Notes

### Technology Stack Details

**Frontend**:
- React 18+ with TypeScript
- Redux for state management
- Service Worker for offline support
- IndexedDB for large data storage
- fast-check for property-based testing
- Vitest for unit testing

**Backend**:
- Python 3.10+ with FastAPI
- Pydantic for data validation
- SQLAlchemy for database ORM
- pytest with hypothesis for testing
- AWS SDK for service integration

**AWS Services**:
- AWS Transcribe: Speech-to-text (Hindi, Marathi, English)
- AWS Bedrock: LLM for business plan generation
- AWS SageMaker: Image generation for visualizations
- AWS S3: Image and PDF storage
- AWS Cognito: User authentication

### Performance Optimization

1. **Image Optimization**: Compress images to <500KB before upload
2. **Lazy Loading**: Load business plan sections on demand
3. **Caching**: Cache transcription results and generated plans
4. **Code Splitting**: Split React components for faster initial load
5. **Service Worker**: Cache static assets and API responses

### Security Considerations

1. **Encryption**: AES-256 for local storage, TLS 1.3 for transit
2. **Authentication**: JWT tokens with 1-hour expiry
3. **Authorization**: Row-level security for user data
4. **Input Validation**: Sanitize all user inputs
5. **Rate Limiting**: Limit API requests to prevent abuse

