import STREAMING_PLATFORMS from "../constants/StreamingPlatforms.json";

export const transformStreamingPlatforms = platforms => {
  const filteredPlatforms = STREAMING_PLATFORMS.filter(platform => platforms.includes(platform.id));
  return filteredPlatforms.map(platform => ({ src: platform.src, name: platform.name }));
};