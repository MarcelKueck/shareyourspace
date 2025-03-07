import { faker } from '@faker-js/faker';
import {
  User,
  UserType,
  UserRole,
  ComplianceLevel,
  CorporateUser,
  StartupUser,
  CorporateCompany,
  StartupCompany,
} from '@/models/user';

// Helper function to create a basic user
export const createMockUser = (overrides?: Partial<User>): User => {
  const id = overrides?.id || `user-${faker.string.nanoid(10)}`;

  return {
    id,
    email: overrides?.email || faker.internet.email(),
    firstName: overrides?.firstName || faker.person.firstName(),
    lastName: overrides?.lastName || faker.person.lastName(),
    userType: overrides?.userType || (Math.random() > 0.5 ? UserType.CORPORATE : UserType.STARTUP),
    role: overrides?.role || UserRole.MEMBER,
    companyId: overrides?.companyId || `company-${faker.string.nanoid(10)}`,
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
    lastLogin: overrides?.lastLogin || faker.date.recent(),
    isActive: overrides?.isActive ?? true,
    isVerified: overrides?.isVerified ?? true,
    profileImage: overrides?.profileImage || faker.image.avatar(),
  };
};

// Create a corporate company
export const createMockCorporateCompany = (
  overrides?: Partial<CorporateCompany>
): CorporateCompany => {
  const id = overrides?.id || `company-corp-${faker.string.nanoid(10)}`;

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Manufacturing',
    'Automotive',
    'Insurance',
    'Telecommunications',
    'Energy',
  ];

  const innovationFocusAreas = [
    'AI',
    'Blockchain',
    'IoT',
    'Big Data',
    'Cloud Computing',
    'Sustainability',
    'Digital Transformation',
    'Cybersecurity',
    'Fintech',
    'HealthTech',
    'Industry 4.0',
    'Smart Cities',
  ];

  return {
    id,
    name: overrides?.name || faker.company.name(),
    type: UserType.CORPORATE,
    logo: overrides?.logo || faker.image.url(),
    website: overrides?.website || faker.internet.url(),
    address: overrides?.address || {
      street: faker.location.streetAddress(),
      city: 'Munich',
      postalCode: faker.location.zipCode('####'),
      country: 'Germany',
    },
    industryType: overrides?.industryType || faker.helpers.arrayElement(industries),
    employeeCount: overrides?.employeeCount || faker.number.int({ min: 500, max: 50000 }),
    innovationTeamSize: overrides?.innovationTeamSize || faker.number.int({ min: 5, max: 50 }),
    innovationFocus:
      overrides?.innovationFocus ||
      faker.helpers.arrayElements(innovationFocusAreas, faker.number.int({ min: 2, max: 5 })),
    mainOfficeLocation: overrides?.mainOfficeLocation || 'Munich',
    complianceOfficer: overrides?.complianceOfficer || {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    verifiedEnterprise: overrides?.verifiedEnterprise ?? true,
    complianceLevel: overrides?.complianceLevel || faker.helpers.enumValue(ComplianceLevel),
    verificationStatus: overrides?.verificationStatus || 'verified',
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
  };
};

// Create a startup company
export const createMockStartupCompany = (overrides?: Partial<StartupCompany>): StartupCompany => {
  const id = overrides?.id || `company-startup-${faker.string.nanoid(10)}`;

  const industries = [
    'SaaS',
    'FinTech',
    'HealthTech',
    'AI',
    'Cybersecurity',
    'CleanTech',
    'EdTech',
    'IoT',
    'MarTech',
    'InsurTech',
  ];

  const fundingStages = ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c+', 'bootstrapped'];

  const technologies = [
    'AI/ML',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Kubernetes',
    'Blockchain',
    'TensorFlow',
    'Flutter',
    'Serverless',
    'BigData',
    'DevOps',
    'IoT',
    'Data Science',
    'Cloud Native',
  ];

  const solutionCategories = [
    'Enterprise Software',
    'Security',
    'Analytics',
    'Productivity',
    'Automation',
    'Customer Experience',
    'Collaboration',
    'Integration',
    'Infrastructure',
    'Compliance',
    'HR Tech',
    'Marketing Tech',
  ];

  return {
    id,
    name: overrides?.name || faker.company.name(),
    type: UserType.STARTUP,
    logo: overrides?.logo || faker.image.url(),
    website: overrides?.website || faker.internet.url(),
    address: overrides?.address || {
      street: faker.location.streetAddress(),
      city: 'Munich',
      postalCode: faker.location.zipCode('####'),
      country: 'Germany',
    },
    industryType: overrides?.industryType || faker.helpers.arrayElement(industries),
    employeeCount: overrides?.employeeCount || faker.number.int({ min: 5, max: 100 }),
    foundedYear:
      overrides?.foundedYear || faker.number.int({ min: 2015, max: new Date().getFullYear() }),
    fundingStage: overrides?.fundingStage || faker.helpers.arrayElement(fundingStages),
    fundingAmount: overrides?.fundingAmount || faker.number.int({ min: 500000, max: 15000000 }),
    technologyStack:
      overrides?.technologyStack ||
      faker.helpers.arrayElements(technologies, faker.number.int({ min: 3, max: 8 })),
    solutionCategory:
      overrides?.solutionCategory ||
      faker.helpers.arrayElements(solutionCategories, faker.number.int({ min: 1, max: 3 })),
    targetEnterprises: overrides?.targetEnterprises || ['Large Enterprises', 'Mid-Market', 'SMEs'],
    growthProjection: overrides?.growthProjection || {
      sixMonths: faker.number.int({ min: 5, max: 20 }),
      twelveMonths: faker.number.int({ min: 15, max: 50 }),
      eighteenMonths: faker.number.int({ min: 30, max: 100 }),
    },
    complianceLevel: overrides?.complianceLevel || faker.helpers.enumValue(ComplianceLevel),
    verificationStatus: overrides?.verificationStatus || 'verified',
    createdAt: overrides?.createdAt || faker.date.past(),
    updatedAt: overrides?.updatedAt || faker.date.recent(),
  };
};

// Create a corporate user
export const createMockCorporateUser = (overrides?: Partial<CorporateUser>): CorporateUser => {
  const baseUser = createMockUser({
    ...overrides,
    userType: UserType.CORPORATE,
  });

  const departments = [
    'Innovation',
    'R&D',
    'Digital Transformation',
    'Strategy',
    'IT',
    'Business Development',
    'Product Development',
    'Marketing',
  ];

  const positions = [
    'Innovation Manager',
    'Head of Digital Transformation',
    'CTO',
    'Innovation Lead',
    'Technology Strategist',
    'Digital Innovation Director',
    'Head of R&D',
    'Innovation Architect',
    'Digital Lab Lead',
  ];

  const initiatives = [
    'Open Innovation',
    'Digital Transformation',
    'Industry 4.0',
    'AI Integration',
    'Startup Collaboration',
    'Corporate Venturing',
    'Employee Innovation',
    'Sustainability Innovation',
    'Customer-Centric Innovation',
  ];

  const company =
    overrides?.company ||
    createMockCorporateCompany({
      id: baseUser.companyId,
    });

  return {
    ...baseUser,
    userType: UserType.CORPORATE,
    company,
    department: overrides?.department || faker.helpers.arrayElement(departments),
    position: overrides?.position || faker.helpers.arrayElement(positions),
    innovationInitiatives:
      overrides?.innovationInitiatives ||
      faker.helpers.arrayElements(initiatives, faker.number.int({ min: 1, max: 4 })),
    seekingPartnerships: overrides?.seekingPartnerships ?? true,
    connectionPreferences: overrides?.connectionPreferences || {
      startupStage: ['seed', 'series-a'],
      industryFocus: ['AI', 'IoT', 'Sustainability'],
      technologyInterests: ['AI/ML', 'Cloud Native', 'Data Science'],
    },
  };
};

// Create a startup user
export const createMockStartupUser = (overrides?: Partial<StartupUser>): StartupUser => {
  const baseUser = createMockUser({
    ...overrides,
    userType: UserType.STARTUP,
  });

  const positions = [
    'CEO',
    'CTO',
    'CPO',
    'COO',
    'CMO',
    'Co-Founder',
    'Head of Business Development',
    'Head of Sales',
    'VP of Product',
    'VP of Engineering',
    'Technical Lead',
  ];

  const growthGoals = [
    'Enterprise Customer Acquisition',
    'International Expansion',
    'Product Development',
    'Team Growth',
    'Series A Funding',
    'Series B Funding',
    'Strategic Partnerships',
    'Market Expansion',
  ];

  const company =
    overrides?.company ||
    createMockStartupCompany({
      id: baseUser.companyId,
    });

  return {
    ...baseUser,
    userType: UserType.STARTUP,
    company,
    position: overrides?.position || faker.helpers.arrayElement(positions),
    linkedInProfile:
      overrides?.linkedInProfile || `https://linkedin.com/in/${faker.internet.userName()}`,
    growthGoals:
      overrides?.growthGoals ||
      faker.helpers.arrayElements(growthGoals, faker.number.int({ min: 2, max: 5 })),
    seekingCorporatePartners: overrides?.seekingCorporatePartners ?? true,
    connectionPreferences: overrides?.connectionPreferences || {
      corporateIndustries: ['Technology', 'Finance', 'Automotive'],
      innovationTypes: ['Open Innovation', 'Corporate Venturing'],
      partnershipGoals: ['Customer Acquisition', 'Co-Development', 'Industry Expertise'],
    },
  };
};

// Generate an array of users with a mix of corporate and startup users
export const generateMockUsers = (count: number): (CorporateUser | StartupUser)[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const id = `user-${index + 1}`;
      const companyId = `company-${index + 1}`;

      if (index % 2 === 0) {
        return createMockCorporateUser({ id, companyId });
      } else {
        return createMockStartupUser({ id, companyId });
      }
    });
};
