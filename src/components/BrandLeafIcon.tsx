import React from 'react';

interface BrandLeafIconProps {
  className?: string;
  size?: number;
  variant?: 'green' | 'white';
}

export const BrandLeafIcon: React.FC<BrandLeafIconProps> = ({
  className = 'w-6 h-6 object-contain',
  size = 24,
  variant = 'green',
}) => {
  const src =
    variant === 'white'
      ? '/assets/aistudio/leaf_icon_white.png'
      : '/assets/aistudio/leaf_icon_green.png';

  return (
    <img
      src={src}
      alt="AromaLokal Leaf Brand Icon"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
