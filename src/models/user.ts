export enum UserType {
  CORPORATE = 'corporate',
  STARTUP = 'startup',
}

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  OWNER = 'owner',
  GUEST = 'guest',
}

export enum ComplianceLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  ENTERPRISE = 'enterprise',
  ENTERPRISE_PLUS = 'enterprise_plus',
}

// Base user interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  role: UserRole;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  isVerified: boolean;
  profileImage?: string;
}

// Company interface (shared between corporate and startup)
export interface BaseCompany {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  complianceLevel: ComplianceLevel;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Corporate-specific company information
export interface CorporateCompany extends BaseCompany {
  type: UserType.CORPORATE;
  industryType: string;
  employeeCount: number;
  innovationTeamSize: number;
  innovationFocus: string[];
  mainOfficeLocation?: string;
  complianceOfficer?: {
    name: string;
    email: string;
    phone?: string;
  };
  verifiedEnterprise: boolean;
}

// Startup-specific company information
export interface StartupCompany extends BaseCompany {
  type: UserType.STARTUP;
  industryType: string;
  employeeCount: number;
  foundedYear: number;
  fundingStage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c+' | 'bootstrapped';
  fundingAmount?: number;
  technologyStack: string[];
  solutionCategory: string[];
  targetEnterprises: string[];
  growthProjection?: {
    sixMonths: number;
    twelveMonths: number;
    eighteenMonths: number;
  };
}

// Corporate user profile
export interface CorporateUser extends User {
  userType: UserType.CORPORATE;
  company: CorporateCompany;
  department: string;
  position: string;
  innovationInitiatives?: string[];
  seekingPartnerships?: boolean;
  connectionPreferences?: {
    startupStage?: ('pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c+')[];
    industryFocus?: string[];
    technologyInterests?: string[];
  };
}

// Startup user profile
export interface StartupUser extends User {
  userType: UserType.STARTUP;
  company: StartupCompany;
  position: string;
  linkedInProfile?: string;
  growthGoals?: string[];
  seekingCorporatePartners?: boolean;
  connectionPreferences?: {
    corporateIndustries?: string[];
    innovationTypes?: string[];
    partnershipGoals?: string[];
  };
}
