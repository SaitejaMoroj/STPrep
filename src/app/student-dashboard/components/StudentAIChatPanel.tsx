'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, BookOpen, ThumbsUp, ThumbsDown } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  subject?: string;
  sources?: string[];
  resolved?: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'ai',
    content:
      "Hello Arjun! I'm your AI study assistant, trained on Vidyamandir's UPSC material. Ask me any doubt from your syllabus — Polity, History, Geography, Economy, Science & Tech, or Current Affairs. 📚",
    timestamp: '2:30 PM',
  },
  {
    id: 'msg-002',
    role: 'user',
    content: 'What is the difference between Fundamental Rights and Directive Principles of State Policy?',
    timestamp: '2:31 PM',
  },
  {
    id: 'msg-003',
    role: 'ai',
    content:
      'Great question! Here\'s a structured comparison:\n\n**Fundamental Rights (Part III)**\n• Justiciable — enforceable in courts\n• Negative obligations on the State (State cannot infringe)\n• Primarily protect individual liberty\n• Examples: Right to Equality (Art. 14), Right to Freedom (Art. 19)\n\n**Directive Principles (Part IV)**\n• Non-justiciable — courts cannot enforce them directly\n• Positive obligations on the State (State should act)\n• Aimed at social and economic justice\n• Examples: Equal pay for equal work (Art. 39d), Free legal aid (Art. 39A)\n\n**Key Conflict:** Art. 37 says DPSPs are fundamental to governance. In Minerva Mills (1980), SC held neither is absolutely supreme — they must be harmoniously construed.',
    timestamp: '2:31 PM',
    subject: 'Indian Polity',
    sources: ['Laxmikanth Ch. 7', 'NCERT Pol. Sci. Class 11'],
    resolved: true,
  },
];

const suggestedQuestions = [
  'Explain Preamble amendments',
  'What is Article 356?',
  'Difference between Lok Sabha & Rajya Sabha',
  'What are Schedules in Constitution?',
];

export default function StudentAIChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // BACKEND INTEGRATION: POST /api/ai/doubt-solve with { studentId, question: text, subject, batchId }
    await new Promise((r) => setTimeout(r, 1800));

    const aiMsg: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      role: 'ai',
      content:
        "This is a great area to strengthen! Based on your recent mock test performance, I can see you've had difficulty with this topic. Let me break it down with reference to Vidyamandir's study notes:\n\nThe concept involves multiple layers — constitutional, judicial interpretation, and practical application. Focus on the landmark cases first, then map the articles. Your Chapter 8 notes cover this comprehensively. Would you like me to generate 5 practice MCQs on this topic?",
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      subject: 'Indian Polity',
      sources: ['Laxmikanth Ch. 8', 'Vidyamandir Notes — Polity Module 3'],
      resolved: true,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="card flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
            <Sparkles size={15} className="text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Doubt Solver</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-muted-foreground">Trained on VMC UPSC Material</span>
            </div>
          </div>
        </div>
        <Badge variant="accent">AI</Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.role === 'ai' ? 'bg-violet-100' : 'bg-primary/10'
              }`}
            >
              {msg.role === 'ai' ? (
                <Bot size={14} className="text-violet-600" />
              ) : (
                <User size={14} className="text-primary" />
              )}
            </div>
            <div className={`flex-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ?'bg-primary text-white rounded-tr-sm' :'bg-muted text-foreground rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'ai' && msg.sources && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {msg.sources.map((src) => (
                    <span
                      key={`src-${msg.id}-${src}`}
                      className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted border border-border rounded px-1.5 py-0.5"
                    >
                      <BookOpen size={9} />
                      {src}
                    </span>
                  ))}
                </div>
              )}
              {msg.role === 'ai' && msg.resolved && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">Was this helpful?</span>
                  <button className="p-1 rounded text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors">
                    <ThumbsUp size={11} />
                  </button>
                  <button className="p-1 rounded text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors">
                    <ThumbsDown size={11} />
                  </button>
                </div>
              )}
              <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-violet-600" />
            </div>
            <div className="bg-muted rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <Loader2 size={13} className="text-violet-500 animate-spin" />
              <span className="text-xs text-muted-foreground">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-4 py-2 border-t border-border flex gap-1.5 overflow-x-auto scrollbar-thin flex-shrink-0">
        {suggestedQuestions.map((q) => (
          <button
            key={`suggest-${q}`}
            onClick={() => sendMessage(q)}
            className="flex-shrink-0 text-[11px] font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2 bg-muted rounded-xl border border-border px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask any doubt — Polity, History, Geography, Economy..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="p-1.5 rounded-lg bg-primary text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}