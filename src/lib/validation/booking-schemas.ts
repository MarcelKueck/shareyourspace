import { z } from 'zod';
import { BookingDuration } from '@/models/space';
import { BookingStatus, PaymentStatus } from '@/models/booking';

export const bookingCreateSchema = z
  .object({
    spaceId: z.string().min(1, 'Space ID is required'),
    durationType: z.nativeEnum(BookingDuration, {
      errorMap: () => ({ message: 'Please select a duration type' }),
    }),
    startDate: z.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Start date is invalid',
    }),
    endDate: z.date({
      required_error: 'End date is required',
      invalid_type_error: 'End date is invalid',
    }),
    occupants: z
      .array(
        z.object({
          userId: z.string().optional(),
          name: z.string().min(1, 'Name is required'),
          email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
        })
      )
      .min(1, 'At least one occupant is required'),
    growthOptionsSelected: z
      .object({
        requiresExpansionSpace: z.boolean(),
        additionalCapacityNeeded: z.number().optional(),
        flexibleTermsRequested: z.boolean().optional(),
      })
      .optional(),
    notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
    isRecurring: z.boolean(),
    recurringPattern: z.enum(['daily', 'weekly', 'monthly']).optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      if (data.isRecurring && !data.recurringPattern) {
        return false;
      }
      return true;
    },
    {
      message: 'Recurring pattern is required for recurring bookings',
      path: ['recurringPattern'],
    }
  );

export const bookingUpdateSchema = z.object({
  bookingStatus: z.nativeEnum(BookingStatus, {
    errorMap: () => ({ message: 'Please select a booking status' }),
  }),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  cancellationReason: z.string().max(500, 'Reason cannot exceed 500 characters').optional(),
});

export type BookingCreateFormValues = z.infer<typeof bookingCreateSchema>;
export type BookingUpdateFormValues = z.infer<typeof bookingUpdateSchema>;

// src/lib/validation/compliance-schemas.ts
import { z } from 'zod';
import { ComplianceRequirementType, ComplianceRequirementStatus } from '@/models/compliance';

export const complianceDocumentSchema = z.object({
  documentType: z.enum(
    ['data_privacy', 'security_certificate', 'insurance', 'terms_of_use', 'covid_safety'],
    {
      errorMap: () => ({ message: 'Please select a document type' }),
    }
  ),
  file: z
    .instanceof(File, { message: 'Please upload a file' })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB
      { message: 'File size cannot exceed 5MB' }
    )
    .refine((file) => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type), {
      message: 'File must be PDF, JPEG, or PNG',
    }),
  expiryDate: z.date().optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export const complianceVerificationSchema = z.object({
  status: z.enum(['verified', 'rejected', 'pending'], {
    errorMap: () => ({ message: 'Please select a verification status' }),
  }),
  verifierNotes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type ComplianceDocumentFormValues = z.infer<typeof complianceDocumentSchema>;
export type ComplianceVerificationFormValues = z.infer<typeof complianceVerificationSchema>;
