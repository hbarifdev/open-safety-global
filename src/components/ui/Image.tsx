import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  title?: string;
  srcSet?: string;
  sizes?: string;
  blurDataURL?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/fallback.png',
  width,
  height,
  className = '',
  loading = 'lazy',
  title,
  srcSet,
  sizes,
  blurDataURL,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate dynamic classes for width and height
  const sizeClass = `${width ? `w-${width}` : 'w-auto'} ${height ? `h-${height}` : 'h-auto'}`;

  return (
    <div className={`relative overflow-hidden ${sizeClass} ${className}`}>
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-opacity duration-500"
        />
      )}

      <img
        src={imgSrc}
        alt={alt}
        title={title || alt}
        loading={loading}
        onError={() => setImgSrc(fallbackSrc)}
        onLoad={() => setIsLoaded(true)}
        srcSet={srcSet}
        sizes={sizes}
        className={`object-contain w-full h-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default Image;
