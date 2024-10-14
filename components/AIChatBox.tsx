import React from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat(); //  /api/chat

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
        <div className="h-full overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input 
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export const ChatMessage = ({ message: { role, content } }: { message: Message }) => {
  return (
    <div className={`mb-3 ${role === 'assistant' ? 'text-blue-500' : 'text-gray-800'}`}>
      <div className="font-semibold">{role === 'assistant' ? 'AI' : 'You'}</div>
      <div>{content}</div>
    </div>
  );
};

export default AIChatBox;