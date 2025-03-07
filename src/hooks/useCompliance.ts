import useSWR from 'swr';
import { useState } from 'react';
import {
  ComplianceRequirement,
  CompanyComplianceStatus,
  SpaceComplianceStatus,
} from '@/models/compliance';
import { post, put } from '@/lib/api/api-client';

interface UseComplianceResponse {
  requirements: ComplianceRequirement[];
  companyStatus: CompanyComplianceStatus[];
  isLoading: boolean;
  isError: Error | null;
  uploadDocument: (
    requirementId: string,
    file: File,
    documentType: string,
    expiryDate?: Date,
    notes?: string
  ) => Promise<boolean>;
  mutate: () => Promise<void>;
}

export function useCompliance(): UseComplianceResponse {
  const { data: requirementsData, error: requirementsError } = useSWR<{
    requirements: ComplianceRequirement[];
  }>('/compliance/requirements');

  const {
    data: statusData,
    error: statusError,
    mutate,
  } = useSWR<{ complianceStatus: CompanyComplianceStatus[] }>('/compliance/company-status');

  const uploadDocument = async (
    requirementId: string,
    file: File,
    documentType: string,
    expiryDate?: Date,
    notes?: string
  ): Promise<boolean> => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('requirementId', requirementId);
      formData.append('documentType', documentType);

      if (expiryDate) {
        formData.append('expiryDate', expiryDate.toISOString());
      }

      if (notes) {
        formData.append('notes', notes);
      }

      // Use axios directly since we're sending form data
      const response = await post('/compliance/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await mutate();
      return true;
    } catch (err) {
      console.error('Error uploading document:', err);
      return false;
    }
  };

  const isLoading = (!requirementsData && !requirementsError) || (!statusData && !statusError);
  const isError = requirementsError || statusError;

  return {
    requirements: requirementsData?.requirements || [],
    companyStatus: statusData?.complianceStatus || [],
    isLoading,
    isError: isError || null,
    uploadDocument,
    mutate,
  };
}
