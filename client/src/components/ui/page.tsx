import { Link } from "react-router-dom";
import { Button } from "./button";
import Heading from "./heading";
import { Plus } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const Page = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 space-y-2 pt-6 p-8", className)}
      {...props}
    />
  )
);

Page.displayName = "Page";

interface PageHeaderProps {
  heading: string;
  description: string;
  buttonLink: string;
}

const PageHeader = ({ heading, description, buttonLink }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Heading
        className="!gap-y-2 items-start"
        title={heading}
        description={description}
      />
      <Button asChild>
        <Link to={buttonLink} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </Button>
    </div>
  );
};

export { Page, PageHeader };