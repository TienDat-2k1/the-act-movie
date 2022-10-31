import React from 'react';
import './Skeleton.scss';

type SkeletonOwn = {
  variant?: 'rect' | 'cir' | 'text';
  className?: string;
  children?: React.ReactNode;
  style?: {
    width: string;
    height: string;
  } & any;
};

type SkeletonProps = SkeletonOwn &
  Omit<React.ComponentProps<'div'>, keyof SkeletonOwn>;

const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  className,
  children,
  ...otherProps
}) => {
  return (
    <div
      className={`skeleton ${variant ? `skeleton--${variant}` : ''}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};
export default Skeleton;
