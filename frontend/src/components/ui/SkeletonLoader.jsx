import React from 'react';
import { Skeleton } from '@mui/material';

export default function SkeletonLoader({ children, loading, variant = 'text', width = '100%', height = '100%' }) {
  if (loading) {
    return (
      <Skeleton variant={variant} width={width} height={height} />
    );
  }

  return <>{children}</>;
}
