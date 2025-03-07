import { z } from 'zod';
import { SpaceType, BookingDuration, SpaceAmenity, SecurityFeature } from '@/models/space';
import { ComplianceLevel } from '@/models/user';

export const spaceBaseSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name is too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description is too long'),
  spaceType: z.nativeEnum(SpaceType, {
    errorMap: () => ({ message: 'Please select a space type' }),
  }),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  size: z.number().min(1, 'Size must be at least 1 square meter'),
  location: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    district: z.string().min(1, 'District is required'),
  }),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  amenities: z.array(z.nativeEnum(SpaceAmenity)).min(1, 'At least one amenity is required'),
  securityFeatures: z
    .array(z.nativeEnum(SecurityFeature))
    .min(1, 'At least one security feature is required'),
  complianceLevel: z.nativeEnum(ComplianceLevel, {
    errorMap: () => ({ message: 'Please select a compliance level' }),
  }),
  preferredBookingDuration: z
    .array(z.nativeEnum(BookingDuration))
    .min(1, 'At least one preferred booking duration is required'),
  minimumBookingDuration: z.nativeEnum(BookingDuration, {
    errorMap: () => ({ message: 'Please select a minimum booking duration' }),
  }),
  growthOptions: z.object({
    hasExpansionSpace: z.boolean(),
    maxAdditionalCapacity: z.number().optional(),
    adjacentSpace: z.boolean().optional(),
    shortNoticePeriod: z.boolean().optional(),
    flexibleTerms: z.boolean().optional(),
  }),
});

export const spaceAvailabilitySchema = z
  .object({
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
    pricePerUnit: z.number().min(1, 'Price must be at least 1'),
    currency: z.enum(['EUR', 'USD', 'GBP'], {
      errorMap: () => ({ message: 'Please select a currency' }),
    }),
    minBookingUnits: z.number().min(1, 'Minimum booking units must be at least 1'),
    maxBookingUnits: z.number().optional(),
    isAvailable: z.boolean(),
    discountPercentage: z
      .number()
      .min(0, 'Discount must be non-negative')
      .max(100, 'Discount cannot exceed 100%')
      .optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

export const spaceCreateSchema = spaceBaseSchema.extend({
  availabilities: z.array(spaceAvailabilitySchema).optional(),
});

export type SpaceCreateFormValues = z.infer<typeof spaceCreateSchema>;
export type SpaceAvailabilityFormValues = z.infer<typeof spaceAvailabilitySchema>;
