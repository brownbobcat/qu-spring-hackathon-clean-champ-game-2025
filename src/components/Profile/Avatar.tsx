import React from "react";

interface AvatarProps {
  avatarId: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  avatarId,
  size = "md",
  className = "",
}) => {
  const avatarOptions = [
    "👧",
    "👦",
    "👨",
    "👩",
    "🧑",
    "👱",
    "👴",
    "👵",
    "🧔",
    "👲",
    "👳",
    "👮",
    "👷",
    "👸",
    "🤴",
  ];

  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-4xl",
  };

  const avatarEmoji = avatarOptions[avatarId % avatarOptions.length] || "👤";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 ${sizeClasses[size]} ${className}`}
    >
      <span role="img" aria-label="avatar">
        {avatarEmoji}
      </span>
    </div>
  );
};

export default Avatar;
