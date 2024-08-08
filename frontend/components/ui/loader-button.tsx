import { Loader2, LucideIcon } from "lucide-react";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

type LoaderButtonProps = ButtonProps & {
  isLoading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
};

export const LoaderButton = React.forwardRef<
  HTMLButtonElement,
  LoaderButtonProps
>(({ isLoading, icon: Icon, children, disabled = false }, ref) => {
  console.log(disabled);
  if (isLoading) {
    return (
      <Button ref={ref} disabled={isLoading} className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {children}
      </Button>
    );
  }
  if (disabled) {
    return (
      <Button ref={ref} disabled={true} className="w-full">
        {Icon ? (
          <>
            <Icon size={18} className="mr-3" />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }

  return (
    <Button ref={ref} disabled={isLoading} className="w-full">
      {Icon ? (
        <>
          <Icon size={18} className="mr-3" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
});
LoaderButton.displayName = "LoaderButton";
