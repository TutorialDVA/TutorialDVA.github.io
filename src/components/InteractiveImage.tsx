import React, { useState } from 'react';

interface HighlightAreaProps {
  // Base image properties
  imageSrc: string;
  imageAlt: string;

  // Optional className for the container
  className?: string;

  // Highlight areas as percentage of image dimensions
  highlightAreas: Array<{
    id: string;
    x: number; // percentage from left
    y: number; // percentage from top
    width: number; // percentage of image width
    height: number; // percentage of image height
    color?: string; // optional highlight color
    onClick?: () => void; // optional click handler
    itemSrc?: string;
  }>;
}

// CSS styles as a JavaScript object
const styles = {
  container: {
    position: 'relative',
    display: 'inline-block'
  },
  image: {
    maxWidth: '100%',
    height: 'auto'
  },
  highlightArea: {
    position: 'absolute',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    border: '2px solid rgba(255, 255, 0, 0.5)'
  },
  highlightAreaHover: {
    opacity: 0.8
  }
};

export const InteractiveImage: React.FC<HighlightAreaProps> = ({
  imageSrc,
  imageAlt,
  className = '',
  highlightAreas = [],
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {/* Base image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        style={styles.image}
        onLoad={handleImageLoad}
      />

      {/* Interactive highlight areas */}
      {imageLoaded && highlightAreas.map(area => (
        <div
          key={area.id}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            //border: '2px solid rgba(255, 255, 0, 0.5)',
            left: `${area.x}%`,
            top: `${area.y}%`,
            width: `${area.width}%`,
            height: `${area.height}%`,
            //backgroundColor: area.color || 'rgba(255, 255, 0, 0.3)',
            ...(hoveredArea === area.id ? styles.highlightAreaHover : {})
          }}
          onClick={area.onClick}
          onMouseEnter={() => setHoveredArea(area.id)}
          onMouseLeave={() => setHoveredArea(null)}
          role="button"
          aria-label={`Interactive area ${area.id}`}
        >
          {area.itemSrc ? <img src={area.itemSrc} style={{ left: `${area.x}%`, top: `${area.y}%`, right: `${area.width}%`, bottom: `${area.height}%`, zIndex: 1, width: '100%', height: '100%' }} /> : null}
        </div>
      ))}
    </div>
  );
};