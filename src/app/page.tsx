import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// UI Components
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Panel, PanelContent } from '@/components/ui/Panel';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { RadioGroup } from '@/components/ui/Radio';
import TabNavigation from '@/components/navigation/TabNavigation';

export default function Home() {
  const [userType, setUserType] = useState('corporate');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !companyName || !companySize) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, this would make an API call to submit the form
    // For now, we'll just simulate a successful submission
    setSubmitted(true);
    setError('');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Enterprise-Grade Office Sharing Platform
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-100">
              Connecting corporate innovation teams with B2B SaaS startups through secure, compliant
              workspace networks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/auth/register?type=corporate">
                <Button size="lg" variant="accent" rounded>
                  Join as Corporate
                </Button>
              </Link>
              <Link href="/auth/register?type=startup">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30"
                  rounded
                >
                  Join as Startup
                </Button>
              </Link>
            </div>
          </div>

          {/* Dual value proposition */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Corporate value prop */}
            <Card className="bg-white/10 border-none shadow-elevated">
              <CardHeader>
                <CardTitle className="text-white">For Corporate Innovation Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Medium-term project spaces (3-6 months) with flexibility to scale
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Rigorous compliance exceeding German data protection standards
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Direct access to innovative B2B SaaS startups through InnovationMatch platform
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/corporate"
                  className="text-accent-300 hover:text-accent-200 flex items-center"
                >
                  Learn more about our corporate solutions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </CardFooter>
            </Card>

            {/* Startup value prop */}
            <Card className="bg-white/10 border-none shadow-elevated">
              <CardHeader>
                <CardTitle className="text-white">For B2B SaaS Startups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Stable, professional office arrangements (6-18 months) with growth flexibility
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      On-demand access to premium meeting spaces for enterprise client presentations
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Direct access to corporate innovation leaders and potential customers
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/startups"
                  className="text-accent-300 hover:text-accent-200 flex items-center"
                >
                  Learn more about our startup solutions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Compliance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              Enterprise-Grade Compliance Framework
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Exceeding German data protection standards with rigorous security verification and
              enterprise-aligned compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-enterprise border-l-4 border-l-primary-600">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  GDPR Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All spaces meet or exceed German GDPR requirements with documented compliance
                  verification and audit trails.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-enterprise border-l-4 border-l-primary-600">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  Network Isolation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enterprise-level network security with isolated connections, ensuring data
                  protection between different tenants.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-enterprise border-l-4 border-l-primary-600">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  Verified Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rigorous verification process with third-party audits ensuring all spaces meet
                  enterprise security requirements.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/compliance">
              <Button variant="outline" size="lg">
                Learn More About Our Compliance Framework
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Medium/Long-Term Booking Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              Strategic Booking Durations
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Focus on medium to long-term arrangements (3-18 months) that align with actual
              business needs, not hourly desk rentals.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Visualization */}
            <div className="hidden md:block h-4 bg-gray-200 rounded-full w-full mb-16 relative">
              {/* Timeline markers */}
              <div className="absolute top-0 left-0 h-full w-1/12 bg-gray-400 rounded-l-full"></div>
              <div className="absolute top-0 left-1/12 h-full w-1/12 bg-gray-400"></div>

              {/* ShareYourSpace Focus Area */}
              <div className="absolute top-0 left-1/6 h-full w-5/6 bg-accent-400 rounded-r-full">
                <div className="absolute -top-10 left-0 text-center text-sm text-accent-700 font-medium">
                  3 Months
                </div>
                <div className="absolute -top-10 left-1/3 text-center text-sm text-accent-700 font-medium">
                  6 Months
                </div>
                <div className="absolute -top-10 left-2/3 text-center text-sm text-accent-700 font-medium">
                  12 Months
                </div>
                <div className="absolute -top-10 right-0 text-center text-sm text-accent-700 font-medium">
                  18 Months
                </div>
              </div>

              {/* Labels */}
              <div className="absolute -bottom-6 left-0 text-xs text-gray-500">Hourly</div>
              <div className="absolute -bottom-6 left-1/12 text-xs text-gray-500">Daily</div>
              <div className="absolute -bottom-6 left-1/6 text-xs text-gray-500">3M</div>
              <div className="absolute -bottom-6 left-1/2 text-xs text-gray-500">9M</div>
              <div className="absolute -bottom-6 right-0 text-xs text-gray-500">18M+</div>

              {/* ShareYourSpace Focus Label */}
              <div className="absolute -bottom-16 left-1/3 right-0 text-center">
                <span className="bg-accent-100 text-accent-800 px-4 py-2 rounded-full font-medium">
                  ShareYourSpace Focus: Medium to Long-Term
                </span>
              </div>

              {/* Generic Coworking Focus Label */}
              <div className="absolute -bottom-16 left-0 w-1/6 text-center">
                <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
                  Generic Coworking
                </span>
              </div>
            </div>

            {/* Mobile version of timeline */}
            <div className="md:hidden space-y-4 mb-12">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Generic Coworking Platforms</h3>
                <p className="text-gray-600">Focus on hourly and daily bookings</p>
              </div>
              <div className="bg-accent-100 p-4 rounded-lg">
                <h3 className="font-medium text-accent-800 mb-2">ShareYourSpace Focus</h3>
                <p className="text-accent-700">Medium to long-term arrangements (3-18 months)</p>
              </div>
            </div>

            {/* Booking Options Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-24">
              <Card className="shadow-enterprise border-t-4 border-t-secondary-400">
                <CardHeader>
                  <CardTitle>Corporate Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">3-6 Months</div>
                  <p className="text-gray-600">
                    Ideal for innovation teams running quarterly projects, with flexibility to scale
                    up or down as needed.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Project-based duration</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Customizable space setup</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Enterprise-aligned contracts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-enterprise border-t-4 border-t-accent-400 transform md:-translate-y-4 md:scale-110 z-10">
                <CardHeader>
                  <CardTitle>B2B SaaS Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent-600 mb-2">6-12 Months</div>
                  <p className="text-gray-600">
                    Perfect for funded B2B startups needing professional space with room to grow as
                    the team expands.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-accent-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Flexible team growth options</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-accent-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Enterprise-ready amenities</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-accent-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Premium client meeting rooms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-enterprise border-t-4 border-t-primary-400">
                <CardHeader>
                  <CardTitle>Strategic Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary-600 mb-2">12-18 Months</div>
                  <p className="text-gray-600">
                    Ideal for established relationships and longer-term strategic collaborations
                    between corporates and startups.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Deep integration options</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Co-branded space options</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">Maximum stability & security</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Network Effects Demonstration */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              Powerful Network Effects
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Every new participant makes the platform substantially more valuable to existing users
              through five core network effects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20 items-center">
            {/* Left Column: Network Effects Explanation */}
            <div>
              <div className="space-y-10">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-primary-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    Two-Sided Marketplace Effects
                  </h3>
                  <p className="text-gray-600">
                    Each corporate space provider makes the platform more valuable to startups, and
                    each startup makes it more valuable to corporates.
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-secondary-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Clustering Effects</h3>
                  <p className="text-gray-600">
                    Complementary businesses in proximity create additional value beyond just the
                    workspace through collaboration opportunities.
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-accent-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-accent-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-accent-900 mb-2">Data Network Effects</h3>
                  <p className="text-gray-600">
                    Each transaction improves our space utilization intelligence, creating better
                    matching and optimization for all users.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Network Visualization */}
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 md:pt-[100%] bg-gray-100 rounded-lg overflow-hidden relative">
                {/* Network Visualization - Schwabing District Map */}
                <div className="absolute inset-0 p-6">
                  <div className="relative h-full w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-gray-100">
                      {/* This would be a map of the Schwabing district */}
                      <div className="h-full w-full flex items-center justify-center">
                        <Image
                          src="/images/network-map.svg"
                          alt="Schwabing District Network Map"
                          width={400}
                          height={400}
                          className="max-w-full"
                        />
                      </div>
                    </div>

                    {/* Nodes representing corporate spaces */}
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-secondary-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-secondary-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-4 h-4 bg-secondary-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-secondary-500 rounded-full animate-pulse"></div>

                    {/* Nodes representing startups */}
                    <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 left-2/3 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>

                    {/* Connections between nodes */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="33%" y1="25%" x2="25%" y2="33%" stroke="#44CFCB" strokeWidth="1" />
                      <line x1="25%" y1="50%" x2="33%" y2="67%" stroke="#44CFCB" strokeWidth="1" />
                      <line x1="50%" y1="75%" x2="67%" y2="75%" stroke="#44CFCB" strokeWidth="1" />
                      <line x1="67%" y1="33%" x2="50%" y2="50%" stroke="#44CFCB" strokeWidth="1" />
                    </svg>

                    <div className="absolute bottom-4 right-4 text-sm text-primary-800 bg-white/80 px-2 py-1 rounded">
                      Schwabing Innovation District
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Corporate Spaces</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-accent-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">B2B Startups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* InnovationMatch Platform */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              InnovationMatch Platform
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Transform workspace sharing into strategic business relationships. Connect with the
              right partners to drive innovation and growth.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-premium overflow-hidden mb-16">
            <div className="md:flex">
              {/* Platform Illustration */}
              <div className="md:w-1/2 bg-primary-900 text-white p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">More Than Just Space</h3>
                <p className="mb-6">
                  InnovationMatch transforms ShareYourSpace from a simple space marketplace into a
                  strategic business network, creating valuable connections between corporate
                  innovation teams and B2B startups.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      AI-powered matching based on business needs and capabilities
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Verified business profiles with compliance credentials
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-accent-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-100">
                      Facilitated introductions and collaborative projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Interface */}
              <div className="md:w-1/2 p-10">
                <div className="bg-white rounded-lg overflow-hidden">
                  {/* Tabs Navigation */}
                  <TabNavigation
                    tabs={[
                      { id: 'corporate', label: 'For Corporates' },
                      { id: 'startup', label: 'For Startups' },
                    ]}
                    activeTab="corporate"
                    orientation="horizontal"
                    variant="underline"
                  />

                  <div className="p-6">
                    {userType === 'corporate' ? (
                      <div className="space-y-6">
                        <h4 className="text-lg font-medium text-primary-900">
                          Discover Innovative B2B Solutions
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">DataFlow AI</h5>
                                <p className="text-sm text-gray-600">
                                  Data processing & analytics solutions
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>92% Match</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">SecureCloud GmbH</h5>
                                <p className="text-sm text-gray-600">
                                  Enterprise security solutions
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>87% Match</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">SupplyGenius</h5>
                                <p className="text-sm text-gray-600">
                                  Supply chain optimization platform
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>84% Match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h4 className="text-lg font-medium text-primary-900">
                          Connect With Corporate Innovation Teams
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">TechCorp Innovation Lab</h5>
                                <p className="text-sm text-gray-600">
                                  AI & Machine Learning initiatives
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>95% Match</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">AutoMotive Ventures</h5>
                                <p className="text-sm text-gray-600">
                                  Mobility and transportation innovation
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>89% Match</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium">FinanceHub Digital Lab</h5>
                                <p className="text-sm text-gray-600">
                                  Financial services transformation
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span>82% Match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/innovationmatch">
              <Button variant="primary" size="lg">
                Learn More About InnovationMatch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Real business outcomes from connections made through our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-enterprise">
              <CardContent className="p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-secondary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-primary-900 mb-1">
                      TechCorp & DataFlow AI
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Enterprise & B2B SaaS Startup</p>
                    <blockquote className="text-gray-600 italic mb-6">
                      "Through ShareYourSpace, we found not just office space but a strategic
                      partner. Working in proximity to DataFlow AI led to a collaboration that
                      improved our data processing efficiency by 45%."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Thomas Weber</p>
                        <p className="text-sm text-gray-500">Innovation Director, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-enterprise">
              <CardContent className="p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-accent-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-primary-900 mb-1">
                      SupplyGenius & LogiCorp
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">B2B SaaS Startup & Enterprise</p>
                    <blockquote className="text-gray-600 italic mb-6">
                      "ShareYourSpace gave us access to enterprise-grade facilities and direct
                      contact with potential clients. Within 6 months, we secured a major contract
                      with LogiCorp that doubled our annual revenue."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Julia Schmidt</p>
                        <p className="text-sm text-gray-500">CEO, SupplyGenius</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Exclusive, Invitation-Only Access
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-100">
              Join our waiting list to get early access to ShareYourSpace. We're carefully curating
              our network for maximum value.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-premium p-8 max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  Thank you for your interest!
                </h3>
                <p className="text-gray-600 mb-8">
                  We've received your application for the waiting list. We'll review your submission
                  and get back to you shortly with next steps.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-primary-900 mb-6">Request an Invitation</h3>

                <div className="mb-6">
                  <RadioGroup
                    name="userType"
                    label="I represent a:"
                    options={[
                      { id: 'corporate', label: 'Corporate Innovation Team', value: 'corporate' },
                      { id: 'startup', label: 'B2B SaaS Startup', value: 'startup' },
                    ]}
                    value={userType}
                    onChange={setUserType}
                    orientation="horizontal"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Work Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                  />

                  <Input
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="Your company name"
                  />
                </div>

                <div className="mb-6">
                  <Select
                    label="Company Size"
                    value={companySize}
                    onChange={(value) => setCompanySize(value)}
                    options={[
                      { value: '', label: 'Select company size', disabled: true },
                      { value: '1-10', label: '1-10 employees' },
                      { value: '11-50', label: '11-50 employees' },
                      { value: '51-200', label: '51-200 employees' },
                      { value: '201-500', label: '201-500 employees' },
                      { value: '501-1000', label: '501-1000 employees' },
                      { value: '1000+', label: '1000+ employees' },
                    ]}
                  />
                </div>

                {error && (
                  <Alert variant="error" className="mb-6">
                    {error}
                  </Alert>
                )}

                <div className="flex items-center justify-between">
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Request Invitation
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                  We'll review your application and reach out if you're a fit for our current focus.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
              Not Another Coworking Space
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              See how ShareYourSpace's enterprise-grade approach compares to generic coworking
              solutions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 bg-primary-50 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                    ShareYourSpace
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generic Coworking
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Booking Duration Focus
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 bg-primary-50">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Medium to Long-Term (3-18 months)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Mostly Hourly/Daily/Monthly
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Enterprise Compliance
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 bg-primary-50">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Rigorous German Standard Verification
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Basic or None
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Network Effects
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 bg-primary-50">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Strategic 5-Dimensional Network
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      General Community Only
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Business Matching
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 bg-primary-50">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      InnovationMatch Platform with AI
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      None or Basic Networking
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Growth Flexibility
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 bg-primary-50">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Built-in Growth Options for Teams
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Limited, Based on Availability
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Workspace Experience?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Join ShareYourSpace today and become part of our exclusive network of corporate
            innovators and B2B startups.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register?type=corporate">
              <Button size="lg" variant="accent" rounded>
                Join as Corporate
              </Button>
            </Link>
            <Link href="/auth/register?type=startup">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30"
                rounded
              >
                Join as Startup
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
