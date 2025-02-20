// generated by claude.ai
"use client";
import { Nav } from "@/components/nav";
import React, { useState, useEffect, useCallback } from "react";

interface Cactus {
  x: number;
  height: number;
}

const Page: React.FC = () => {
  const [playerY, setPlayerY] = useState<number>(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [cacti, setCacti] = useState<Cactus[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Constants
  const JUMP_HEIGHT = 120;
  const JUMP_DURATION = 500; // ms
  const BASE_SPEED = 6;
  const ACCELERATION = 0.0005;
  const CACTUS_WIDTH = 20;
  const PLAYER_WIDTH = 20;
  const PLAYER_HEIGHT = 30;

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setPlayerY(JUMP_HEIGHT);
      
      setTimeout(() => {
        if (!gameOver) {
          setIsJumping(false);
          setPlayerY(0);
        }
      }, JUMP_DURATION);
    }
  }, [isJumping, gameOver]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("dinoHighScore");
    if (storedHighScore) setHighScore(parseInt(storedHighScore, 10));

    let lastTime = performance.now();
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Toggle running animation
        setIsRunning(prev => !prev);
        
        // Move cacti
        setCacti((prev) => {
          const speed = BASE_SPEED + (score * ACCELERATION);
          return [
            ...prev
              .filter((cactus) => cactus.x > -CACTUS_WIDTH)
              .map((cactus) => ({ ...cactus, x: cactus.x - speed * (deltaTime / 16) })),
            // Add new cactus with 2% chance per frame
            ...(Math.random() < 0.01 && prev.length < 3 && 
               (!prev.length || prev[prev.length - 1].x < 400)
              ? [{ 
                  x: 640,
                  height: Math.random() < 0.5 ? 30 : 45
                }] 
              : []),
          ];
        });
        
        setScore((prev) => prev + 1);
      }
    }, 16);

    const collisionCheck = setInterval(() => {
      if (gameOver) return;

      const playerHitbox = {
        x: 50 + 5,
        y: 50 - playerY + 5,
        width: PLAYER_WIDTH - 10,
        height: PLAYER_HEIGHT - 10
      };

      cacti.forEach((cactus) => {
        const cactusHitbox = {
          x: cactus.x + 5,
          y: 50,
          width: CACTUS_WIDTH - 10,
          height: cactus.height - 5
        };

        if (
          playerHitbox.x < cactusHitbox.x + cactusHitbox.width &&
          playerHitbox.x + playerHitbox.width > cactusHitbox.x &&
          playerHitbox.y < cactusHitbox.y + cactusHitbox.height &&
          playerHitbox.y + playerHitbox.height > cactusHitbox.y
        ) {
          handleGameOver();
        }
      });
    }, 16);

    return () => {
      clearInterval(gameLoop);
      clearInterval(collisionCheck);
    };
  }, [cacti, playerY, gameOver, score]);

  const handleGameOver = () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("dinoHighScore", score.toString());
    }
  };

  const restartGame = () => {
    setPlayerY(0);
    setCacti([]);
    setGameOver(false);
    setScore(0);
    setIsJumping(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "ArrowUp") && !e.repeat) {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump]);

  return (
    <div className="bg-background min-h-screen">
      <Nav />
      <div className="container mx-auto p-4">
        <div
          className="relative w-full h-64 bg-white dark:bg-gray-900 overflow-hidden cursor-pointer rounded-lg select-none"
          onClick={jump}
        >
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-12 bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700" />
          
          {/* Ground dots */}
          <div className="absolute bottom-0 w-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-2 w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"
                style={{ left: `${i * 20}px` }}
              />
            ))}
          </div>

          {/* Dino */}
          <div
            className="absolute transition-transform"
            style={{
              bottom: `${12 + playerY}px`,
              left: "50px",
              width: '20px',
              height: '30px',
              transitionProperty: 'transform, bottom',
              transitionDuration: `${JUMP_DURATION}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="w-full h-full bg-gray-800 dark:bg-gray-200" style={{
              clipPath: isJumping 
                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 60% 80%, 0% 80%)'
                : isRunning
                ? 'polygon(0% 0%, 100% 0%, 100% 80%, 60% 80%, 60% 100%, 0% 100%)'
                : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }} />
          </div>

          {/* Cacti */}
          {cacti.map((cactus, index) => (
            <div
              key={index}
              className="absolute bg-gray-800 dark:bg-gray-200"
              style={{
                bottom: '12px',
                left: `${cactus.x}px`,
                width: `${CACTUS_WIDTH}px`,
                height: `${cactus.height}px`,
                clipPath: 'polygon(20% 0%, 80% 0%, 80% 100%, 60% 100%, 60% 20%, 40% 20%, 40% 100%, 20% 100%)'
              }}
            />
          ))}

          {/* Score */}
          <div className="absolute top-2 right-2 text-xl font-mono text-gray-800 dark:text-gray-200">
            {String(score).padStart(5, '0')}
          </div>

          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
                  GAME OVER
                </h2>
                <p className="font-mono mb-2 dark:text-white">
                  SCORE: {String(score).padStart(5, '0')}
                </p>
                <p className="font-mono mb-4 dark:text-white">
                  HI: {String(highScore).padStart(5, '0')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Press SPACE to Jump
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={restartGame}
                >
                  RESTART
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
