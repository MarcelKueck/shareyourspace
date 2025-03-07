import { UserType } from './user';

export enum ConnectionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  BLOCKED = 'blocked',
}

export enum ConnectionType {
  BUSINESS = 'business',
  INNOVATION = 'innovation',
  MENTORSHIP = 'mentorship',
  INVESTMENT = 'investment',
  SPACE_SHARING = 'space_sharing',
}

export interface Connection {
  id: string;
  initiatorId: string;
  initiatorType: UserType;
  initiatorCompanyId: string;
  recipientId: string;
  recipientType: UserType;
  recipientCompanyId: string;
  status: ConnectionStatus;
  connectionType: ConnectionType[];
  message?: string;
  matchPercentage: number;
  matchReasons: string[];
  responseMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  lastInteractionDate?: Date;
}

export interface Meeting {
  id: string;
  connectionId: string;
  scheduledBy: string;
  scheduledWithId: string;
  scheduledDate: Date;
  duration: number; // minutes
  location: 'virtual' | 'in_person';
  locationDetails?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  outcome?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollaborationProject {
  id: string;
  name: string;
  description: string;
  participants: {
    userId: string;
    companyId: string;
    role: string;
  }[];
  status: 'proposed' | 'active' | 'completed' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
  goals: string[];
  outcomes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchingPreference {
  id: string;
  userId: string;
  companyId: string;
  userType: UserType;
  industryPreferences: string[];
  technologyInterests: string[];
  partnershipGoals: string[];
  excludedCompanyIds?: string[];
  priorityMatching: boolean;
  createdAt: Date;
  updatedAt: Date;
}
