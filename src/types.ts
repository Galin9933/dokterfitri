
export interface Status {
  id: string;
  content: string;
  timestamp: Date;
  mood: 'Happy' | 'Excited' | 'Inspired' | 'Loving';
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  comments: Comment[];
  likes: number;
}
