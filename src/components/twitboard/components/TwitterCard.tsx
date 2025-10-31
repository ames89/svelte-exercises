import { type TwitterMessage } from '../types/twitter';
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TwitterCardProps {
  message: TwitterMessage;
}

export function TwitterCard({ message }: TwitterCardProps) {
  return (
    <div className="bg-black border border-gray-800 rounded-xl p-4 hover:bg-gray-950 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <ImageWithFallback
          src={message.avatar}
          alt={message.username}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white truncate">{message.username}</span>
              <span className="text-gray-500 truncate">{message.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 flex-shrink-0">{message.timestamp}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="text-gray-500 hover:text-blue-400 transition-colors p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2"/>
                  <circle cx="12" cy="12" r="2"/>
                  <circle cx="12" cy="19" r="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-white whitespace-pre-wrap">
          {message.content.split(/(#\w+)/g).map((part, index) => 
            part.startsWith('#') ? (
              <span key={index} className="text-blue-400">{part}</span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </p>
      </div>

      {/* Media */}
      {message.type === 'image' && message.mediaUrl && (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-800">
          <ImageWithFallback
            src={message.mediaUrl}
            alt="Tweet media"
            className="w-full h-auto"
          />
        </div>
      )}

      {message.type === 'video' && message.mediaUrl && (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-800 relative group cursor-pointer">
          <ImageWithFallback
            src={message.mediaUrl}
            alt="Video thumbnail"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500/90 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
          {message.videoDuration && (
            <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 rounded text-white">
              {message.videoDuration}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500">
        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
          <MessageCircle className="w-4 h-4" />
          {message.replies > 0 && <span className="group-hover:text-blue-400">{message.replies}</span>}
        </button>
        
        <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
          <Repeat2 className="w-4 h-4" />
          {message.retweets > 0 && <span className="group-hover:text-green-400">{message.retweets}</span>}
        </button>
        
        <button className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
          <Heart className="w-4 h-4" />
          {message.likes > 0 && <span className="group-hover:text-pink-500">{message.likes}</span>}
        </button>
        
        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
          <BarChart3 className="w-4 h-4" />
          {message.views > 0 && <span className="group-hover:text-blue-400">{message.views}</span>}
        </button>
        
        <div className="flex items-center gap-2">
          <button className="hover:text-blue-400 transition-colors p-1">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="hover:text-blue-400 transition-colors p-1">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
