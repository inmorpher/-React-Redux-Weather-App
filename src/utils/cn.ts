import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * A function for merging Tailwind CSS classes.
 *
 * @param inputs - The classes to merge.
 * @returns The merged classes.
 */
export const cn = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs));
