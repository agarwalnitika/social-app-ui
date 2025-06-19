import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
  size?: string;
  rounded?: string;
  disableInteraction?: boolean;
  onClick?: () => void;
}

const IconWrapper = ({
  children,
  bgColor = "bg-white",
  size = "p-2",
  rounded = "rounded-[7px]",
  disableInteraction = false,
  onClick,
}: IconWrapperProps) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center ${size} ${bgColor} ${rounded} ${
        !disableInteraction && "cursor-pointer hover:opacity-90"
      } shadow-[#00000017] `}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
