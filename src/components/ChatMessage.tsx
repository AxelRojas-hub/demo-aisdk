import type { Message } from "@ai-sdk/react";

interface ChatMessageProps {
    message: Message | { id: string; role: 'assistant' | 'user'; content: string; createdAt?: Date };
}

export function ChatMessage({ message }: ChatMessageProps) {
    const renderContent = () => {
        if ('parts' in message && message.parts) {
            return message.parts.map((part: { type: string; text?: string }, i: number) => {
                switch (part.type) {
                    case "text":
                        return (
                            <span
                                key={`${message.id}-${i}`}
                                dangerouslySetInnerHTML={{ __html: part.text || '' }}
                            />
                        );
                    default:
                        return null;
                }
            });
        }
        return <span dangerouslySetInnerHTML={{ __html: message.content || '' }} />;
    };

    return (
        <div
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[80%] p-4 rounded-lg border ${message.role === 'user'
                    ? 'bg-green-900/30 text-white border-green-500'
                    : 'bg-blue-900/25 text-gray-200 border-blue-500'
                    }`}
            >
                <div className="whitespace-pre-wrap leading-relaxed">
                    {renderContent()}
                </div>
                <div
                    className={`text-xs mt-2 ${message.role === 'user' ? 'text-green-300' : 'text-blue-400'
                        }`}
                >
                    {message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : ''}
                </div>
            </div>
        </div>
    );
}
