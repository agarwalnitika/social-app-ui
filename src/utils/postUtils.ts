// utils/postUtils.ts

export interface Post {
  id: string;
  content: string;
  emoji?: string;
  createdAt: number;
  user: {
    name: string;
    avatarUrl: string;
  };
}

const POST_KEY = "feed_posts";

export const getAllPosts = (): Post[] => {
  const raw = localStorage.getItem(POST_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const savePost = (post: Post) => {
  const posts = getAllPosts();
  posts.unshift(post); // Add newest at top
  localStorage.setItem(POST_KEY, JSON.stringify(posts));
};

export const clearAllPosts = () => {
  localStorage.removeItem(POST_KEY);
};
