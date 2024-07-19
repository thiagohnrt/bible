import { Books } from "@/components/book/Books";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface Props {
  params: { version: string };
}

export default function VersionPage({ params: { version } }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <Books version={version} />
    </Suspense>
  );
}

function Loading() {
  return (
    <>
      {"."
        .repeat(66)
        .split(".")
        .map((v, i) => {
          return (
            <div className="py-4" key={i}>
              <Skeleton className="h-6" />
            </div>
          );
        })}
    </>
  );
}
