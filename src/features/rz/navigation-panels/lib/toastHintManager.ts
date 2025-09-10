import { CSSProperties } from "react";
import { ExternalToast, toast } from "sonner";

const customStyle: CSSProperties = {
  borderRadius: 0,
  border: "3px solid black",
  textAlign: "center",
  padding: "3px",
} as const;

export const toastHintManager = () => {
  const show = (message: string, options?: ExternalToast) => {
    return toast(message, {
      ...options,
      style: customStyle,
    });
  };

  const hide = (id: string | number) => {
    return toast.dismiss(id);
  };

  const clean = () => {
    return toast.dismiss();
  };

  return { show, hide, clean };
};
