import { Modal, ModalDialog } from "@mui/joy";
import { FC, PropsWithChildren, useRef } from "react";
import { Transition } from "react-transition-group";

const AnimatedModal: FC<
  PropsWithChildren<{
    open: boolean;
    layout?: "center" | "fullscreen";
    duration?: number;
    onClose?: () => void;
  }>
> = ({ open, layout, duration = 400, onClose, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Transition nodeRef={contentRef} in={open} timeout={duration}>
      {(state) => (
        <Modal
          keepMounted
          ref={contentRef}
          open={!["exited", "exiting"].includes(state)}
          onClose={onClose}
          slotProps={{
            backdrop: {
              sx: {
                transition: `opacity ${duration}ms, backdrop-filter ${duration}ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: "blur(8px)" },
                  entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  exiting: { opacity: 0, backdropFilter: "none" },
                  exited: { opacity: 0, backdropFilter: "none" },
                  unmounted: { opacity: 0, backdropFilter: "none" },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === "exited" ? "hidden" : "visible",
          }}
        >
          <ModalDialog
            layout={layout}
            sx={{
              transition: `all ${duration}ms ease-in-out`,
              ...{
                entering: { opacity: 1, transform: "translate(-50%, 100vh)" },
                entered: { opacity: 1 },
                exiting: { opacity: 0, transform: "translate(-50%, 100vh)" },
                exited: { opacity: 0 },
                unmounted: { opacity: 0, transform: "translate(-50%, 100vh)" },
              }[state],
            }}
          >
            {children}
          </ModalDialog>
        </Modal>
      )}
    </Transition>
  );
};

export default AnimatedModal;
