import useSWR from 'swr';
import { useState } from 'react';
import { Booking, BookingStatus } from '@/models/booking';
import { post, put } from '@/lib/api/api-client';

interface UseBookingsOptions {
  status?: BookingStatus;
  asProvider?: boolean;
  asRequester?: boolean;
  page?: number;
  limit?: number;
}

interface UseBookingsResponse {
  bookings: Booking[];
  totalBookings: number;
  isLoading: boolean;
  isError: Error | null;
  createBooking: (bookingData: Partial<Booking>) => Promise<Booking | null>;
  updateBookingStatus: (
    id: string,
    status: BookingStatus,
    reason?: string
  ) => Promise<Booking | null>;
  mutate: () => Promise<void>;
}

export function useBookings(options: UseBookingsOptions = {}): UseBookingsResponse {
  const { status, asProvider, asRequester, page = 1, limit = 10 } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  if (asProvider) queryParams.append('asProvider', 'true');
  if (asRequester) queryParams.append('asRequester', 'true');
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  const queryString = queryParams.toString();
  const url = `/bookings${queryString ? `?${queryString}` : ''}`;

  const { data, error, mutate } = useSWR<{ bookings: Booking[]; total: number }>(url);

  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking | null> => {
    try {
      const response = await post<Booking>('/bookings', bookingData);
      await mutate();
      return response;
    } catch (err) {
      console.error('Error creating booking:', err);
      return null;
    }
  };

  const updateBookingStatus = async (
    id: string,
    status: BookingStatus,
    reason?: string
  ): Promise<Booking | null> => {
    try {
      const response = await put<Booking>(`/bookings/${id}/status`, {
        status,
        cancellationReason: reason,
      });
      await mutate();
      return response;
    } catch (err) {
      console.error('Error updating booking status:', err);
      return null;
    }
  };

  return {
    bookings: data?.bookings || [],
    totalBookings: data?.total || 0,
    isLoading: !error && !data,
    isError: error || null,
    createBooking,
    updateBookingStatus,
    mutate,
  };
}
