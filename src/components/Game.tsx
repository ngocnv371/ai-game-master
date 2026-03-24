import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scenario, Message } from '../types';
import { getGameMasterChat, generateSceneImage } from '../services/geminiService';
import { Send, LogOut, Loader2, Image as ImageIcon } from 'lucide-react';
import Markdown from 'react-markdown';

interface GameProps {
  scenario: Scenario;
  onExit: () => void;
}

export default function Game({ scenario, onExit }: GameProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const session = getGameMasterChat(scenario);
        setChatSession(session);
        
        if (scenario.initialMessage) {
          setMessages([
            {
              id: Date.now().toString(),
              role: 'model',
              content: scenario.initialMessage.narrative,
              suggestedActions: scenario.initialMessage.suggestedActions,
            }
          ]);
          setIsLoading(false);
          return;
        }

        // Trigger the first message (Quest Hook) if no initial message
        const response = await session.sendMessage({ message: "Start the adventure." });
        
        let parsed = { narrative: response.text || "The adventure begins...", suggestedActions: [] };
        try {
          if (response.text) parsed = JSON.parse(response.text);
        } catch (e) {
          console.error("Failed to parse JSON response", e);
        }

        setMessages([
          {
            id: Date.now().toString(),
            role: 'model',
            content: parsed.narrative,
            suggestedActions: parsed.suggestedActions,
          }
        ]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([
          {
            id: Date.now().toString(),
            role: 'model',
            content: "Failed to connect to the Game Master. Please check your API key and try again.",
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent, actionText?: string) => {
    e?.preventDefault();
    const textToSend = actionText || input;
    if (!textToSend.trim() || isLoading || !chatSession) return;

    const userMessage = textToSend.trim();
    if (!actionText) setInput('');
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMessage });
      
      let parsed = { narrative: response.text || "...", suggestedActions: [] };
      try {
        if (response.text) parsed = JSON.parse(response.text);
      } catch (e) {
        console.error("Failed to parse JSON response", e);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: parsed.narrative,
        suggestedActions: parsed.suggestedActions,
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "The Game Master seems to have lost connection to this realm. Try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async (messageId: string, narrative: string, size: 'standard' | 'big') => {
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        try {
          await window.aistudio.openSelectKey();
        } catch (e) {
          console.error("Failed to open key selector", e);
          return;
        }
      }
    }

    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isGeneratingImage: true } : m));
    try {
      const imageUrl = await generateSceneImage(narrative, scenario, size);
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, imageUrl, isGeneratingImage: false } : m));
    } catch (error) {
      console.error("Failed to generate image", error);
      if (error instanceof Error && error.message.includes('Requested entity was not found')) {
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
          await window.aistudio.openSelectKey();
        }
      }
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isGeneratingImage: false } : m));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen max-w-4xl mx-auto bg-black"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Exit Adventure"
          >
            <LogOut size={20} />
          </button>
          <div>
            <h2 className="font-bold text-lg text-yellow-500">{scenario.title}</h2>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{scenario.genre}</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="max-w-2xl bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <h3 className="text-xl font-serif text-yellow-500 mb-3">{scenario.title}</h3>
            <p className="text-gray-300 text-sm md:text-base italic leading-relaxed">
              {scenario.description}
            </p>
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 relative ${
                  msg.role === 'user' 
                    ? 'bg-yellow-600/20 border border-yellow-500/30 text-yellow-50 rounded-tr-sm' 
                    : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-sm shadow-lg'
                }`}
              >
                {msg.role === 'model' && !msg.imageUrl && !msg.isGeneratingImage && (
                  <div className="absolute -top-4 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10 bg-gray-900 p-1.5 rounded-xl border border-gray-700 shadow-xl">
                    <button 
                      onClick={() => handleGenerateImage(msg.id, msg.content, 'standard')}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 hover:text-white transition-colors"
                      title="Generate Standard Image (512px)"
                    >
                      <ImageIcon size={14} /> Standard
                    </button>
                    <button 
                      onClick={() => handleGenerateImage(msg.id, msg.content, 'big')}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 hover:text-white transition-colors"
                      title="Generate Big Image (1K)"
                    >
                      <ImageIcon size={14} /> Big
                    </button>
                  </div>
                )}
                {msg.role === 'model' ? (
                  <div className="flex flex-col gap-4">
                    {msg.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-gray-700 shadow-md">
                        <img src={msg.imageUrl} alt="Scene" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    {msg.isGeneratingImage && (
                      <div className="flex items-center justify-center gap-2 p-8 bg-gray-800/50 rounded-xl border border-gray-700 text-gray-400 text-sm italic">
                        <Loader2 className="animate-spin" size={18} /> Conjuring image...
                      </div>
                    )}
                    <div className="markdown-body text-sm md:text-base">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                    {msg.id === messages[messages.length - 1].id && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(undefined, action)}
                            disabled={isLoading}
                            className="text-sm bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 rounded-tl-sm flex items-center gap-3 text-gray-400">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm italic">The Game Master is pondering...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-gray-800">
        <form 
          onSubmit={handleSendMessage}
          className="relative max-w-3xl mx-auto flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="What do you do?"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-4 pr-12 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none min-h-[52px] max-h-[150px]"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-center text-xs text-gray-600 mt-2">
          Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    </motion.div>
  );
}
