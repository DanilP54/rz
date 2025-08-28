import {ExternalToast, toast} from "sonner";

export const useToastHintManager = () => {
    const show = (message: string, options?: ExternalToast) => {
        return toast(message, {
            ...options,
            style: {
                borderRadius: 0,
                border: "3px solid black",
                textAlign: "center",
                padding: "3px",
            },
        });
    };

    const hide = (id: string | number) => {
        return toast.dismiss(id);
    };

    const clean = () => {
        return toast.dismiss();
    };

    return {show, hide, clean};
};