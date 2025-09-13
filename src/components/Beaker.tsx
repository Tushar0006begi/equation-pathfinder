import { useState } from 'react';
import { Chemical } from '@/types/chemistry';
import { cn } from '@/lib/utils';

interface BeakerProps {
  chemical?: Chemical;
  volume: number;
  maxVolume: number;
  label: string;
  isTarget?: boolean;
  isGlowing?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Beaker = ({ 
  chemical, 
  volume, 
  maxVolume, 
  label, 
  isTarget = false, 
  isGlowing = false,
  onClick,
  className 
}: BeakerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const fillPercentage = (volume / maxVolume) * 100;
  const fillHeight = Math.min(fillPercentage * 0.6, 60); // Max 60% of beaker height
  
  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-all duration-300 transform",
        isHovered && "scale-105",
        isGlowing && "animate-pulse",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Beaker Container */}
      <div className="relative w-24 h-32 mx-auto">
        {/* Beaker Glass */}
        <svg 
          width="96" 
          height="128" 
          viewBox="0 0 96 128" 
          className="absolute inset-0"
        >
          {/* Beaker outline */}
          <path
            d="M20 20 L20 70 Q20 80 25 85 L35 120 Q40 128 56 128 Q72 128 77 120 L87 85 Q92 80 92 70 L92 20 Z"
            fill="rgba(255, 255, 255, 0.1)"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="drop-shadow-md"
          />
          
          {/* Chemical liquid */}
          {chemical && volume > 0 && (
            <path
              d={`M25 ${128 - fillHeight} Q25 ${128 - fillHeight - 5} 30 ${128 - fillHeight} L${96 - 30} ${128 - fillHeight} Q${96 - 25} ${128 - fillHeight - 5} ${96 - 25} ${128 - fillHeight} L${96 - 13} ${128 - 15} Q${96 - 8} 128 56 128 Q24 128 19 ${128 - 15} Z`}
              fill={chemical.color}
              className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          )}
          
          {/* Meniscus effect */}
          {chemical && volume > 0 && (
            <ellipse
              cx="48"
              cy={128 - fillHeight}
              rx="22"
              ry="2"
              fill={chemical.color}
              opacity="0.8"
            />
          )}
          
          {/* Spout */}
          <path
            d="M92 25 Q98 22 100 25 Q98 28 92 25"
            fill="rgba(255, 255, 255, 0.1)"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        </svg>
        
        {/* Volume indicator */}
        <div className="absolute right-0 top-4 w-6 h-20 flex flex-col justify-end text-xs text-muted-foreground">
          <div className="border-l border-border pl-1">
            <div className="text-[8px]">100mL</div>
            <div className="h-4"></div>
            <div className="text-[8px]">50mL</div>
            <div className="h-4"></div>
            <div className="text-[8px]">0mL</div>
          </div>
        </div>
        
        {/* Glow effect */}
        {isGlowing && (
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg animate-pulse"></div>
        )}
      </div>
      
      {/* Label */}
      <div className="mt-2 text-center">
        <div className="font-semibold text-sm">{label}</div>
        {chemical && (
          <div className="text-xs text-muted-foreground mt-1">
            <div>{chemical.formula}</div>
            <div>{volume.toFixed(1)}mL</div>
          </div>
        )}
      </div>
      
      {/* Chemical info tooltip on hover */}
      {chemical && isHovered && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-popover border rounded-lg p-2 text-xs whitespace-nowrap z-10 shadow-lg">
          <div className="font-medium">{chemical.name}</div>
          <div className="text-muted-foreground">{chemical.description}</div>
        </div>
      )}
    </div>
  );
};