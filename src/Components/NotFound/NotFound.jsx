import React from "react";
import { SectionContainer, Card, Button } from "../UI";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <SectionContainer
      title="Page not found"
      subtitle="We couldn't find what you were looking for"
    >
      <Card className="max-w-md mx-auto text-center p-10 flex flex-col items-center gap-6">
        <div className="text-7xl font-bold text-brand-600">404</div>
        <p className="text-surface-600">
          The page you are trying to access does not exist or has been moved.
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Card>
    </SectionContainer>
  );
}
