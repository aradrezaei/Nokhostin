import { ReactNode } from 'react';

export interface CTAButtonProps {
  label: string;
  href: string;
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export type CTAVariant = 'default' | 'accent';
export type CTAAlignment = 'center' | 'left';

export interface CTAProps {
  /** Optional premium badge text displayed above the main heading */
  badge?: string;
  /** Main high-impact call to action title */
  title: ReactNode;
  /** Detailed supporting copy to build trust and context */
  description: ReactNode;
  /** Primary call to action button parameters */
  primaryButton: CTAButtonProps;
  /** Optional secondary call to action button parameters */
  secondaryButton?: CTAButtonProps;
  /** Visual theme variant determining the overall illumination profile */
  variant?: CTAVariant;
  /** Structural text alignment layout */
  alignment?: CTAAlignment;
  /** Additional custom styles for layout positioning injection */
  className?: string;
}