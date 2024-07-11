"use client";

import { api, Version } from "@/services/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getVersion } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function VersionChange({ children, className }: Props) {
  const [versions, setVersions] = useState<Version[]>([]);
  const path = usePathname();
  const router = useRouter();

  const fetchVersions = useCallback(async () => {
    const data = await api.getVersions();
    setVersions(data);
  }, []);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  const onVersionSelected = (version: Version) => {
    const versionCurrent = getVersion(path);
    router.push(path.replace(versionCurrent, version.short));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-lvh w-lvw">
        <DialogHeader>
          <DialogTitle>Versões</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="pt-3">
          {versions.map((version, i) => {
            return (
              <DialogClose asChild key={i}>
                <button
                  type="button"
                  onClick={() => onVersionSelected(version)}
                  className="py-1 mb-1 flex justify-between gap-2 w-full outline-none"
                >
                  <span>{version.name}</span>
                  <span className="uppercase opacity-50">{version.short}</span>
                </button>
              </DialogClose>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
