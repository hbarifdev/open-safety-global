import React from 'react';
import Image from './Image'; 
import anim from '/assets/images/anim.png'; 

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={anim}
        alt="Open Safety Equipment Ltd"
        title="Open Safety Equipment Ltd"
        width={70}
        height={70}
        sizes="(max-width: 768px) 34px, 34px"
      />
    </div>
  );
};

export default Logo;
