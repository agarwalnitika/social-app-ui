import emojiList from "emoji.json";
import { useState } from "react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  const [search, setSearch] = useState("");

  const filteredEmojis = emojiList.filter((e) =>
    e.name?.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="p-[8px] rounded-2xl bg-gray-100 shadow-2xl">
      {/* Sticky Search Bar */}
      <div className=" pb-2 sticky top-0 z-10">
        <input
          type="text"
          placeholder="Search emoji..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-2xl focus:ring-2 ring-blue-300 bg-white"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-lg w-72">
        {/* Emoji grid */}
        <div className="max-h-60 grid grid-cols-8 gap-2 p-3 text-xl overflow-y-auto">
          {filteredEmojis.map((emoji) => (
            <button
              key={emoji.name}
              onClick={() => onSelect(emoji.char)}
              className="hover:scale-110 transition-transform cursor-pointer"
              title={emoji.name}
            >
              {emoji.char}
            </button>
          ))}

          {filteredEmojis.length === 0 && (
            <p className="col-span-full text-center text-sm text-gray-500">
              No emojis found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;
