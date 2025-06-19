import { useEffect, useState } from "react";
import PostCard from "../components/common/PostCard";
import PostInputBox from "../components/common/PostInput";
import HomePage from "../components/SignInModal";
import { getAllPosts, type Post } from "../utils/postUtils";

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const sortedPosts = posts.slice().sort((a, b) => b.createdAt - a.createdAt);

  const loadPosts = () => {
    setPosts(getAllPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-[550px] mx-auto space-y-6 py-8 px-4">
      <HomePage />
      <PostInputBox onPostPublish={loadPosts} />

      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          user={post.user}
          content={post.content}
          timestamp={post.createdAt}
          emoji={post.emoji}
        />
      ))}
    </div>
  );
}

export default Feed;
