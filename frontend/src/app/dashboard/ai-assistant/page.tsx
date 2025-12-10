"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Send,
  Sparkles,
  MessageSquare,
  BookOpen,
  FileText,
  Code,
  HelpCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Star,
  Zap,
  Bot,
  Plus,
  History,
  Paperclip,
  X,
  File,
  ChevronRight,
  Search
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: { title: string; regulation: string }[];
  attachments?: string[];
}

interface ChatSession {
  id: number;
  title: string;
  date: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
}

import { useProject } from "@/context/ProjectContext";

export default function AIAssistantPage() {
  const { currentProject } = useProject();
  const [selectedContext, setSelectedContext] = useState("project");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI Compliance Assistant. I can help you understand FDA regulations, ISO standards, EU MDR requirements, and answer any compliance-related questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<Document[]>([]);
  const [showDocSelector, setShowDocSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recentChats: ChatSession[] = [
    { id: 1, title: "ISO 13485 Audit Prep", date: "Today" },
    { id: 2, title: "FDA 510(k) Submission", date: "Yesterday" },
    { id: 3, title: "Risk Management Plan", date: "2 days ago" },
    { id: 4, title: "EU MDR Classification", date: "Last week" },
  ];

  const availableDocs: Document[] = [
    { id: 1, name: "QMS_Manual_v2.pdf", type: "PDF", date: "2023-10-15" },
    { id: 2, name: "Risk_Analysis_Report.docx", type: "DOCX", date: "2023-11-02" },
    { id: 3, name: "Design_Inputs.xlsx", type: "XLSX", date: "2023-11-10" },
    { id: 4, name: "Clinical_Eval_Plan.pdf", type: "PDF", date: "2023-11-20" },
  ];

  const quickPrompts = [
    {
      icon: FileText,
      title: "Design History File",
      prompt: "Explain what a Design History File (DHF) is and what it should contain.",
    },
    {
      icon: BookOpen,
      title: "FDA 21 CFR Part 820",
      prompt: "What are the key requirements of FDA 21 CFR Part 820?",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && selectedDocs.length === 0) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      attachments: selectedDocs.map(d => d.name),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setSelectedDocs([]);
    setIsTyping(true);

    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: "I've analyzed your request against the provided context. Based on FDA 21 CFR Part 820.30, the Design History File must contain or reference the documentation necessary to demonstrate that the design was developed in accordance with the approved design plan.",
        timestamp: new Date(),
        sources: [
          { title: "21 CFR Part 820.30", regulation: "FDA QSR" },
        ],
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const toggleDocSelection = (doc: Document) => {
    if (selectedDocs.find(d => d.id === doc.id)) {
      setSelectedDocs(selectedDocs.filter(d => d.id !== doc.id));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 overflow-hidden">
      {/* Left Sidebar: Recent Chats */}
      <div className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-4">
        <Button className="w-full bg-[#064E3B] hover:bg-[#064E3B]/90 text-white justify-start" size="lg">
          <Plus size={18} className="mr-2" /> New Chat
        </Button>

        <Card className="flex-1 border-none shadow-sm bg-white overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-[#064E3B] flex items-center gap-2">
              <History size={16} /> Recent Chats
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="p-3 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
              >
                <p className="text-sm font-medium text-slate-700 group-hover:text-[#064E3B] truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">{chat.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Center: Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0">
        <Card className="flex-1 flex flex-col border-none shadow-sm bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#064E3B] flex items-center justify-center text-white shadow-sm">
                <Bot size={20} />
              </div>
              <div>
                <h1 className="font-bold text-[#064E3B]">AI Compliance Assistant</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-slate-500">Online & Ready</span>
                </div>
              </div>
            </div>

            {/* Context Selector */}
            <div className="flex items-center gap-2">
              {currentProject && (
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Context:</span>
                  <select
                    className="bg-transparent text-sm font-medium text-[#064E3B] focus:outline-none cursor-pointer"
                    value={selectedContext}
                    onChange={(e) => setSelectedContext(e.target.value)}
                  >
                    <option value="project">{currentProject.name} (Project)</option>
                    {currentProject.products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Product)</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] lg:max-w-[75%] ${message.type === "user"
                    ? "bg-[#064E3B] text-white rounded-2xl rounded-tr-sm shadow-sm"
                    : "bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm"
                    } p-5`}
                >
                  <div className="flex items-start gap-3">
                    {message.type === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B] flex-shrink-0">
                        <Bot size={16} />
                      </div>
                    )}
                    <div className="flex-1">
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {message.attachments.map((file, i) => (
                            <Badge key={i} variant="default" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                              <Paperclip size={10} className="mr-1" /> {file}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <p className="text-sm leading-relaxed whitespace-pre-line font-light">
                        {message.content}
                      </p>

                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <p className="text-xs font-semibold mb-2 opacity-70">Sources:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, i) => (
                              <Badge
                                key={i}
                                variant="info"
                                className="text-[10px] bg-blue-50 text-blue-600 border-blue-100"
                              >
                                <BookOpen size={12} className="mr-1" />
                                {source.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            {selectedDocs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 px-1">
                {selectedDocs.map((doc) => (
                  <Badge key={doc.id} variant="default" className="bg-slate-100 text-slate-700 border-slate-200 pl-2 pr-1 py-1">
                    <FileText size={12} className="mr-1 text-[#064E3B]" />
                    {doc.name}
                    <button
                      onClick={() => toggleDocSelection(doc)}
                      className="ml-2 p-0.5 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex gap-3 items-end">
              <div className="relative">
                <Button
                  variant="outline"
                  size="md"
                  className={`h-12 w-12 rounded-xl border-slate-200 p-0 ${showDocSelector ? 'bg-slate-100 border-[#064E3B]' : 'hover:bg-slate-50'}`}
                  onClick={() => setShowDocSelector(!showDocSelector)}
                >
                  <Paperclip size={20} className="text-slate-500" />
                </Button>

                {/* Document Selector Popup */}
                {showDocSelector && (
                  <div className="absolute bottom-14 left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center mb-2 px-1">
                      <span className="text-xs font-bold text-slate-500 uppercase">Attach Context</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowDocSelector(false)}>
                        <X size={14} />
                      </Button>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {availableDocs.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => toggleDocSelection(doc)}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm transition-colors ${selectedDocs.find(d => d.id === doc.id)
                            ? "bg-[#064E3B]/10 text-[#064E3B]"
                            : "hover:bg-slate-50 text-slate-600"
                            }`}
                        >
                          <FileText size={14} />
                          <span className="truncate flex-1">{doc.name}</span>
                          {selectedDocs.find(d => d.id === doc.id) && <div className="w-2 h-2 rounded-full bg-[#064E3B]" />}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <Button variant="ghost" size="sm" className="w-full text-xs justify-start text-[#064E3B]">
                        <Plus size={12} className="mr-2" /> Upload New Document
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Input
                  placeholder="Ask anything... (e.g., 'Summarize the risk report')"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="h-12 rounded-xl border-slate-200 focus:border-[#064E3B] focus:ring-[#064E3B] bg-slate-50"
                />
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() && selectedDocs.length === 0}
                className="h-12 w-12 rounded-xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white p-0 flex items-center justify-center shadow-md transition-all hover:scale-105"
              >
                <Send size={20} />
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </Card>
      </div>

      {/* Right Sidebar: Resources */}
      <div className="w-72 flex-shrink-0 hidden xl:flex flex-col gap-4">
        <Card className="p-4 border-none shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-[#064E3B]" size={18} />
            <h3 className="font-bold text-[#064E3B]">Quick Prompts</h3>
          </div>
          <div className="space-y-2">
            {quickPrompts.map((prompt, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200 group"
                onClick={() => setInputValue(prompt.prompt)}
              >
                <p className="text-sm font-medium text-[#064E3B] mb-1 group-hover:text-[#064E3B]/80">
                  {prompt.title}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {prompt.prompt}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-none shadow-sm bg-white flex-1">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-[#064E3B]" size={18} />
            <h3 className="font-bold text-[#064E3B]">Frequent Docs</h3>
          </div>
          <div className="space-y-3">
            {availableDocs.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#064E3B]/10 group-hover:text-[#064E3B] transition-colors">
                  <File size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate group-hover:text-[#064E3B]">{doc.name}</p>
                  <p className="text-[10px] text-slate-400">{doc.date}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-[#064E3B]" />
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 border-slate-200 text-slate-600 hover:bg-slate-50 text-xs">
            View All Documents
          </Button>
        </Card>
      </div>
    </div>
  );
}
