# Create Space API

## Description
Creates a new space listing in the platform. The space will be associated with the authenticated user's company.

## Request

### Method
`POST`

### URL
`/api/v1/spaces`

### Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer [token]"
}
```

### Body
```json
{
  "name": "Innovation Hub Alpha",
  "description": "Modern space in the heart of Schwabing",
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
  "amenities": ["wifi", "projector", "whiteboard", "video_conference", "kitchen"],
  "securityFeatures": ["keycard_access", "visitor_registration", "cctv", "data_compliance", "gdpr_compliant"],
  "complianceLevel": "enterprise",
  "preferredBookingDuration": ["monthly", "quarterly"],
  "minimumBookingDuration": "monthly",
  "growthOptions": {
    "hasExpansionSpace": true,
    "maxAdditionalCapacity": 10,
    "adjacentSpace": true,
    "shortNoticePeriod": false,
    "flexibleTerms": true
  }
}
```

## Response

### Success Response
**Code:** 201 CREATED
```json
{
  "status": "success",
  "data": {
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
    "amenities": ["wifi", "projector", "whiteboard", "video_conference", "kitchen"],
    "securityFeatures": ["keycard_access", "visitor_registration", "cctv", "data_compliance", "gdpr_compliant"],
    "complianceLevel": "enterprise",
    "preferredBookingDuration": ["monthly", "quarterly"],
    "minimumBookingDuration": "monthly",
    "isFeatured": false,
    "growthOptions": {
      "hasExpansionSpace": true,
      "maxAdditionalCapacity": 10,
      "adjacentSpace": true,
      "shortNoticePeriod": false,
      "flexibleTerms": true
    },
    "verificationStatus": "pending",
    "createdAt": "2023-11-25T14:30:00.000Z",
    "updatedAt": "2023-11-25T14:30:00.000Z",
    "isActive": true
  }
}
```

### Error Response
**Code:** 400 BAD REQUEST
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "location.district": "District is required"
  }
}
```

**Code:** 401 UNAUTHORIZED
```json
{
  "status": "error",
  "message": "Authentication required"
}
```

## Usage Example
```typescript
import apiClient from '@/lib/api/api-client';

const createSpace = async (spaceData) => {
  try {
    const response = await apiClient.post('/api/v1/spaces', spaceData);
    return response.data;
  } catch (error) {
    console.error('Error creating space:', error);
    throw error;
  }
};
```

## Notes
- Space creation requires authentication
- All new spaces start with 'pending' verification status
- Spaces must be verified by admin before becoming visible to searchers
- At least one amenity and one security feature are required
- Location must include the district (e.g., "Schwabing") for filtering