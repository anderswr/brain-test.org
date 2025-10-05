// /lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Kombinerer Tailwind-klasser trygt (samme som shadcn/ui bruker) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
