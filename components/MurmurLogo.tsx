import React from 'react';

interface Props {
  className?: string;
}

/**
 * @description - Renders the Murmur logo (a small murmuration of starlings). Uses "currentColor" so it can be colored with Tailwind text classes.
 * @returns {React.FC}
 */
const MurmurLogo = ({ className }: Props) => {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-label="Murmur logo">
      <circle cx="5" cy="23" r="2" />
      <circle cx="9.5" cy="18" r="2.6" />
      <circle cx="15" cy="13.5" r="3.2" />
      <circle cx="21.5" cy="10.5" r="2.8" />
      <circle cx="27" cy="10" r="2.1" />
      <circle cx="13" cy="24" r="1.7" />
      <circle cx="19" cy="19.5" r="2.2" />
      <circle cx="25" cy="17" r="1.6" />
      <circle cx="29" cy="15" r="1.1" />
    </svg>
  );
};

export default MurmurLogo;
