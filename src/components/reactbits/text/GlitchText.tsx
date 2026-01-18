'use client';

import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = true,
  className = ''
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 #ff00ff' : 'none',
    '--before-shadow': enableShadows ? '5px 0 #00fff5' : 'none'
  };

  return (
    <div
      style={inlineStyles}
      data-text={children}
      className={`glitch-text ${enableOnHover ? 'glitch-hover' : 'glitch-always'} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlitchText;
