import { useEffect, useState } from "react";
import PostCard from "../components/common/PostCard";
import PostInputBox from "../components/common/PostInput";
import { getAllPosts, type Post } from "../utils/postUtils";
import { samplePosts } from "../utils/sampleData";

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const sortedPosts = posts.slice().sort((a, b) => b.createdAt - a.createdAt);

  const loadPosts = () => {
    setPosts([...getAllPosts(), ...samplePosts]);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-[550px] mx-auto space-y-6 py-8 px-4">
      ̦ <PostInputBox onPostPublish={loadPosts} />
      <PostCard
        user={{
          name: "Theresa Webb",
          avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        }}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        emoji="😉"
        timestamp={1750368351779}
      />
      <PostCard
        user={{
          name: "Theresa Webb",
          avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        }}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        emoji="😉"
        timestamp={1750348387291}
      />
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
