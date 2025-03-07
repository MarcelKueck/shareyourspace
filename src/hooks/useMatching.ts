import useSWR from 'swr';
import { useState } from 'react';
import { Connection, MatchingPreference } from '@/models/matching';
import { post, put } from '@/lib/api/api-client';

interface UseMatchingResponse {
  recommendations: Connection[];
  preferences: MatchingPreference | null;
  isLoading: boolean;
  isError: Error | null;
  updatePreferences: (
    preferenceData: Partial<MatchingPreference>
  ) => Promise<MatchingPreference | null>;
  mutate: () => Promise<void>;
}

export function useMatching(): UseMatchingResponse {
  const { data: recommendationsData, error: recommendationsError } = useSWR<{
    recommendations: Connection[];
  }>('/recommendations');

  const {
    data: preferencesData,
    error: preferencesError,
    mutate: mutatePreferences,
  } = useSWR<{ preferences: MatchingPreference }>('/matching/preferences');

  const updatePreferences = async (
    preferenceData: Partial<MatchingPreference>
  ): Promise<MatchingPreference | null> => {
    try {
      const response = await put<{ preferences: MatchingPreference }>(
        '/matching/preferences',
        preferenceData
      );
      await mutatePreferences();
      return response.preferences;
    } catch (err) {
      console.error('Error updating preferences:', err);
      return null;
    }
  };

  const mutate = async () => {
    await Promise.all([
      typeof recommendationsData !== 'undefined' && typeof recommendationsError === 'undefined'
        ? (useSWR as any).mutate('/recommendations')
        : Promise.resolve(),
      mutatePreferences(),
    ]);
  };

  const isLoading =
    (!recommendationsData && !recommendationsError) || (!preferencesData && !preferencesError);
  const isError = recommendationsError || preferencesError;

  return {
    recommendations: recommendationsData?.recommendations || [],
    preferences: preferencesData?.preferences || null,
    isLoading,
    isError: isError || null,
    updatePreferences,
    mutate,
  };
}
