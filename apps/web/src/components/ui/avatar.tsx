import { type VariantProps, tv } from "tailwind-variants";
import { useState } from "react";

const avatar = tv({
  base: [
    "inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
    "-outline-offset-1 outline-1 outline-fg/(--ring-opacity)",
  ],
  variants: {
    shape: {
      square: "rounded-(--avatar-radius) *:rounded-(--avatar-radius)",
      circle: "rounded-full *:rounded-full",
    },
    size: {
      "extra-small": "size-5 *:size-5",
      small: "size-6 *:size-6",
      medium: "size-8 *:size-8",
      large: "size-10 *:size-10",
      "extra-large": "size-12 *:size-12",
    },
  },
});

interface AvatarProps extends VariantProps<typeof avatar> {
  src?: string | null;
  initials?: string;
  alt?: string;
  className?: string;
}

const Avatar = ({
  src = null,
  shape = "circle",
  size = "medium",
  initials,
  alt = "",
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) => {
  const [source, setSource] = useState<string | null>(src);
  return (
    <span
      data-slot="avatar"
      {...props}
      className={avatar({ shape, size, className })}
    >
      {initials && (
        <svg
          className="size-full select-none fill-current p-[5%] font-medium text-[48px] uppercase"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
          role="img"
          aria-label={alt}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {source && (
        <img
          className="size-full"
          src={source}
          alt={alt}
          onError={() => setSource(null)}
        />
      )}
    </span>
  );
};

export type { AvatarProps };
export { Avatar };
