"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
}

const ChristmasCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Calculate time remaining until Christmas
    const christmasDate = new Date('December 25, 2024 07:00:00');
    const currentDate = new Date();
    const timeDiff = christmasDate.getTime() - currentDate.getTime();
    setTimeRemaining(Math.max(0, timeDiff));

    // Generate random snowflakes
    const generateSnowflakes = () => {
      const newSnowflakes: Snowflake[] = [];
      for (let i = 0; i < 50; i++) {
        newSnowflakes.push({
          x: Math.random() * window.innerWidth,
          y: -Math.random() * window.innerHeight,
          size: Math.random() * 20 + 10,
          rotation: Math.random() * 360,
          speed: Math.random() * 2 + 1,
        });
      }
      setSnowflakes(newSnowflakes);
    };
    generateSnowflakes();

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1000);
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((snowflake) => ({
          ...snowflake,
          y: snowflake.y + snowflake.speed,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <Card className="w-full max-w-xl relative">
      <CardHeader>
        <CardTitle className='text-center'>Christmas Countdown - Merry Christmas </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <h2 className="text-6xl font-bold">{days}</h2>
            <p className="text-gray-500">Days</p>
          </div>
          <div className="mx-4">
            <h2 className="text-6xl font-bold">{hours}</h2>
            <p className="text-gray-500">Hours</p>
          </div>
          <div className="mx-4">
            <h2 className="text-6xl font-bold">{minutes}</h2>
            <p className="text-gray-500">Minutes</p>
          </div>
          <div className="ml-4">
            <h2 className="text-6xl font-bold">{seconds}</h2>
            <p className="text-gray-500">Seconds</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Image
            src="/santa.png"
            alt="Santa"
            className="w-20 h-20"
            width={200}
            height={200}
                  
          />
        </div>
      </CardContent>
      {snowflakes.map((snowflake, index) => (
        <motion.div
          key={index}
          initial={{
            x: snowflake.x,
            y: snowflake.y,
            rotate: snowflake.rotation,
          }}
          animate={{
            y: window.innerHeight + snowflake.size,
            transition: {
              duration: snowflake.speed,
              repeat: Infinity,
              repeatType: 'loop',
            },
          }}
          style={{
            position: 'absolute',
            width: snowflake.size,
            height: snowflake.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </Card>
  );
};

export default ChristmasCountdown;