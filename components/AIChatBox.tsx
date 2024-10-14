import React from 'react'
import {useChat} from "ai/react"
import { cn } from '@/lib/utils'

interface AIChatBoxProps {
    open: boolean
    onClose: () => void
}

const AIChatBox = ({open, onClose} : AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error
  } = useChat()

  return (
    <div className={cn('bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36', 
        open ? "fixed" : "hidden"
    )}>
        ChatBox
    </div>
)

}


export default AIChatBox