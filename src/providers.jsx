import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./libs/tanstack/tanstack";
import { MinuteProvider } from "./context/timeContext";

export function Providers({ children }) {
  return (
    <MinuteProvider>
      <HeroUIProvider>
        <ToastProvider />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </HeroUIProvider>
    </MinuteProvider>
  );
}
