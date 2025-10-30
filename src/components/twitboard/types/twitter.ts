export interface TwitterMessage {
  id: string;
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  avatar: string;
  verified?: boolean;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  videoDuration?: string;
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  tags?: string[];
}

export interface Column {
  id: string;
  title: string;
  filter: string;
}
