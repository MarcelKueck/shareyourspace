# ComplianceBadge

## Description
A badge component that visualizes the compliance level of a space or company. It displays both the level and verification status, with appropriate colors and icons.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| level | ComplianceLevel | undefined | The compliance level to display (basic, standard, enterprise, enterprise_plus) |
| verificationStatus | 'pending' \| 'verified' \| 'rejected' | 'pending' | Current verification status |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the badge |
| showTooltip | boolean | true | Whether to show additional information on hover |
| className | string | undefined | Additional CSS classes |

## Usage Example

```tsx
import { ComplianceBadge } from '@/components/compliance/ComplianceBadge';
import { ComplianceLevel } from '@/models/user';

export default function SpaceCard({ space }) {
  return (
    <div className="card">
      <h3>{space.name}</h3>
      <ComplianceBadge 
        level={space.complianceLevel} 
        verificationStatus={space.verificationStatus} 
        size="sm"
      />
    </div>
  );
}
```

## Notes
- The badge colors are based on the compliance level (basic: gray, standard: blue, enterprise: purple, enterprise_plus: gold)
- Verification states are visualized with icons: pending (clock), verified (checkmark), rejected (warning)
- Tooltip content explains the meaning of each compliance level