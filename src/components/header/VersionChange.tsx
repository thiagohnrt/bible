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
import { useCallback, useContext, useEffect, useState } from "react";
import { BibleContext } from "@/contexts/bibleContext";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export function VersionChange({ children }: Props) {
  const [versions, setVersions] = useState<Version[]>([]);
  const { version: versionCurrent, setVersion } = useContext(BibleContext);
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
    setVersion(version.short);
    router.push(path.replace(versionCurrent, version.short));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
