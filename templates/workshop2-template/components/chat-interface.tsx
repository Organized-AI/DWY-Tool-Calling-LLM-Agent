'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Loader2, User, Bot } from 'lucide-react'
import { RAGMode } from './mode-switcher'
import { ExampleQueries } from './example-queries'

interface ChatInterfaceProps {
  mode: RAGMode
  onGraphUpdate?: (data: any) => void
}

export function ChatInterface({ mode, onGraphUpdate }: ChatInterfaceProps) {
  const [isTyping, setIsTyping] = useState(false)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: '/api/chat',
    body: { mode },
    onFinish: (message) => {
      // Extract any graph data from the response
      // This would be populated by the AI tools
      if (message.toolInvocations) {
        const graphData = message.toolInvocations.find(
          (tool) => tool.toolName === 'updateGraph' && 'result' in tool
        )
        if (graphData && 'result' in graphData && onGraphUpdate) {
          onGraphUpdate(graphData.result)
        }
      }
    }
  })

  const handleSelectQuery = (query: string) => {
    setInput(query)
    // Auto-focus the textarea
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }

  // Removed auto-scroll - let users control their own scrolling

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <ExampleQueries mode={mode} onSelectQuery={handleSelectQuery} />
            <div className="text-center text-muted-foreground py-4">
              <p className="text-sm">Or start your own conversation to see {mode} RAG in action</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.role === 'assistant' && message.toolInvocations && (
                <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex flex-wrap gap-1">
                    {message.toolInvocations.map((tool, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tool.toolName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={`Ask about anything... (${mode} mode active)`}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
          <Badge variant="outline" className="text-xs">
            {mode.toUpperCase()} Mode
          </Badge>
        </div>
      </div>
    </div>
  )
}