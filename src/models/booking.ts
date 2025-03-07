import { BookingDuration } from './space';
import { UserType } from './user';

export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface Contract {
  id: string;
  bookingId: string;
  contractUrl: string;
  signedByProvider: boolean;
  signedByRequester: boolean;
  providerSignedAt?: Date;
  requesterSignedAt?: Date;
  terms: {
    noticePeriod: number; // in days
    cancellationPolicy: string;
    paymentTerms: string;
    specialConditions?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingOccupant {
  userId: string;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  accessCardIssued: boolean;
  accessCardId?: string;
}

export interface Booking {
  id: string;
  spaceId: string;
  spaceName: string;
  requesterId: string;
  requesterType: UserType;
  requesterCompanyId: string;
  requesterCompanyName: string;
  providerId: string;
  providerType: UserType;
  providerCompanyId: string;
  providerCompanyName: string;
  durationType: BookingDuration;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  currency: 'EUR' | 'USD' | 'GBP';
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  contract?: Contract;
  occupants: BookingOccupant[];
  growthOptionsSelected?: {
    requiresExpansionSpace: boolean;
    additionalCapacityNeeded?: number;
    flexibleTermsRequested?: boolean;
  };
  notes?: string;
  cancellationReason?: string;
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
  createdAt: Date;
  updatedAt: Date;
}
