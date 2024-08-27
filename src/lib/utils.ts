import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns'
import { enGB } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalise(string: string): string{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatDate(date: Date): string {
  return format(date, "P", { locale: enGB })
}
