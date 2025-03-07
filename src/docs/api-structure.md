# ShareYourSpace API Structure

Our API is structured to support the five network effects strategy while providing enterprise-grade security and compliance.

## Base URL
All API endpoints are prefixed with `/api/v1`.

## Authentication Endpoints

### User Authentication
- `POST /api/v1/auth/register` - Register new user (corporate or startup)
- `POST /api/v1/auth/login` - Authenticate user
- `POST /api/v1/auth/logout` - Log out user
- `POST /api/v1/auth/refresh-token` - Refresh JWT token
- `POST /api/v1/auth/forgot-password` - Initiate password reset
- `POST /api/v1/auth/reset-password` - Complete password reset
- `POST /api/v1/auth/verify-email` - Verify user email

### User Management
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `GET /api/v1/users/:id` - Get user by ID (with appropriate permissions)
- `GET /api/v1/companies/:id` - Get company by ID

## Space Management Endpoints

### Space Provider Endpoints
- `POST /api/v1/spaces` - Create new space
- `GET /api/v1/spaces/provider` - List spaces owned by provider
- `GET /api/v1/spaces/:id` - Get space details
- `PUT /api/v1/spaces/:id` - Update space details
- `DELETE /api/v1/spaces/:id` - Deactivate space
- `POST /api/v1/spaces/:id/availability` - Add availability period
- `PUT /api/v1/spaces/:id/availability/:availabilityId` - Update availability
- `DELETE /api/v1/spaces/:id/availability/:availabilityId` - Remove availability

### Space Seeker Endpoints
- `GET /api/v1/spaces` - Search spaces with filters
- `GET /api/v1/spaces/recommended` - Get recommended spaces based on profile
- `GET /api/v1/spaces/districts` - Get information about districts/neighborhoods
- `POST /api/v1/spaces/:id/tour` - Request a tour of a space

## Booking Endpoints

### Booking Management
- `POST /api/v1/bookings` - Create booking request
- `GET /api/v1/bookings` - List bookings (as requester or provider)
- `GET /api/v1/bookings/:id` - Get booking details
- `PUT /api/v1/bookings/:id/status` - Update booking status
- `POST /api/v1/bookings/:id/contract` - Generate contract
- `PUT /api/v1/bookings/:id/contract/sign` - Sign contract
- `GET /api/v1/bookings/calendar` - Get booking calendar

## Compliance Endpoints

### Compliance Management
- `GET /api/v1/compliance/requirements` - List compliance requirements
- `GET /api/v1/compliance/company-status` - Get company compliance status
- `POST /api/v1/compliance/documents` - Upload compliance document
- `GET /api/v1/compliance/documents` - List compliance documents
- `GET /api/v1/compliance/verification/:id` - Get verification status
- `PUT /api/v1/compliance/verification/:id` - Update verification status (admin)

## InnovationMatch Endpoints

### Matching and Connections
- `GET /api/v1/connections` - List connections
- `POST /api/v1/connections` - Create connection request
- `PUT /api/v1/connections/:id` - Update connection status
- `GET /api/v1/recommendations` - Get recommended connections
- `GET /api/v1/recommendations/spaces` - Get space recommendations
- `POST /api/v1/matching/preferences` - Set matching preferences
- `GET /api/v1/matching/preferences` - Get matching preferences

### Meetings and Collaboration
- `POST /api/v1/meetings` - Schedule a meeting
- `GET /api/v1/meetings` - List meetings
- `PUT /api/v1/meetings/:id` - Update meeting details
- `POST /api/v1/projects` - Create collaboration project
- `GET /api/v1/projects` - List collaboration projects

## Assistant Endpoints

### ShareYourSpace Assistant
- `POST /api/v1/assistant/message` - Send message to assistant
- `GET /api/v1/assistant/history` - Get conversation history
- `POST /api/v1/assistant/actions/book` - Book space through assistant
- `POST /api/v1/assistant/actions/connect` - Create connection through assistant
- `POST /api/v1/assistant/actions/schedule` - Schedule meeting through assistant

## Analytics Endpoints

### Network Analytics
- `GET /api/v1/analytics/network/density` - Get network density metrics
- `GET /api/v1/analytics/network/growth` - Get network growth metrics
- `GET /api/v1/analytics/spaces/utilization` - Get space utilization analytics
- `GET /api/v1/analytics/connections/effectiveness` - Get connection effectiveness metrics

## Admin Endpoints

### Platform Administration
- `GET /api/v1/admin/users` - List all users (admin only)
- `GET /api/v1/admin/spaces` - List all spaces (admin only)
- `PUT /api/v1/admin/spaces/:id/verify` - Verify space (admin only)
- `GET /api/v1/admin/companies` - List all companies (admin only)
- `PUT /api/v1/admin/companies/:id/verify` - Verify company (admin only)