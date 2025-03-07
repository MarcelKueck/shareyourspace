import { ComplianceLevel, UserType } from './user';

export enum SpaceType {
  OFFICE = 'office',
  MEETING_ROOM = 'meeting_room',
  EVENT_SPACE = 'event_space',
  DESK = 'desk',
  WORKSHOP_ROOM = 'workshop_room',
}

export enum BookingDuration {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  BIANNUAL = 'biannual',
  ANNUAL = 'annual',
}

export enum SpaceAmenity {
  WIFI = 'wifi',
  PROJECTOR = 'projector',
  WHITEBOARD = 'whiteboard',
  VIDEO_CONFERENCE = 'video_conference',
  KITCHEN = 'kitchen',
  PRINTING = 'printing',
  RECEPTION = 'reception',
  WHEELCHAIR_ACCESSIBLE = 'wheelchair_accessible',
  STANDING_DESKS = 'standing_desks',
  OUTDOOR_AREA = 'outdoor_area',
  PHONE_BOOTH = 'phone_booth',
}

export enum SecurityFeature {
  KEYCARD_ACCESS = 'keycard_access',
  VISITOR_REGISTRATION = 'visitor_registration',
  CCTV = 'cctv',
  SECURITY_PERSONNEL = 'security_personnel',
  NETWORK_ISOLATION = 'network_isolation',
  DATA_COMPLIANCE = 'data_compliance',
  GDPR_COMPLIANT = 'gdpr_compliant',
  NDA_REQUIRED = 'nda_required',
  SECURE_WIFI = 'secure_wifi',
  PRIVATE_VPNS = 'private_vpns',
}

export interface SpaceAvailability {
  id: string;
  spaceId: string;
  durationType: BookingDuration;
  startDate: Date;
  endDate: Date;
  pricePerUnit: number;
  currency: 'EUR' | 'USD' | 'GBP';
  minBookingUnits: number;
  maxBookingUnits?: number;
  isAvailable: boolean;
  discountPercentage?: number;
}

export interface GrowthOptions {
  hasExpansionSpace: boolean;
  maxAdditionalCapacity?: number;
  adjacentSpace?: boolean;
  shortNoticePeriod?: boolean;
  flexibleTerms?: boolean;
}

export interface ComplianceDocument {
  id: string;
  spaceId: string;
  documentType:
    | 'data_privacy'
    | 'security_certificate'
    | 'insurance'
    | 'terms_of_use'
    | 'covid_safety';
  documentUrl: string;
  expiryDate?: Date;
  isVerified: boolean;
  verifiedAt?: Date;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerType: UserType;
  companyId: string;
  spaceType: SpaceType;
  capacity: number;
  size: number; // in square meters
  location: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
    district: string; // e.g., 'Schwabing'
  };
  images: string[];
  floorPlan?: string;
  virtualTour?: string;
  amenities: SpaceAmenity[];
  securityFeatures: SecurityFeature[];
  complianceLevel: ComplianceLevel;
  complianceDocuments: ComplianceDocument[];
  availabilities: SpaceAvailability[];
  preferredBookingDuration: BookingDuration[];
  minimumBookingDuration: BookingDuration;
  isFeatured: boolean;
  rating?: number;
  reviewCount?: number;
  growthOptions: GrowthOptions;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}
