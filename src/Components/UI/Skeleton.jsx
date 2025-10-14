import React from "react";
import PropTypes from "prop-types";

export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-md bg-surface-200 ${className}`} />
  );
}
Skeleton.propTypes = { className: PropTypes.string };

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => {
        const key = `line-${i}`;
        return (
          <Skeleton
            key={key}
            className={`h-3 ${i === 0 ? "w-3/4" : "w-full"}`}
          />
        );
      })}
    </div>
  );
}
SkeletonText.propTypes = { lines: PropTypes.number };

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-surface-200 p-5 bg-white shadow-soft">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <SkeletonText lines={2} />
      <div className="flex justify-between mt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
