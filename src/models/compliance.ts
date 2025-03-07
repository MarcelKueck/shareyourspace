import { ComplianceLevel } from './user';

export enum ComplianceRequirementType {
  DATA_PROTECTION = 'data_protection',
  SECURITY = 'security',
  LEGAL = 'legal',
  INSURANCE = 'insurance',
  FACILITY = 'facility',
}

export enum ComplianceRequirementStatus {
  REQUIRED = 'required',
  OPTIONAL = 'optional',
  RECOMMENDED = 'recommended',
}

export interface ComplianceRequirement {
  id: string;
  type: ComplianceRequirementType;
  name: string;
  description: string;
  complianceLevel: ComplianceLevel[];
  status: ComplianceRequirementStatus;
  documentationType:
    | 'certificate'
    | 'policy'
    | 'self_assessment'
    | 'third_party_verification'
    | 'legal_contract';
  verificationProcess: 'automatic' | 'manual_review' | 'third_party';
  regulationReference?: string; // e.g., "GDPR Article 25" or "ISO 27001"
  germanLawReference?: string; // e.g., "BDSG §42a"
}

export interface CompanyComplianceStatus {
  id: string;
  companyId: string;
  requirementId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'verified' | 'rejected';
  documentUrl?: string;
  verifierNotes?: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpaceComplianceStatus {
  id: string;
  spaceId: string;
  requirementId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'verified' | 'rejected';
  documentUrl?: string;
  verifierNotes?: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
