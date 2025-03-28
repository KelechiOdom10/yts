import { type ClassValue, clsx } from "clsx";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) =>
    twMerge(tailwind, className),
  );
}

const focusRing = tv({
  variants: {
    isFocused: { true: "outline-hidden ring-2 ring-ring/20" },
    isFocusVisible: { true: "outline-hidden ring-2 ring-ring/20" },
    isInvalid: { true: "ring-2 ring-danger/20" },
  },
});

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: "border-ring/70 forced-colors:border-[Highlight]" },
    isInvalid: { true: "border-danger/70 forced-colors:border-[Mark]" },
  },
});

const focusButtonStyles = tv({
  base: "outline outline-ring outline-offset-2 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export {
  composeTailwindRenderProps,
  focusRing,
  focusStyles,
  focusButtonStyles,
};
