import CommentIcon from "../../assets/post/CommentIcon";
import LikeIcon from "../../assets/post/LikeIcon";
import ShareIcon from "../../assets/post/ShareIcon";
import { formatTimeAgo } from "../../utils/formatTime";
import IconWrapper from "../common/IconWrapper"; // assumes you created the wrapper here
import { IconWithToast } from "./IconWithToast";

interface PostCardProps {
  user: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  emoji?: string;
  timestamp: number;
}

const PostCard = ({ user, content, emoji, timestamp }: PostCardProps) => {
  const icons = {
    like: <LikeIcon />,
    comment: <CommentIcon />,
    share: <ShareIcon />,
  };

  return (
    <div className="p-2 rounded-2xl bg-[#00000008]">
      <div className="bg-white rounded-2xl shadow-sm p-4 w-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={user.avatarUrl}
            className="w-9 h-9 rounded-[7px] object-cover"
            alt={user.name}
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{formatTimeAgo(timestamp)}</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="text-sm text-gray-800 leading-relaxed flex gap-3 mb-2">
          <div className="w-9 flex justify-center space-x-3 m-1">
            {emoji && (
              <IconWrapper
                disableInteraction
                bgColor="bg-[#f2f2f2]"
                rounded="rounded-full"
                size="h-7 w-7"
              >
                {emoji}
              </IconWrapper>
            )}
          </div>
          <div>{content}</div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center space-x-5 mt-2 mb-1 text-gray-400 ml-4">
        {Object.entries(icons).map(([name, icon]) => (
          <IconWithToast key={name} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
