'use client';

import { useTranslations } from 'next-intl';

interface UnderOfferBadgeProps {
  /** Use compact style for thumbnails/cards */
  compact?: boolean;
  /** Slightly wider compact badge for first thumbnail (between compact and full) */
  compactWider?: boolean;
  className?: string;
}

/**
 * Red diagonal "Under Offer" ribbon badge for property images.
 * Shown when property Status_ID === 7.
 */
export default function UnderOfferBadge({ compact = false, compactWider = false, className = '' }: UnderOfferBadgeProps) {
  const t = useTranslations('properties');
  const label = t('underOffer') || 'UNDER OFFER';

  const isSmall = compact || compactWider;
  const size = compactWider ? { wrap: 90, left: -22, top: 10, ribbon: 130, text: 'text-[9px]' } : compact ? { wrap: 80, left: -12, top: 8, ribbon: 120, text: 'text-[10px]' } : { wrap: 180, left: -45, top: 39, ribbon: 260, text: 'text-sm sm:text-base tracking-wider' };

  return (
    <div
      className={`under-offer-badge absolute left-0 top-0 z-10 overflow-hidden ${className}`}
      style={{ width: isSmall ? `${size.wrap}px` : '180px', height: isSmall ? `${size.wrap}px` : '180px' }}
      aria-hidden
    >
      <div
        className="under-offer-badge-ribbon flex items-center justify-center bg-red-600 text-white font-bold shadow-md"
        style={{
          position: 'absolute',
          left: `${size.left}px`,
          top: `${size.top}px`,
          width: `${size.ribbon}px`,
          transform: 'rotate(-45deg) translateX(-24px)',
          transformOrigin: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          backgroundColor: '#dc2626', /* red-600, ensures print uses color */
        }}
      >
        <span
          className={`whitespace-nowrap ${isSmall ? `${size.text} tracking-wide` : size.text}`}
          style={{ color: '#ffffff', textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}
        >
          {label.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
