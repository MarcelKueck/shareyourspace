# useSpaces

## Description
A hook for fetching, creating, updating, and deleting spaces. Supports filtering, pagination, and optimistic updates.

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| options | UseSpacesOptions | {} | Configuration options |
| options.district | string | undefined | Filter by district (e.g., "Schwabing") |
| options.spaceType | SpaceType | undefined | Filter by space type |
| options.minCapacity | number | undefined | Filter by minimum capacity |
| options.complianceLevel | ComplianceLevel | undefined | Filter by minimum compliance level |
| options.minDuration | BookingDuration | undefined | Filter by minimum booking duration |
| options.page | number | 1 | Current page number |
| options.limit | number | 10 | Items per page |

## Return Value

| Name | Type | Description |
|------|------|-------------|
| spaces | Space[] | Array of space objects matching the filter criteria |
| totalSpaces | number | Total number of spaces matching the filter (for pagination) |
| isLoading | boolean | True while spaces are being fetched |
| isError | Error | Error object if the request failed, null otherwise |
| createSpace | function | Function to create a new space |
| updateSpace | function | Function to update an existing space |
| deleteSpace | function | Function to delete a space |
| mutate | function | Function to manually refresh data |

## Usage Example

```tsx
import { useSpaces } from '@/hooks/useSpaces';
import { SpaceType, ComplianceLevel } from '@/models/space';

function SpacesList() {
  const { 
    spaces, 
    totalSpaces, 
    isLoading, 
    createSpace 
  } = useSpaces({
    district: 'Schwabing',
    spaceType: SpaceType.OFFICE,
    complianceLevel: ComplianceLevel.ENTERPRISE,
    page: 1,
    limit: 5
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Spaces ({totalSpaces})</h2>
      <ul>
        {spaces.map(space => (
          <li key={space.id}>{space.name}</li>
        ))}
      </ul>
      <button onClick={() => createSpace({ name: 'New Space' })}>
        Add Space
      </button>
    </div>
  );
}
```

## Notes
- Uses SWR internally for data fetching and caching
- Implements optimistic updates for better UX
- Automatically refreshes data when create/update/delete operations are performed
- Supports filtering by multiple criteria simultaneously