shareyourspace/
├── public/                     # Static files
│   ├── images/                 # Image assets
│   └── icons/                  # Icon assets
├── src/                        # Source code
│   ├── app/                    # App router directory (Next.js 14+)
│   │   ├── api/                # API routes
│   │   ├── auth/               # Authentication routes
│   │   │   ├── login/          # Login pages
│   │   │   ├── register/       # Registration pages
│   │   │   └── reset/          # Password reset pages
│   │   ├── dashboard/          # Dashboard routes
│   │   │   ├── corporate/      # Corporate dashboard
│   │   │   └── startup/        # Startup dashboard 
│   │   ├── innovationmatch/    # InnovationMatch platform
│   │   ├── spaces/             # Space management
│   │   │   ├── create/         # Space creation
│   │   │   ├── manage/         # Space management
│   │   │   └── search/         # Space search
│   │   ├── bookings/           # Booking management
│   │   ├── compliance/         # Compliance center
│   │   ├── assistant/          # ShareYourSpace Assistant
│   │   ├── profile/            # User profiles
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable components
│   │   ├── common/             # Common components
│   │   ├── layouts/            # Layout components
│   │   │   ├── MainLayout.tsx  # Main layout
│   │   │   ├── AuthLayout.tsx  # Auth layout
│   │   │   ├── DashboardLayout.tsx # Dashboard layout
│   │   │   └── MarketplaceLayout.tsx # Marketplace layout
│   │   ├── auth/               # Auth components
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── corporate/      # Corporate-specific components
│   │   │   └── startup/        # Startup-specific components
│   │   ├── spaces/             # Space components
│   │   ├── bookings/           # Booking components
│   │   ├── compliance/         # Compliance components
│   │   ├── assistant/          # Assistant components
│   │   ├── innovationmatch/    # InnovationMatch components
│   │   └── ui/                 # UI components (buttons, inputs, etc.)
│   ├── contexts/               # React context
│   │   ├── AuthContext.tsx     # Authentication context
│   │   ├── UserContext.tsx     # User context (corporate/startup)
│   │   └── AssistantContext.tsx # Assistant context
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utility functions
│   │   ├── api.ts              # API utilities
│   │   ├── auth.ts             # Auth utilities
│   │   └── validation.ts       # Form validation
│   ├── models/                 # Data models/types
│   │   ├── user.ts             # User types
│   │   ├── space.ts            # Space types
│   │   ├── booking.ts          # Booking types
│   │   └── compliance.ts       # Compliance types
│   ├── services/               # Service layer
│   │   ├── authService.ts      # Auth service
│   │   ├── spaceService.ts     # Space service
│   │   ├── bookingService.ts   # Booking service
│   │   ├── complianceService.ts # Compliance service
│   │   └── matchingService.ts  # Matching service
│   └── styles/                 # Global styles
│       └── globals.css         # Global CSS (Tailwind imports)
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── package.json                # NPM package config
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
└── README.md                   # Project documentation