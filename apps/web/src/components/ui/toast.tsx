import {
  Toaster as ToasterPrimitive,
  type ToasterProperties,
} from "@pheralb/toast";
import { useTheme } from "../theme-provider";
import type { FunctionComponent } from "react";
import { IconX } from "justd-icons";

const Toast: FunctionComponent<ToasterProperties> = props => {
  const { theme = "system" } = useTheme();

  return (
    <ToasterPrimitive
      theme={theme}
      position="top-right"
      toastOptions={{
        font: "font-sans",
        animationOnClose: "slide",
        classNames: {
          toast: "toast border-0! inset-ring! inset-ring-fg/10! font-sans",
          actions: {
            actionBtn: "bg-primary! hover:bg-primary/90! text-primary-fg!",
            closeBtn: "group",
            container: "actions",
          },
        },
        defaultCloseContent: (
          <IconX className="size-3 group-hover:text-muted-fg" />
        ),
      }}
      {...props}
    />
  );
};

export { Toast };
