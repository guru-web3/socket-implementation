"use client";

import useSwapStore from "@/store/swapStore";
import { ReactNode, useEffect, useState } from "react";

export default function ZustandProvider({ children }: { children: ReactNode }) {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      await useSwapStore.persist.rehydrate();
      setRehydrated(true);
    };

    init();
  }, []);

  return <>{rehydrated ? children : <></>}</>;
}
