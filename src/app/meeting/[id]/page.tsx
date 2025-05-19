"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, VideoIcon, VideoOff, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MeetingRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    // Set up meeting timer
    if (isConnected) {
      setCountdown(1800); // 30 minutes in seconds
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }

    return () => clearTimeout(timer);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const endCall = () => {
    router.push("/appointments");
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Appointment with Dr. Sarah Johnson
        </h1>
        <div className="bg-black/10 px-3 py-1 rounded-full text-sm">
          {isConnected
            ? `Time remaining: ${formatTime(countdown)}`
            : "Connecting..."}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Doctor's video */}
        <div className="relative bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          {isConnected ? (
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Doctor video feed"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="animate-pulse mb-2">●●●</div>
              <p>Waiting for doctor to join...</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            Dr. Sarah Johnson
          </div>
        </div>

        {/* Patient's video */}
        <div className="relative bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          {isVideoOn ? (
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Your video feed"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <p>Your camera is off</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            You
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card className="mt-auto">
        <CardContent className="p-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={isMicOn ? "outline" : "destructive"}
              size="icon"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant={isVideoOn ? "outline" : "destructive"}
              size="icon"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? (
                <VideoIcon className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
            <Button variant="destructive" size="icon" onClick={endCall}>
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
