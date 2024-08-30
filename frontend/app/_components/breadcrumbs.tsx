"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "details");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href,
    };
  });

  return (
    <div
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-xs sm:text-sm py-2"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={`hover:text-violet-900 ${
              index === breadcrumbItems.length - 1
                ? "font-semibold text-primary"
                : ""
            }`}
            aria-current={
              index === breadcrumbItems.length - 1 ? "page" : undefined
            }
          >
            {item.label}
          </Link>
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
