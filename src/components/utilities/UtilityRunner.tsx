"use client";

import { utilityComponents } from "./UtilityPanels";

interface UtilityRunnerProps {
  componentId: string;
}

export function UtilityRunner({ componentId }: UtilityRunnerProps) {
  const Component = utilityComponents[componentId];
  if (!Component) return <p className="text-zinc-500">Tool not available.</p>;
  return <Component />;
}
