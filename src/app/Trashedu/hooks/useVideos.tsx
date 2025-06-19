import { useState, useEffect } from "react";

export const useVideos = (query = "Daur ulang sampah", maxResults = 100) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
            query
          )}&type=video&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        const videoIds = data.items.map((item) => item.id.videoId).join(",");
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
        );

        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch video details");
        }

        const detailsData = await detailsResponse.json();

        const formattedVideos = data.items.map((item) => {
          const videoDetails = detailsData.items.find(
            (detail) => detail.id === item.id.videoId
          );
          const duration = videoDetails
            ? formatDuration(videoDetails.contentDetails.duration)
            : "00:00";

          return {
            id: item.id.videoId,
            title: item.snippet.title,
            excerpt: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            duration: duration,
            date: new Date(item.snippet.publishedAt).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ),
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          };
        });

        setVideos(formattedVideos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query, maxResults]);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? match[1].replace("H", "") : 0;
    const minutes = match[2] ? match[2].replace("M", "") : 0;
    const seconds = match[3] ? match[3].replace("S", "") : 0;

    let formattedDuration = "";

    if (hours > 0) {
      formattedDuration += `${hours}:`;
      formattedDuration += minutes.toString().padStart(2, "0") + ":";
    } else {
      formattedDuration += `${minutes}:`;
    }

    formattedDuration += seconds.toString().padStart(2, "0");

    return formattedDuration;
  };

  return { videos, loading, error };
};
