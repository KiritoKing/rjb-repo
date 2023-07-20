import { Modal, ModalDialog } from "@mui/joy";
import { FC, PropsWithChildren, useRef } from "react";
import { Transition } from "react-transition-group";

const AnimatedModal: FC<
  PropsWithChildren<{
    open: boolean;
    layout?: "center" | "fullscreen";
    onClose?: () => void;
  }>
> = ({ open, layout, onClose, children = null }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Transition nodeRef={contentRef} in={open} timeout={600}>
      {(state) => (
        <Modal
          keepMounted
          ref={contentRef}
          open={!["exited", "exiting"].includes(state)}
          onClose={onClose}
          slotProps={{
            backdrop: {
              sx: {
                transition: `opacity 400ms, backdrop-filter 400ms`,
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
              transition: `opacity 300ms`,
              ...{
                entering: { opacity: 1 },
                entered: { opacity: 1 },
                exiting: { opacity: 0 },
                exited: { opacity: 0 },
                unmounted: { opacity: 0 },
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
