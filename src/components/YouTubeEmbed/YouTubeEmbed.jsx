// components/YouTubeEmbed.jsx

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const YouTubeEmbed = ({ videoId, title }) => {
  return (
    <div className="youtube-container my-10">
      <LiteYouTubeEmbed noCookie id={videoId} title={title} />
    </div>
  );
};

export default YouTubeEmbed;
