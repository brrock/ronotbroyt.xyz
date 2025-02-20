"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Youtube } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

export function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const response = await fetch('/api/youtube-videos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube videos');
        }

        const data = await response.json();
        setVideos(data.slice(0, 2)); // Reduce to 2 videos
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('Could not load videos');
        setIsLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  if (isLoading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center">
        <Youtube className="mr-2 text-red-600 size-5" /> Latest Videos
      </h2>
      
      {videos.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No videos available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title} 
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-base mb-2 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground ">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                    className="h-7 px-2"
                  >
                    Watch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-3">
        <Button 
          asChild 
          variant="link"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          <a href="https://www.youtube.com/@RoNotBroYT" target="_blank" rel="noopener noreferrer">
            View All Videos
          </a>
        </Button>
      </div>
    </div>
  );
} 