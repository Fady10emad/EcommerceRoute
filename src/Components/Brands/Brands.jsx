import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { SectionContainer, Card } from "../UI";

export default function Brands() {
  // Function to fetch brands
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  // Fetch data using react-query
  const { data, isError, isLoading } = useQuery({
    queryKey: "AllBrands",
    queryFn: getAllBrands,
  });

  // Handle errors and loading states
  if (isError) {
    return (
      <h1 className="text-center text-red-600">
        There was an error fetching brands.
      </h1>
    );
  }

  if (isLoading) {
    return (
      <SectionContainer title="Loading brands" subtitle="Fetching list...">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={`brand-skel-${i}`}
              className="h-40 animate-pulse bg-surface-100"
            />
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <>
      <SectionContainer title="Our Brands" subtitle="Trusted names & partners">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.data.data.map((item) => (
            <Card
              key={item._id}
              interactive
              className="flex flex-col items-center py-6"
            >
              <div className="h-24 w-full flex items-center justify-center mb-4">
                <img
                  className="max-h-20 object-contain"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              <h6 className="text-sm font-semibold tracking-wide uppercase text-center">
                {item.name}
              </h6>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
