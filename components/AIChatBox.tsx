import React, { useEffect, useRef } from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Check, CheckCircle, CheckSquare, Trash, XCircle } from "lucide-react";
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

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "absolute z-10 w-full max-w-[500px] p-1 xl:right-36 mt-5",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl p-3">
        <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}

          {
            error && (
              <ChatMessage 
                message={{
                  role: "assistant",
                  content: "Something went wrong, please try again."
                }}
              />
            )
          }

          {
            !error && messages.length === 0 && (
              <div className="flex h-full items-center justify-center gap-3">
                <Bot />
                Send a "Hi" to the chatbot to get started 
              </div>
            )
          }

        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
        <Button
            title="Confirm"
            style={{ backgroundColor: "green", color: "white" }}
            size="icon"
            className="shrink-0"
            type="button"
            
          >
            <Check />
          </Button>
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export const ChatMessage = ({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) => {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "justify-start me-5" : "justify-end ms-5"
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
        )}
      >
        {content}
      </p>
      {!isAiMessage && <div>:User</div>}
    </div>
  );
};

export default AIChatBox;
