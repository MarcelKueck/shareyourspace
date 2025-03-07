import { useState, useEffect } from 'react';
import { post, get } from '@/lib/api/api-client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AssistantAction {
  type: 'book' | 'connect' | 'schedule';
  payload: any;
}

interface UseAssistantResponse {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  performAction: (action: AssistantAction) => Promise<void>;
  clearMessages: () => void;
}

export function useAssistant(): UseAssistantResponse {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Load message history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const response = await get<{ messages: Message[] }>('/assistant/history');
        setMessages(response.messages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      // Add user message to the state immediately for better UX
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Send message to API
      const response = await post<{ message: Message }>('/assistant/message', { content });

      // Replace temp message and add assistant response
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== userMessage.id),
        {
          ...userMessage,
          id: response.message.id,
        },
        response.message,
      ]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const performAction = async (action: AssistantAction) => {
    try {
      setIsLoading(true);

      // Perform action based on type
      if (action.type === 'book') {
        await post('/assistant/actions/book', action.payload);
      } else if (action.type === 'connect') {
        await post('/assistant/actions/connect', action.payload);
      } else if (action.type === 'schedule') {
        await post('/assistant/actions/schedule', action.payload);
      }

      // Refresh messages after action
      const response = await get<{ messages: Message[] }>('/assistant/history');
      setMessages(response.messages);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    performAction,
    clearMessages,
  };
}
