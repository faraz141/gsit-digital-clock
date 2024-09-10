'use client';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return '';
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, '0')
      : (time.getHours() % 12 || 12).toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/videos/background2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-[-1]" />

      {/* Digital Clock Content */}
      <Card className="p-8 shadow-lg rounded-2xl bg-opacity-60 bg-white backdrop-blur-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold tracking-tight">Digital Clock</div>
          <div className="text-sm text-dark-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes and seconds.
          </div>
          <div className="text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
          <div className="mt-4 flex items-center">
            <Button
              className="mr-2 font-bold"
              onClick={() => setIs24Hour(true)}
              variant={is24Hour ? 'default' : 'outline'}
            >
              24-Hour Format
            </Button>
            <Button
              className="mr-2 font-bold"
              onClick={() => setIs24Hour(false)}
              variant={!is24Hour ? 'default' : 'outline'}
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
