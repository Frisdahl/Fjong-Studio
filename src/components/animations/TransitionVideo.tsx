import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface TransitionVideoProps extends BoxProps {
  src: string;
  delay?: number;
  duration?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playOnReveal?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  mixBlendMode?: BoxProps["mixBlendMode"];
  onTransitionComplete?: () => void;
  onPlayClick?: () => void;
}

const TransitionVideo = ({
  src,
  delay = 0,
  duration = 1,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
  playOnReveal = false,
  objectFit = "cover",
  mixBlendMode = "normal",
  onTransitionComplete,
  onPlayClick,
  ...boxProps
}: TransitionVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Handle video ready state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video loaded metadata
    const handleLoaded = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", handleLoaded);

    // Initial opacity state
    gsap.set(containerRef.current, { opacity: 0 });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  // Handle transition animation
  useEffect(() => {
    if (!containerRef.current || !videoReady) return;

    const videoTl = gsap.timeline();

    videoTl.to(containerRef.current, {
      opacity: 1,
      duration: duration,
      ease: "power2.out",
      delay: delay,
      onStart: () => {
        // Auto-play video when animation starts (if enabled)
        if (playOnReveal && videoRef.current && videoRef.current.paused) {
          const playPromise = videoRef.current.play();

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn("Auto-play prevented by browser:", error);
            });
          }
        }
      },
      onComplete: () => {
        // Call completion callback if provided
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      },
    });

    return () => {
      videoTl.kill();
    };
  }, [videoReady, delay, duration, playOnReveal, onTransitionComplete]);

  // Handle video click
  const handleVideoClick = () => {
    if (onPlayClick && videoRef.current) {
      onPlayClick();
    } else if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      width="100%"
      height="100%"
      cursor={onPlayClick || !controls ? "pointer" : "default"}
      {...boxProps}
    >
      <Box
        as="video"
        ref={videoRef}
        width="100%"
        height="100%"
        objectFit={objectFit}
        controls={controls}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        src={src}
        onClick={handleVideoClick}
        sx={{ mixBlendMode }}
      />
    </Box>
  );
};

export default TransitionVideo;
