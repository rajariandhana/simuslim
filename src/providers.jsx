import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './libs/tanstack/tanstack';

export function Providers({children}) {
  return (
    <HeroUIProvider>
      <ToastProvider/>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </HeroUIProvider>
  )
}