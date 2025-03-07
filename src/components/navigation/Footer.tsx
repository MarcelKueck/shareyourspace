import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

/**
 * Footer component with company information and compliance links
 */
const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('bg-white border-t border-gray-200', className)}>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="ShareYourSpace Logo"
                width={160}
                height={36}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-base">
              Enterprise-grade office sharing platform connecting corporate innovation teams with
              B2B SaaS startups.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/corporate"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      For Corporates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/startups"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      For Startups
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/innovationmatch"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      InnovationMatch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/assistant"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      AI Assistant
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-600 hover:text-primary-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-600 hover:text-primary-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/help" className="text-base text-gray-600 hover:text-primary-600">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Compliance & Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-600 hover:text-primary-600">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/compliance"
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      Compliance Framework
                    </Link>
                  </li>
                  <li>
                    <Link href="/gdpr" className="text-base text-gray-600 hover:text-primary-600">
                      GDPR Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Localization */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-500 md:mt-0 order-2 md:order-1 mt-4">
              &copy; {new Date().getFullYear()} ShareYourSpace. All rights reserved.
            </p>

            <div className="flex space-x-6 order-1 md:order-2">
              <select
                id="locale"
                name="locale"
                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm rounded-md"
                defaultValue="en-DE"
              >
                <option value="en-DE">English (Germany)</option>
                <option value="de-DE">Deutsch</option>
                <option value="en-US">English (US)</option>
              </select>

              <div className="flex items-center">
                <div className="h-6 w-10 mr-2 rounded overflow-hidden">
                  <img
                    src="/images/flags/germany.svg"
                    alt="Germany"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-gray-500 text-sm">Munich, Germany</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
