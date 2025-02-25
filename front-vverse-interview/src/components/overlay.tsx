import { useRef } from "react";
import { OverlayWrapper } from "./styled";

interface OverlayProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

export const Overlay = ({ children, visible, onClose }: OverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  console.log(onClose)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleClickOutside = (e: any) => {
//     if (overlayRef.current && !overlayRef.current.contains(e.currentTarget)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, false);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, false);
//     };
//   }, []);


  return visible ? <OverlayWrapper ref={overlayRef}>{children}</OverlayWrapper> : null;
};
