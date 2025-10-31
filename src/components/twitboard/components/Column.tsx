import { type TwitterMessage, type Column as ColumnType } from '../types/twitter';
import { TwitterCard } from './TwitterCard';
import { Input } from './ui/input';
import { X, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface ColumnProps {
  column: ColumnType;
  messages: TwitterMessage[];
  onRemove: (id: string) => void;
  onUpdateFilter: (id: string, filter: string) => void;
}

export function Column({ column, messages, onRemove, onUpdateFilter }: ColumnProps) {
  const [localFilter, setLocalFilter] = useState(column.filter);

  const handleFilterChange = (value: string) => {
    setLocalFilter(value);
    onUpdateFilter(column.id, value);
  };

  return (
    <div className="flex-shrink-0 w-[400px] bg-gray-900 rounded-xl border border-gray-800 flex flex-col h-full">
      {/* Column Header */}
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <GripVertical className="w-5 h-5 text-gray-600 cursor-grab active:cursor-grabbing" />
          <h2 className="text-white flex-1">{column.title}</h2>
          <button
            onClick={() => onRemove(column.id)}
            className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Input
          type="text"
          placeholder="Filter by hashtag or keyword..."
          value={localFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages match your filter
          </div>
        ) : (
          messages.map((message) => (
            <TwitterCard key={message.id} message={message} />
          ))
        )}
      </div>
    </div>
  );
}
