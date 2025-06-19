import { useState } from "react";
import CameraIcon from "../../assets/CameraIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import MicIcon from "../../assets/MicIcon";
import PlusIcon from "../../assets/PlusIcon";
import ListOrderedIcon from "../../assets/richText/ListOrderedIcon";
import ListUnorderedIcon from "../../assets/richText/ListUnorderedIcon";
import QuoteIcon from "../../assets/richText/QuoteIcon";
import ScriptIcon from "../../assets/richText/ScriptIcon";
import TextBoldIcon from "../../assets/richText/TextBoldIcon";
import TextItalicIcon from "../../assets/richText/TextItalicIcon";
import TextUnderlineIcon from "../../assets/richText/TextUnderlineIcon";
import SendIcon from "../../assets/SendIcon";
import { useAuth } from "../../context/AuthContext";
import { savePost, type Post } from "../../utils/postUtils";
import SignInForm from "../SigninForm";
import EmojiPicker from "./EmojiPicker";
import { IconWithToast } from "./IconWithToast";
import IconWrapper from "./IconWrapper";
import Modal from "./Modal";
import "../../index.css";

const PostInputBox = ({ onPostPublish }: { onPostPublish: () => void }) => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("☺"); // default emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const handlePublish = async () => {
    if (!user) {
      setShowSignIn(true);
      return;
    }
    if (!text.trim()) {
      setError("Please enter something before posting.");
      return;
    }
    if (emoji === "☺") {
      setError("Please choose an emoji.");
      return;
    }

    setIsSubmitting(true);
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
    // Simulate network delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 500));
    onPostPublish(); // trigger reload in FeedPage
    setText(""); // clear input
    setEmoji("☺");
    setError("");
    setIsSubmitting(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="p-[8px] rounded-2xl bg-[#00000008]">
      <div className="rounded-2xl shadow-sm bg-white p-2 w-full transition-all duration-200 ease-in-out">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 mx-2 my-1">
          {/* Scrollable Rich Text Toolbar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-[#00000008] px-2 py-2 rounded-xl flex-grow min-w-0 transition-all duration-200">
            <select className="rounded-md px-3 py-1 bg-white text-gray-700 text-sm shadow-sm shrink-0">
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
                  <IconWrapper bgColor="bg-transparent" disableInteraction>
                    {icon}
                  </IconWrapper>
                }
              />
            ))}
          </div>

          {/* Fixed Delete Button on Right */}
          <div className="shrink-0 ml-2">
            <IconWithToast
              icon={
                <IconWrapper
                  bgColor="bg-[#FF000026]"
                  size="w-11 h-11"
                  disableInteraction
                >
                  <DeleteIcon />
                </IconWrapper>
              }
            />
          </div>
        </div>

        {/* Input */}
        <div className="relative flex items-start gap-2 px-4 py-3 text-gray-700">
          <span
            onClick={toggleEmojiPicker}
            className="text-xl cursor-pointer hover:text-black flex items-start transition-colors duration-200"
          >
            {emoji}
          </span>

          {showEmojiPicker && (
            <div className="absolute z-50 top-10 mt-2 left-0 animate-fadeIn">
              <EmojiPicker
                onSelect={(e) => {
                  setEmoji(e);
                  setShowEmojiPicker(false);
                  if (error) setError("");
                }}
              />
            </div>
          )}
          <div className="flex flex-grow">
            <textarea
              placeholder="How are you feeling today?"
              className="flex-1 resize-none outline-none text-sm bg-transparent transition-all duration-200 ease-in-out focus:text-gray-900"
              rows={3}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
        </div>
        <div className="h-5 px-4 pb-1">
          {error && (
            <div className="text-red-500 text-xs animate-slideIn">{error}</div>
          )}
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
            className={`cursor-pointer text-[#5057EA] hover:text-[#3e45c7] transition-all duration-200 transform ${
              isSubmitting ? "scale-90 opacity-50" : "scale-100 opacity-100"
            }`}
            onClick={() => {
              if (!isSubmitting) handlePublish();
            }}
          >
            <SendIcon />
          </div>

          <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
            <SignInForm onSubmit={() => setShowSignIn(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PostInputBox;
