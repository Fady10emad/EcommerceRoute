import React from "react";
import useAllCategories from "../../CustomHooks/useAllCategories";
import { SectionContainer, Card } from "../UI";

export default function Categories() {
  const { data, isError, isFetching, isLoading } = useAllCategories();

  if (isError) {
    return (
      <h1 className="text-center text-red-600">
        There was an error fetching categories.
      </h1>
    );
  }

  if (isLoading) {
    return (
      <SectionContainer title="Loading categories" subtitle="Please wait...">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={`cat-skel-${i}`}
              className="h-72 animate-pulse bg-surface-100"
            />
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <>
      <SectionContainer
        title="Our Categories"
        subtitle="Explore product groupings"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.data.data.map((item) => (
            <Card key={item._id} interactive className="overflow-hidden">
              <div className="aspect-video w-full bg-surface-100 flex items-center justify-center overflow-hidden rounded-lg mb-4">
                <img
                  className="object-contain h-full w-full"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              <h5 className="text-lg font-semibold tracking-tight mb-1">
                {item.name}
              </h5>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
