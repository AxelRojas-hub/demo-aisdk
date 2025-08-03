interface ChatInputProps {
    input: string;
    isLoading: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatInput({
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    onKeyPress,
}: ChatInputProps) {
    return (
        <div className="bg-black/70 backdrop-blur-lg rounded-lg border border-white p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={onKeyPress}
                            disabled={isLoading}
                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-base leading-relaxed"
                            rows={1}
                            style={{ height: 'auto', minHeight: '24px' }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg flex items-center justify-center border border-green-500"
                    >
                        {isLoading ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                            </svg>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
