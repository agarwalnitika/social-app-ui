import { useEffect, useState } from "react";
import PostCard from "../components/common/PostCard";
import PostInputBox from "../components/common/PostInput";
import { getAllPosts, type Post } from "../utils/postUtils";
import { samplePosts } from "../utils/sampleData";

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);

  const sortedPosts = posts.slice().sort((a, b) => b.createdAt - a.createdAt);

  const loadPosts = () => {
    const allPosts = [...getAllPosts(), ...samplePosts];
    setPosts(allPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Set a timeout to make the initial animation visible
    const timer = setTimeout(() => {
      setVisiblePosts(sortedPosts);
    }, 100); // A small delay to ensure CSS is ready

    return () => clearTimeout(timer);
  }, [posts]);

  return (
    <div className="max-w-[550px] mx-auto space-y-6 py-8 px-4">
      <PostInputBox onPostPublish={loadPosts} />
      {visiblePosts.map((post, index) => (
        <PostCard
          key={post.id}
          user={post.user}
          content={post.content}
          timestamp={post.createdAt}
          emoji={post.emoji}
          className="animate-slideInFromBottom"
          style={{
            animationDelay: `${index * 120}ms`,
            animationFillMode: "backwards",
          }}
        />
      ))}
    </div>
  );
}

export default Feed;
