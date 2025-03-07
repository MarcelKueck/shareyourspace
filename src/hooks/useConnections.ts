import useSWR from 'swr';
import { useState } from 'react';
import { Connection, ConnectionStatus, ConnectionType } from '@/models/matching';
import { post, put } from '@/lib/api/api-client';

interface UseConnectionsOptions {
  status?: ConnectionStatus;
  type?: ConnectionType;
  page?: number;
  limit?: number;
}

interface UseConnectionsResponse {
  connections: Connection[];
  totalConnections: number;
  isLoading: boolean;
  isError: Error | null;
  createConnection: (
    recipientId: string,
    connectionTypes: ConnectionType[],
    message?: string
  ) => Promise<Connection | null>;
  updateConnectionStatus: (
    id: string,
    status: ConnectionStatus,
    message?: string
  ) => Promise<Connection | null>;
  mutate: () => Promise<void>;
}

export function useConnections(options: UseConnectionsOptions = {}): UseConnectionsResponse {
  const { status, type, page = 1, limit = 10 } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  if (type) queryParams.append('type', type);
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  const queryString = queryParams.toString();
  const url = `/connections${queryString ? `?${queryString}` : ''}`;

  const { data, error, mutate } = useSWR<{ connections: Connection[]; total: number }>(url);

  const createConnection = async (
    recipientId: string,
    connectionTypes: ConnectionType[],
    message?: string
  ): Promise<Connection | null> => {
    try {
      const response = await post<Connection>('/connections', {
        recipientId,
        connectionType: connectionTypes,
        message,
      });
      await mutate();
      return response;
    } catch (err) {
      console.error('Error creating connection:', err);
      return null;
    }
  };

  const updateConnectionStatus = async (
    id: string,
    status: ConnectionStatus,
    message?: string
  ): Promise<Connection | null> => {
    try {
      const response = await put<Connection>(`/connections/${id}`, {
        status,
        responseMessage: message,
      });
      await mutate();
      return response;
    } catch (err) {
      console.error('Error updating connection status:', err);
      return null;
    }
  };

  return {
    connections: data?.connections || [],
    totalConnections: data?.total || 0,
    isLoading: !error && !data,
    isError: error || null,
    createConnection,
    updateConnectionStatus,
    mutate,
  };
}
