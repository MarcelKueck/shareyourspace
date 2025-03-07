# [API Endpoint]

## Description
Brief description of the API endpoint and its purpose.

## Request

### Method
`GET|POST|PUT|DELETE`

### URL
`/api/[endpoint]`

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
  "property1": "value1",
  "property2": "value2"
}
```

## Response

### Success Response
**Code:** 200 OK
```json
{
  "status": "success",
  "data": {
    "property": "value"
  }
}
```

### Error Response
**Code:** 400 BAD REQUEST
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Usage Example
```typescript
const response = await fetch('/api/[endpoint]', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    property1: 'value1',
    property2: 'value2'
  })
});

const data = await response.json();
```

## Notes
Any additional information, authentication requirements, rate limits, etc.