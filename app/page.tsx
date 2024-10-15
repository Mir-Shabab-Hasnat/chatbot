"use client"
import AIChatBox from "@/components/AIChatBox";
import AIChatButton from "@/components/AIChatButton";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false); // To track if the chatbox is open

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      ChatBot
      <AIChatButton onClick={() => setOpen(!open)} />
      {open && <AIChatBox open={open} onClose={() => setOpen(false)} />} {/* Chatbox is part of normal flow */}
      Something
    </div>
    
  );
}
