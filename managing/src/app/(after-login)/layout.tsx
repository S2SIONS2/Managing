import MainNav from "@/components/mainNav";
import { ReactNode, Suspense } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<div>Loading ...</div>}>
        <MainNav />
      </Suspense>
      {children}
    </div>
  );
}