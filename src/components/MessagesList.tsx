import type { Message } from "@ai-sdk/react";
import { forwardRef } from "react";

import { ChatMessage } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";

interface MessagesListProps {
    messages: (Message | { id: string; role: 'assistant' | 'user'; content: string; createdAt?: Date })[];
    isLoading: boolean;
}

export const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(
    ({ messages, isLoading }, ref) => {
        return (
            <div className="flex-1 h-full bg-black border border-white rounded-lg overflow-hidden">
                <div className="h-full overflow-y-auto p-6 space-y-4 scrollbar-thin">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                    {isLoading && <LoadingIndicator />}
                    <div ref={ref} />
                </div>
            </div>
        );
    }
);

