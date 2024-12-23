import React from 'react';
import { Message } from '../../../types/database';
import { useAuth } from '../../../hooks/useAuth';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.sender_id === user?.id
              ? 'bg-blue-100 ml-auto'
              : 'bg-gray-100'
          } max-w-[80%]`}
        >
          <p className="text-gray-800">{message.content}</p>
          <span className="text-xs text-gray-500">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
}