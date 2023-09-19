import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    bgColor: "bg-emerald-500/10",
    color: "text-emerald-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    bgColor: "bg-orange-500/10",
    color: "text-orange-700",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    bgColor: "bg-pink-500/10",
    color: "text-pink-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    bgColor: "bg-green-500/10",
    color: "text-green-700",
  },
];