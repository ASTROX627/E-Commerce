"use client";


import { createQueryClient } from "@/libs/react-query";
import { AppDispatch } from "@/stores/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function QueryProvider({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();

  const [queryClient] = useState(() => createQueryClient(dispatch));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
