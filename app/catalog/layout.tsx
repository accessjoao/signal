import type { ReactNode } from "react";

type CatalogLayoutProps = {
  children: ReactNode;
  drawer: ReactNode;
};

export default function CatalogLayout({
  children,
  drawer,
}: CatalogLayoutProps) {
  return (
    <>
      {children}
      {drawer}
    </>
  );
}
