import { z } from 'zod';
import { ConnectionType, ConnectionStatus } from '@/models/matching';
import { UserType } from '@/models/user';

export const matchingPreferenceSchema = z.object({
  industryPreferences: z.array(z.string()).min(1, 'Please select at least one industry'),
  technologyInterests: z.array(z.string()).min(1, 'Please select at least one technology'),
  partnershipGoals: z.array(z.string()).min(1, 'Please select at least one goal'),
  excludedCompanyIds: z.array(z.string()).optional(),
  priorityMatching: z.boolean(),
});

export const connectionCreateSchema = z.object({
  recipientId: z.string().min(1, 'Recipient is required'),
  connectionType: z
    .array(z.nativeEnum(ConnectionType))
    .min(1, 'Please select at least one connection type'),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
});

export const connectionResponseSchema = z.object({
  connectionId: z.string().min(1, 'Connection ID is required'),
  status: z.nativeEnum(ConnectionStatus, {
    errorMap: () => ({ message: 'Please select a response' }),
  }),
  responseMessage: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
});

export const meetingScheduleSchema = z.object({
  connectionId: z.string().min(1, 'Connection ID is required'),
  scheduledWithId: z.string().min(1, 'Meeting participant is required'),
  scheduledDate: z.date({
    required_error: 'Date and time are required',
    invalid_type_error: 'Date and time are invalid',
  }),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  location: z.enum(['virtual', 'in_person'], {
    errorMap: () => ({ message: 'Please select a location type' }),
  }),
  locationDetails: z.string().min(1, 'Location details are required'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type MatchingPreferenceFormValues = z.infer<typeof matchingPreferenceSchema>;
export type ConnectionCreateFormValues = z.infer<typeof connectionCreateSchema>;
export type ConnectionResponseFormValues = z.infer<typeof connectionResponseSchema>;
export type MeetingScheduleFormValues = z.infer<typeof meetingScheduleSchema>;
