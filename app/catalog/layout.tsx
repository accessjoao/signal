import type { ReactNode } from "react";

type CatalogLayoutProps = {
  children: ReactNode;
};

export default function CatalogLayout({
  children,
}: CatalogLayoutProps) {
  return children;
}
