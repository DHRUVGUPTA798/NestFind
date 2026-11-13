import React, { useState } from 'react'
import { MessageSquare, Send, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState('c1')
  const [inputText, setInputText] = useState('')

  // Channels
  const [channels, setChannels] = useState([
    {
      id: 'c1',
      ownerName: 'Rajesh Kumar',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop',
      propertyTitle: '2BHK Apartment in Indiranagar',
      lastMessage: 'Yes, car parking and elevator access is fully available.',
      time: '10:45 AM',
      unread: 1,
      messages: [
        { sender: 'owner', text: 'Hello! Thanks for your interest in the Indiranagar 2BHK.', time: '10:30 AM' },
        { sender: 'me', text: 'Hi Rajesh! Is there covered car parking and power backup included?', time: '10:40 AM' },
        { sender: 'owner', text: 'Yes, car parking and elevator access is fully available.', time: '10:45 AM' },
      ],
    },
    {
      id: 'c2',
      ownerName: 'Anjali Mehta',
      ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80&fit=crop',
      propertyTitle: '3BHK Villa in Koregaon Park',
      lastMessage: 'Looking forward to meeting you on Saturday.',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { sender: 'me', text: 'Good morning Anjali. Would Saturday 11 AM be fine for a visit?', time: 'Yesterday' },
        { sender: 'owner', text: 'Looking forward to meeting you on Saturday.', time: 'Yesterday' },
      ],
    },
  ])

  const currentChannel = channels.find(c => c.id === activeChannel) || channels[0]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMessage = {
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setChannels(prev =>
      prev.map(ch => {
        if (ch.id === activeChannel) {
          return {
            ...ch,
            messages: [...ch.messages, newMessage],
            lastMessage: newMessage.text,
            time: 'Just now',
          }
        }
        return ch
      })
    )

    setInputText('')
  }

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-72px)] py-6 sm:py-8 page-enter">
      <div className="container-xl">

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden h-[680px] grid grid-cols-1 md:grid-cols-12">

          {/* Left Column: Channels List */}
          <div className="md:col-span-4 border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
            <div className="p-4 border-b border-stone-200 bg-white">
              <h2 className="text-base font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                <MessageSquare size={17} className="text-brand-700" />
                Direct Landlord Chats
              </h2>
              <p className="text-[11px] text-stone-500 mt-0.5">End-to-end inquiries & negotiations</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={cn(
                    'w-full p-4 text-left flex items-start gap-3 transition-colors',
                    activeChannel === channel.id ? 'bg-white shadow-xs' : 'hover:bg-stone-100/60'
                  )}
                >
                  <img
                    src={channel.ownerAvatar}
                    alt={channel.ownerName}
                    className="size-10 rounded-full object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-stone-900 truncate">{channel.ownerName}</p>
                      <span className="text-[10px] text-stone-400 font-semibold">{channel.time}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-brand-700 truncate mb-1">
                      {channel.propertyTitle}
                    </p>
                    <p className="text-xs text-stone-500 truncate leading-tight">
                      {channel.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Dialogue Body */}
          <div className="md:col-span-8 flex flex-col h-full bg-white">
            {/* Active Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentChannel.ownerAvatar}
                  alt={currentChannel.ownerName}
                  className="size-10 rounded-full object-cover border border-brand-200"
                />
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
                    {currentChannel.ownerName}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Inquiry regarding: <strong className="text-brand-700 font-bold">{currentChannel.propertyTitle}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                <ShieldCheck size={14} /> Verified Landlord
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5 bg-[#fbfbfa]">
              {currentChannel.messages.map((msg, i) => {
                const isMe = msg.sender === 'me'
                return (
                  <div
                    key={i}
                    className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
                  >
                    <div
                      className={cn(
                        'max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs',
                        isMe
                          ? 'bg-brand-700 text-white rounded-br-xs'
                          : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                      )}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 font-semibold px-1">
                      {msg.time}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-stone-200 bg-white flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Reply to ${currentChannel.ownerName}...`}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-brand-700 font-semibold"
              />
              <Button type="submit" variant="primary" size="md">
                <Send size={15} /> Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
