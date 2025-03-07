# ShareYourSpace Mock Data Strategy

## Overview

Our mock data strategy follows a tiered approach to support different development scenarios:

1. **Static JSON Fixtures** - Base mock data stored as JSON files
2. **Factory Functions** - Dynamic mock data generators
3. **MSW (Mock Service Worker)** - API request interception for testing and development
4. **Seeded Database** - Consistent data seeding for development and testing

## Implementation

### 1. Static JSON Fixtures

Located in `src/mocks/fixtures/`:

- `users.json` - Mock user data including corporate and startup profiles
- `spaces.json` - Mock space listings with various configurations
- `bookings.json` - Mock booking data with different statuses
- `compliance.json` - Mock compliance requirements and documents
- `connections.json` - Mock business connections and matching data

Example structure for `spaces.json`:

```json
[
  {
    "id": "space-001",
    "name": "Innovation Hub Alpha",
    "description": "Modern space in the heart of Schwabing",
    "ownerId": "user-corporate-001",
    "ownerType": "corporate",
    "companyId": "company-001",
    "spaceType": "office",
    "capacity": 20,
    "size": 150,
    "location": {
      "street": "Leopoldstraße 27",
      "city": "Munich",
      "postalCode": "80802",
      "country": "Germany",
      "district": "Schwabing"
    },
    "images": ["/mock/spaces/space-001-1.jpg", "/mock/spaces/space-001-2.jpg"],
    "amenities": ["wifi", "projector", "whiteboard", "video_conference", "kitchen"],
    "securityFeatures": ["keycard_access", "visitor_registration", "cctv", "data_compliance", "gdpr_compliant"],
    "complianceLevel": "enterprise",
    "preferredBookingDuration": ["monthly", "quarterly"],
    "minimumBookingDuration": "monthly",
    "isFeatured": true,
    "rating": 4.8,
    "reviewCount": 15,
    "createdAt": "2023-01-15T08:00:00.000Z",
    "updatedAt": "2023-11-20T14:30:00.000Z",
    "isActive": true,
    "verificationStatus": "verified"
  }
]
```

### 2. Factory Functions

Located in `src/mocks/factories/`:

- `userFactory.ts` - Generate dynamic user data
- `spaceFactory.ts` - Generate dynamic space data
- `bookingFactory.ts` - Generate dynamic booking data
- `complianceFactory.ts` - Generate dynamic compliance data
- `connectionFactory.ts` - Generate dynamic connection data

Example implementation of `spaceFactory.ts`:

```typescript
import { faker } from '@faker-js/faker';
import { Space, SpaceType, SpaceAmenity, SecurityFeature, BookingDuration, ComplianceLevel } from '@/models/space';
import { UserType } from '@/models/user';

export const createMockSpace = (overrides?: Partial<Space>): Space => {
  const id = overrides?.id || `space-${faker.string.nanoid(10)}`;
  
  const districts = ['Schwabing', 'Maxvorstadt', 'Glockenbachviertel', 'Sendling', 'Haidhausen'];
  
  return {
    id,
    name: overrides?.name || faker.company.name() + ' Office Space',
    description: overrides?.description || faker.company.catchPhrase(),
    ownerId: overrides?.ownerId || `user-${faker.string.nanoid(10)}`,
    ownerType: overrides?.ownerType || (Math.random() > 0.5 ? UserType.CORPORATE : UserType.STARTUP),
    companyId: overrides?.companyId || `company-${faker.string.nanoid(10)}`,
    spaceType: overrides?.spaceType || faker.helpers.enumValue(SpaceType),
    capacity: overrides?.capacity || faker.number.int({ min: 5, max: 50 }),
    size: overrides?.size || faker.number.int({ min: 50, max: 500 }),
    location: overrides?.location || {
      street: faker.location.streetAddress(),
      city: 'Munich',
      postalCode: faker.location.zipCode('####'),
      country: 'Germany',
      district: faker.helpers.arrayElement(districts),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    images: overrides?.images || Array(faker.number.int({ min: 3, max: 8 }))
      .fill(null)
      .map((_, i) => `/mock/spaces/space-${id}-${i + 1}.jpg`),
    floorPlan: overrides?.floorPlan || (Math.random() > 0.3 ? `/mock/spaces/floorplan-${id}.jpg` : undefined),
    virtualTour: overrides?.virtualTour || (Math.random() > 0.7 ? `https://example.com/tour/${id}` : undefined),
    amenities: overrides?.amenities || faker.helpers.arrayElements(
      Object.values(SpaceAmenity),
      faker.number.int({ min: 3, max: 10 })
    ),
    securityFeatures: overrides?.securityFeatures || faker.helpers.arrayElements(
      Object.values(SecurityFeature),
      faker.number.int({ min: 2, max: 8 })
    ),
    complianceLevel: overrides?.complianceLevel || faker.helpers.enumValue(ComplianceLevel),
    complianceDocuments: overrides?.complianceDocuments || [],
    availabilities: overrides?.availabilities || [],
    preferredBookingDuration: overrides?.preferredBookingDuration || faker.helpers.arrayElements(
      [BookingDuration.MONTHLY, BookingDuration.QUARTERLY, BookingDuration.BIANNUAL],
      faker.number.int({ min: 1, max: 3 })
    ),
    minimumBookingDuration: overrides?.minimumBookingDuration || BookingDuration.MONTHLY,
    isFeatured: overrides?.isFeatured ?? (Math.random() > 0.8),
    rating: overrides?.rating || faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
    reviewCount: overrides?.reviewCount || faker.number.int({ min: 0, max: 50 }),
    growthOptions: overrides?.growthOptions || {
      hasExpansionSpace: Math.random() > 0.5,
      maxAdditionalCapacity: faker.number.int({ min: 5, max: 20 }),
      adjacentSpace: Math.random() > 0.5,
      shortNoticePeriod: Math.random() > 0.7,
      flexibleTerms: Math.random() > 0.3,
    },
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
    isActive: overrides?.isActive ?? true,
    verificationStatus: overrides?.verificationStatus || 'verified',
  };
};

export const generateMockSpaces = (count: number): Space[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => createMockSpace({ id: `space-${index + 1}` }));
};
```

### 3. MSW Integration

Setup in `src/mocks/handlers.ts` and `src/mocks/browser.ts`:

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';
import { generateMockUsers } from './factories/userFactory';
import { generateMockSpaces } from './factories/spaceFactory';
import { generateMockBookings } from './factories/bookingFactory';

// Generate initial mock data
const users = generateMockUsers(20);
const spaces = generateMockSpaces(50);
const bookings = generateMockBookings(30);

export const handlers = [
  // Auth handlers
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    // Implement login logic
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token',
        user: users[0],
      })
    );
  }),
  
  // Space handlers
  rest.get('/api/v1/spaces', (req, res, ctx) => {
    // Add filtering, pagination, etc.
    return res(
      ctx.status(200),
      ctx.json({
        spaces: spaces.slice(0, 10),
        total: spaces.length,
        page: 1,
        pageSize: 10,
      })
    );
  }),
  
  rest.get('/api/v1/spaces/:id', (req, res, ctx) => {
    const { id } = req.params;
    const space = spaces.find(s => s.id === id);
    
    if (!space) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Space not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(space)
    );
  }),
  
  // More handlers for other endpoints...
];
```

```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### 4. Development Environment Integration

In `src/pages/_app.tsx`:

```typescript
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Only load MSW in development
      const initMocks = async () => {
        const { worker } = await import('@/mocks/browser');
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      };
      
      initMocks();
    }
  }, []);
  
  return <Component {...pageProps} />;
}
```

### 5. Mock Data for Demo Purposes

Create specific demo scenarios in `src/mocks/scenarios/`:

- `corporateDemo.ts` - Corporate user journey demo data
- `startupDemo.ts` - Startup user journey demo data
- `matchingDemo.ts` - Business matching demo data
- `complianceDemo.ts` - Compliance verification demo data

Example implementation of a demo scenario:

```typescript
// src/mocks/scenarios/corporateDemo.ts
import { createMockUser } from '../factories/userFactory';
import { createMockSpace } from '../factories/spaceFactory';
import { createMockBooking } from '../factories/bookingFactory';
import { UserType } from '@/models/user';
import { SpaceType, SecurityFeature } from '@/models/space';
import { BookingStatus } from '@/models/booking';

export const corporateDemoScenario = {
  // Demo corporate user
  user: createMockUser({
    id: 'demo-corporate-user',
    userType: UserType.CORPORATE,
    firstName: 'Thomas',
    lastName: 'Weber',
    company: {
      id: 'demo-corporate-company',
      name: 'InnovateTech GmbH',
      type: UserType.CORPORATE,
      industryType: 'Technology',
      employeeCount: 2500,
      innovationTeamSize: 15,
      innovationFocus: ['AI', 'IoT', 'Sustainability'],
      complianceLevel: 'enterprise_plus',
      verificationStatus: 'verified',
    },
  }),
  
  // Owned spaces
  ownedSpaces: [
    createMockSpace({
      id: 'demo-corporate-space-1',
      name: 'InnovateTech Innovation Lab',
      ownerId: 'demo-corporate-user',
      ownerType: UserType.CORPORATE,
      companyId: 'demo-corporate-company',
      spaceType: SpaceType.OFFICE,
      capacity: 30,
      size: 250,
      location: {
        street: 'Leopoldstraße 27',
        city: 'Munich',
        postalCode: '80802',
        country: 'Germany',
        district: 'Schwabing',
      },
      securityFeatures: [
        SecurityFeature.KEYCARD_ACCESS,
        SecurityFeature.VISITOR_REGISTRATION,
        SecurityFeature.CCTV,
        SecurityFeature.NETWORK_ISOLATION,
        SecurityFeature.DATA_COMPLIANCE,
        SecurityFeature.GDPR_COMPLIANT,
      ],
      complianceLevel: 'enterprise_plus',
    }),
    // More spaces...
  ],
  
  // Active bookings (spaces booked by startups)
  activeBookings: [
    createMockBooking({
      id: 'demo-booking-1',
      spaceId: 'demo-corporate-space-1',
      providerId: 'demo-corporate-user',
      providerType: UserType.CORPORATE,
      providerCompanyId: 'demo-corporate-company',
      providerCompanyName: 'InnovateTech GmbH',
      requesterId: 'startup-user-1',
      requesterType: UserType.STARTUP,
      requesterCompanyId: 'startup-company-1',
      requesterCompanyName: 'DataFlow AI',
      bookingStatus: BookingStatus.APPROVED,
    }),
    // More bookings...
  ],
  
  // Pending connection requests
  pendingConnections: [
    // Connection requests...
  ],
  
  // Recommended spaces for booking
  recommendedSpaces: [
    // Recommended spaces...
  ],
  
  // Recommended startups for connections
  recommendedStartups: [
    // Startup recommendations...
  ],
};
```

### 6. Toggling Between Real and Mock Data

Create a utility to toggle between real and mock data:

```typescript
// src/lib/api/api-client.ts
import axios from 'axios';

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to use mock data when enabled
if (useMockData && typeof window !== 'undefined') {
  // This code will only run in the browser
  import('@/mocks/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  });
}

export default apiClient;
```