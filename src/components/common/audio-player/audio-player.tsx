import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { cn } from "@/lib/utils";
import { User, Clock9 } from "lucide-react";
import { renderTimeCreatedAt } from "@/utils/time-handler";

interface AudioPlayerProps {
  src: string;
  title: string;
  authorName?: string;
  totalViews?: number;
  createdAt?: string;
  thumbnailUrl?: string;
  className?: string;
}

const CustomAudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  authorName,
  createdAt,
  thumbnailUrl = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop",
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.15)] z-50",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {/* Left side - Image and Title */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <div
                className={cn(
                  "w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
                  isPlaying && "animate-spin-slow"
                )}
              >
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                {authorName && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-nowrap">
                    <User size={12} />
                    <span>{authorName}</span>
                  </div>
                )}
              </div>
              {createdAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock9 size={12} />
                  <span>{renderTimeCreatedAt(createdAt)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <AudioPlayer
              src={src}
              autoPlay={false}
              showJumpControls={false}
              layout="stacked-reverse"
              onPlay={handlePlay}
              onPause={handlePause}
              className="custom-audio-player rounded-xl bg-slate-50 w-fit"
            />
          </div>

          <div></div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <div
                className={cn(
                  "w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
                  isPlaying && "animate-spin-slow"
                )}
              >
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </h3>
              {authorName && (
                <div className="flex items-center gap-1 text-xs text-gray-500 flex-nowrap">
                  <User size={12} />
                  <span>{authorName}</span>
                </div>
              )}
            </div>
          </div>
          <AudioPlayer
            src={src}
            autoPlay={false}
            showJumpControls={false}
            layout="stacked-reverse"
            onPlay={handlePlay}
            onPause={handlePause}
            className="custom-audio-player rounded-xl bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
