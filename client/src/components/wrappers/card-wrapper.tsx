import React from "react";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils"; 

export interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <Card className={cn("w-[450px] shadow-md", className)}>{children}</Card>
  );
};

export default CardWrapper;
