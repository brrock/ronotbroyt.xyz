export interface UserData {
    id: string;
    username: string | null;
    image_url: string | null;
    role: 'USER' | 'ADMIN' | 'MOD';
  }
  
  export interface Comment {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
    postID: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
  }