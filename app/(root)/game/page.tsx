"use client"
import { Nav } from '@/components/nav';
import React, { useState, useEffect, useCallback } from 'react';

type ObstacleType = 'spike' | 'block';

interface Obstacle {
  x: number;
  type: ObstacleType;
}

const Page: React.FC = () => {
  const [playerY, setPlayerY] = useState<number>(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const jumpHeight: number = 120;
  const jumpDuration: number = 700; // ms
  const gameSpeed: number = 5;

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setPlayerY(jumpHeight);
      setTimeout(() => {
        setIsJumping(false);
        setPlayerY(0);
      }, jumpDuration);
    }
  }, [isJumping, gameOver]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('geometryDashHighScore');
    if (storedHighScore) setHighScore(parseInt(storedHighScore, 10));

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setObstacles(prev => [
          ...prev.filter(obs => obs.x > -50).map(obs => ({ ...obs, x: obs.x - gameSpeed })),
          ...(Math.random() < 0.02 ? [{ x: 400, type: Math.random() < 0.5 ? 'spike' : 'block' } as Obstacle] : [])
        ]);
        setScore(prev => prev + 1);
      }
    }, 20);

    const collisionCheck = setInterval(() => {
      const playerRect = { x: 50, y: 50 - playerY, width: 30, height: 30 };
      obstacles.forEach(obs => {
        const obsRect = { x: obs.x, y: obs.type === 'spike' ? 70 : 50, width: 30, height: 30 };
        if (
          playerRect.x < obsRect.x + obsRect.width &&
          playerRect.x + playerRect.width > obsRect.x &&
          playerRect.y < obsRect.y + obsRect.height &&
          playerRect.y + playerRect.height > obsRect.y
        ) {
          handleGameOver();
        }
      });
    }, 20);

    return () => {
      clearInterval(gameLoop);
      clearInterval(collisionCheck);
    };
  }, [obstacles, playerY, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('geometryDashHighScore', score.toString());
    }
  };

  const restartGame = () => {
    setPlayerY(0);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') jump();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div className="bg-background min-h-screen">
      <Nav />
      <div className="container mx-auto p-4">
        <div
          className="relative w-full h-64 bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden cursor-pointer rounded-lg"
          onClick={jump}
        >
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-12 bg-gray-800" />

          {/* Player */}
          <div
            className="absolute w-8 h-8 bg-yellow-400 transition-all duration-500"
            style={{ bottom: `${12 + playerY}px`, left: '50px' }}
          />

          {/* Obstacles */}
          {obstacles.map((obs, index) => (
            <div
              key={index}
              className={`absolute w-8 h-8 ${obs.type === 'spike' ? 'bg-red-500' : 'bg-gray-600'}`}
              style={{
                bottom: obs.type === 'spike' ? '12px' : '12px',
                left: `${obs.x}px`,
                clipPath: obs.type === 'spike' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            />
          ))}

          {/* Score */}
          <div className="absolute top-2 left-2 text-xl font-bold text-white">Score: {score}</div>

          {/* Death Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">Game Over</h2>
                <p className="text-xl mb-2 dark:text-white">Score: {score}</p>
                <p className="text-xl mb-4 dark:text-white">High Score: {highScore}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={restartGame}
                >
                  Play Again
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