import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GalleryPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 1' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 2' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 3' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 4' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 5' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 6' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 7' },
    { src: '/assets/images/Bergen-2021.png', alt: 'Image 8' },
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
            <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="cursor-pointer"
            onClick={() => openLightbox(index)}
            />
        ))}

        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={images}
            index={currentIndex}
        />
        </div>
    </div>
  );
};

export default GalleryPage;
