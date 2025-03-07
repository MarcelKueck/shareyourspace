import { z } from 'zod';
import { UserType } from '@/models/user';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerBaseSchema = z
  .object({
    email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
      .min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    userType: z.nativeEnum(UserType, {
      errorMap: () => ({ message: 'Please select a user type' }),
    }),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
    invitationCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const corporateCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  industryType: z.string().min(1, 'Industry is required'),
  employeeCount: z.number().min(1, 'Please enter the number of employees'),
  innovationTeamSize: z.number().min(1, 'Please enter the innovation team size'),
  innovationFocus: z.array(z.string()).min(1, 'Please select at least one focus area'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  complianceOfficer: z
    .object({
      name: z.string().min(1, 'Compliance officer name is required'),
      email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
      phone: z.string().optional(),
    })
    .optional(),
});

export const startupCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  industryType: z.string().min(1, 'Industry is required'),
  employeeCount: z.number().min(1, 'Please enter the number of employees'),
  foundedYear: z
    .number()
    .min(2000, 'Please enter a valid year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  fundingStage: z.enum(['pre-seed', 'seed', 'series-a', 'series-b', 'series-c+', 'bootstrapped'], {
    errorMap: () => ({ message: 'Please select a funding stage' }),
  }),
  fundingAmount: z.number().optional(),
  technologyStack: z.array(z.string()).min(1, 'Please select at least one technology'),
  solutionCategory: z.array(z.string()).min(1, 'Please select at least one category'),
  targetEnterprises: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  growthProjection: z
    .object({
      sixMonths: z.number().min(0, 'Value must be positive'),
      twelveMonths: z.number().min(0, 'Value must be positive'),
      eighteenMonths: z.number().min(0, 'Value must be positive'),
    })
    .optional(),
});

export const corporateRegisterSchema = registerBaseSchema.extend({
  userType: z.literal(UserType.CORPORATE),
  company: corporateCompanySchema,
  position: z.string().min(1, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
});

export const startupRegisterSchema = registerBaseSchema.extend({
  userType: z.literal(UserType.STARTUP),
  company: startupCompanySchema,
  position: z.string().min(1, 'Position is required'),
  linkedInProfile: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
});

export type CorporateRegisterFormValues = z.infer<typeof corporateRegisterSchema>;
export type StartupRegisterFormValues = z.infer<typeof startupRegisterSchema>;
