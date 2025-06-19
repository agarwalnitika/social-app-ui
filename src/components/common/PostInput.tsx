import { useState } from "react";
import CameraIcon from "../../assets/CameraIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import SendIcon from "../../assets/SendIcon";
import MicIcon from "../../assets/MicIcon";
import PlusIcon from "../../assets/PlusIcon";
import ListOrderedIcon from "../../assets/richText/ListOrderedIcon";
import ListUnorderedIcon from "../../assets/richText/ListUnorderedIcon";
import QuoteIcon from "../../assets/richText/QuoteIcon";
import ScriptIcon from "../../assets/richText/ScriptIcon";
import TextBoldIcon from "../../assets/richText/TextBoldIcon";
import TextItalicIcon from "../../assets/richText/TextItalicIcon";
import TextUnderlineIcon from "../../assets/richText/TextUnderlineIcon";
import { useAuth } from "../../context/AuthContext";
import { savePost, type Post } from "../../utils/postUtils";
import EmojiPicker from "./EmojiPicker";
import { IconWithToast } from "./IconWithToast";
import IconWrapper from "./IconWrapper";
// import { Smile, Plus, Mic, Camera, Send, Trash2 } from "lucide-react";

const PostInputBox = ({ onPostPublish }: { onPostPublish: () => void }) => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("☺"); // default emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user } = useAuth();
  const handlePublish = () => {
    if (!text.trim() || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: text,
      createdAt: Date.now(),
      emoji,
      user: {
        name: user.email.split("@")[0],
        avatarUrl: `https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`,
      },
    };

    savePost(newPost);
    onPostPublish(); // trigger reload in FeedPage
    setText(""); // clear input
    setEmoji("☺");
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="p-[8px] rounded-2xl bg-[#00000008]">
      <div className="rounded-2xl shadow-sm bg-white p-2 w-full">
        {/* Toolbar */}

        <div className="flex items-center gap-2 justify-between  mx-2 my-1">
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl bg-[#00000008] ">
            <select className="rounded-md px-3 py-1 bg-white text-gray-700 text-sm shadow-sm">
              <option>Paragraph</option>
            </select>
            {[
              <TextBoldIcon key="bold" />,
              <TextItalicIcon key="italic" />,
              <TextUnderlineIcon key="underline" />,
              <ListUnorderedIcon key="unordered" />,
              <ListOrderedIcon key="ordered" />,
              <QuoteIcon key="quote" />,
              <ScriptIcon key="script" />,
            ].map((icon, idx) => (
              <IconWithToast
                key={idx}
                icon={
                  <IconWrapper bgColor="bg-transparent">{icon}</IconWrapper>
                }
              />
            ))}
          </div>
          <IconWithToast
            key={"delete"}
            icon={
              <IconWrapper bgColor="bg-[#FF000026]" disableInteraction>
                <DeleteIcon />
              </IconWrapper>
            }
          />
        </div>

        {/* Input */}
        <div className="relative flex items-start gap-2 px-4 py-3 text-gray-700">
          <IconWrapper onClick={toggleEmojiPicker}>
            <span className="text-xl">{emoji}</span>
          </IconWrapper>
          {showEmojiPicker && (
            <div className="absolute z-50 top-10 mt-2 left-0">
              <EmojiPicker
                onSelect={(e) => {
                  setEmoji(e);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
          <textarea
            placeholder="How are you feeling today?"
            className="flex-1 resize-none outline-none text-sm bg-transparent"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Footer icons */}
        <div className="flex items-center justify-between px-3 pb-2">
          <div className="flex gap-4 text-gray-400">
            {[
              <PlusIcon key="plus" />,
              <MicIcon key="mic" />,
              <CameraIcon key="camera" />,
            ].map((icon, idx) => (
              <IconWithToast
                key={idx}
                icon={
                  <IconWrapper
                    bgColor={
                      icon.key === "plus" ? "bg-[#0000000F]" : "bg-transparent"
                    }
                    disableInteraction
                  >
                    {icon}
                  </IconWrapper>
                }
              />
            ))}
          </div>
          <div
            className="cursor-pointer text-[#5057EA] hover:text-[#3e45c7]"
            onClick={() => handlePublish()}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInputBox;
