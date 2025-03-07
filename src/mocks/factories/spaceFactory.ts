import { faker } from '@faker-js/faker';
import {
  Space,
  SpaceType,
  SpaceAmenity,
  SecurityFeature,
  BookingDuration,
  SpaceAvailability,
  GrowthOptions,
  ComplianceDocument,
} from '@/models/space';
import { UserType, ComplianceLevel } from '@/models/user';

// Create a mock space availability
export const createMockSpaceAvailability = (
  spaceId: string,
  overrides?: Partial<SpaceAvailability>
): SpaceAvailability => {
  const id = overrides?.id || `availability-${faker.string.nanoid(10)}`;
  const startDate = overrides?.startDate || faker.date.soon();

  // Calculate end date based on duration
  const durationType = overrides?.durationType || BookingDuration.MONTHLY;
  let endDate = overrides?.endDate;

  if (!endDate) {
    endDate = new Date(startDate);

    switch (durationType) {
      case BookingDuration.HOURLY:
        endDate.setHours(endDate.getHours() + 1);
        break;
      case BookingDuration.DAILY:
        endDate.setDate(endDate.getDate() + 1);
        break;
      case BookingDuration.WEEKLY:
        endDate.setDate(endDate.getDate() + 7);
        break;
      case BookingDuration.MONTHLY:
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case BookingDuration.QUARTERLY:
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case BookingDuration.BIANNUAL:
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case BookingDuration.ANNUAL:
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }
  }

  const currencies = ['EUR', 'USD', 'GBP'];

  return {
    id,
    spaceId,
    durationType,
    startDate,
    endDate,
    pricePerUnit: overrides?.pricePerUnit || faker.number.int({ min: 500, max: 5000 }),
    currency: overrides?.currency || faker.helpers.arrayElement(currencies),
    minBookingUnits: overrides?.minBookingUnits || 1,
    maxBookingUnits: overrides?.maxBookingUnits || faker.number.int({ min: 3, max: 12 }),
    isAvailable: overrides?.isAvailable ?? true,
    discountPercentage:
      overrides?.discountPercentage ||
      (Math.random() > 0.7 ? faker.number.int({ min: 5, max: 20 }) : undefined),
  };
};

// Create a mock compliance document
export const createMockComplianceDocument = (
  spaceId: string,
  overrides?: Partial<ComplianceDocument>
): ComplianceDocument => {
  const id = overrides?.id || `document-${faker.string.nanoid(10)}`;

  const documentTypes = [
    'data_privacy',
    'security_certificate',
    'insurance',
    'terms_of_use',
    'covid_safety',
  ];

  return {
    id,
    spaceId,
    documentType: overrides?.documentType || faker.helpers.arrayElement(documentTypes),
    documentUrl: overrides?.documentUrl || faker.image.url(),
    expiryDate: overrides?.expiryDate || faker.date.future(),
    isVerified: overrides?.isVerified ?? Math.random() > 0.3,
    verifiedAt: overrides?.verifiedAt || (Math.random() > 0.3 ? faker.date.recent() : undefined),
    uploadedBy: overrides?.uploadedBy || `user-${faker.string.nanoid(10)}`,
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
  };
};

// Create a mock space
export const createMockSpace = (overrides?: Partial<Space>): Space => {
  const id = overrides?.id || `space-${faker.string.nanoid(10)}`;

  const districts = ['Schwabing', 'Maxvorstadt', 'Glockenbachviertel', 'Sendling', 'Haidhausen'];

  // Create growth options
  const growthOptions: GrowthOptions = overrides?.growthOptions || {
    hasExpansionSpace: Math.random() > 0.5,
    maxAdditionalCapacity: faker.number.int({ min: 5, max: 20 }),
    adjacentSpace: Math.random() > 0.5,
    shortNoticePeriod: Math.random() > 0.7,
    flexibleTerms: Math.random() > 0.3,
  };

  // Create availabilities
  const availabilities: SpaceAvailability[] = overrides?.availabilities || [
    createMockSpaceAvailability(id, { durationType: BookingDuration.MONTHLY }),
    createMockSpaceAvailability(id, { durationType: BookingDuration.QUARTERLY }),
    createMockSpaceAvailability(id, { durationType: BookingDuration.BIANNUAL }),
  ];

  // Create compliance documents
  const complianceDocuments: ComplianceDocument[] = overrides?.complianceDocuments || [
    createMockComplianceDocument(id, { documentType: 'data_privacy' }),
    createMockComplianceDocument(id, { documentType: 'security_certificate' }),
  ];

  return {
    id,
    name: overrides?.name || faker.company.name() + ' Office Space',
    description: overrides?.description || faker.lorem.paragraph(3),
    ownerId: overrides?.ownerId || `user-${faker.string.nanoid(10)}`,
    ownerType:
      overrides?.ownerType || (Math.random() > 0.5 ? UserType.CORPORATE : UserType.STARTUP),
    companyId: overrides?.companyId || `company-${faker.string.nanoid(10)}`,
    spaceType: overrides?.spaceType || faker.helpers.enumValue(SpaceType),
    capacity: overrides?.capacity || faker.number.int({ min: 5, max: 50 }),
    size: overrides?.size || faker.number.int({ min: 50, max: 500 }),
    location: overrides?.location || {
      street: faker.location.streetAddress(),
      city: 'Munich',
      postalCode: faker.location.zipCode('####'),
      country: 'Germany',
      district: faker.helpers.arrayElement(districts),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    images:
      overrides?.images ||
      Array(faker.number.int({ min: 3, max: 8 }))
        .fill(null)
        .map((_, i) => `/mock/spaces/space-${id}-${i + 1}.jpg`),
    floorPlan:
      overrides?.floorPlan ||
      (Math.random() > 0.3 ? `/mock/spaces/floorplan-${id}.jpg` : undefined),
    virtualTour:
      overrides?.virtualTour ||
      (Math.random() > 0.7 ? `https://example.com/tour/${id}` : undefined),
    amenities:
      overrides?.amenities ||
      faker.helpers.arrayElements(
        Object.values(SpaceAmenity),
        faker.number.int({ min: 3, max: 10 })
      ),
    securityFeatures:
      overrides?.securityFeatures ||
      faker.helpers.arrayElements(
        Object.values(SecurityFeature),
        faker.number.int({ min: 2, max: 8 })
      ),
    complianceLevel: overrides?.complianceLevel || faker.helpers.enumValue(ComplianceLevel),
    complianceDocuments,
    availabilities,
    preferredBookingDuration:
      overrides?.preferredBookingDuration ||
      faker.helpers.arrayElements(
        [BookingDuration.MONTHLY, BookingDuration.QUARTERLY, BookingDuration.BIANNUAL],
        faker.number.int({ min: 1, max: 3 })
      ),
    minimumBookingDuration: overrides?.minimumBookingDuration || BookingDuration.MONTHLY,
    isFeatured: overrides?.isFeatured ?? Math.random() > 0.8,
    rating: overrides?.rating || faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
    reviewCount: overrides?.reviewCount || faker.number.int({ min: 0, max: 50 }),
    growthOptions,
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
    isActive: overrides?.isActive ?? true,
    verificationStatus: overrides?.verificationStatus || 'verified',
  };
};

// Generate an array of spaces
export const generateMockSpaces = (count: number): Space[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => createMockSpace({ id: `space-${index + 1}` }));
};
