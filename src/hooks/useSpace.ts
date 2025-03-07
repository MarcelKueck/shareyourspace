import useSWR from 'swr';
import { useState } from 'react';
import { Space, SpaceType, ComplianceLevel } from '@/models/space';
import { BookingDuration } from '@/models/space';
import { post, put, del } from '@/lib/api/api-client';

interface UseSpacesOptions {
  district?: string;
  spaceType?: SpaceType;
  minCapacity?: number;
  complianceLevel?: ComplianceLevel;
  minDuration?: BookingDuration;
  page?: number;
  limit?: number;
}

interface UseSpacesResponse {
  spaces: Space[];
  totalSpaces: number;
  isLoading: boolean;
  isError: Error | null;
  createSpace: (spaceData: Partial<Space>) => Promise<Space | null>;
  updateSpace: (id: string, spaceData: Partial<Space>) => Promise<Space | null>;
  deleteSpace: (id: string) => Promise<boolean>;
  mutate: () => Promise<void>;
}

export function useSpaces(options: UseSpacesOptions = {}): UseSpacesResponse {
  const {
    district,
    spaceType,
    minCapacity,
    complianceLevel,
    minDuration,
    page = 1,
    limit = 10,
  } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (district) queryParams.append('district', district);
  if (spaceType) queryParams.append('spaceType', spaceType);
  if (minCapacity) queryParams.append('minCapacity', minCapacity.toString());
  if (complianceLevel) queryParams.append('complianceLevel', complianceLevel);
  if (minDuration) queryParams.append('minDuration', minDuration);
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  const queryString = queryParams.toString();
  const url = `/spaces${queryString ? `?${queryString}` : ''}`;

  const { data, error, mutate } = useSWR<{ spaces: Space[]; total: number }>(url);

  const createSpace = async (spaceData: Partial<Space>): Promise<Space | null> => {
    try {
      const response = await post<Space>('/spaces', spaceData);
      await mutate();
      return response;
    } catch (err) {
      console.error('Error creating space:', err);
      return null;
    }
  };

  const updateSpace = async (id: string, spaceData: Partial<Space>): Promise<Space | null> => {
    try {
      const response = await put<Space>(`/spaces/${id}`, spaceData);
      await mutate();
      return response;
    } catch (err) {
      console.error('Error updating space:', err);
      return null;
    }
  };

  const deleteSpace = async (id: string): Promise<boolean> => {
    try {
      await del(`/spaces/${id}`);
      await mutate();
      return true;
    } catch (err) {
      console.error('Error deleting space:', err);
      return false;
    }
  };

  return {
    spaces: data?.spaces || [],
    totalSpaces: data?.total || 0,
    isLoading: !error && !data,
    isError: error || null,
    createSpace,
    updateSpace,
    deleteSpace,
    mutate,
  };
}
