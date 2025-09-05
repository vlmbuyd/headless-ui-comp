import {
  createContext,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ModalState = Map<string, ReactNode>;
type ModalDispatchState = Dispatch<SetStateAction<ModalState>>;

const ModalContext = createContext(new Map());
const ModalDispatchContext = createContext<ModalDispatchState>(() => {});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalState>(new Map());
  const modalValues = Array.from(modals.values());

  // 모달 마운트 시 스크롤 방지
  useEffect(() => {
    document.body.classList.toggle("no-scroll", modals.size > 0);
  }, [modals]);

  return (
    <ModalContext.Provider value={modals}>
      <ModalDispatchContext.Provider value={setModals}>
        {children}
        <div id="modalRoot">
          {modalValues.map((children, i) => (
            <Fragment key={i}>{children}</Fragment>
          ))}
        </div>
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);

export const useSetModals = () => {
  const setModals = useContext(ModalDispatchContext);

  const openModal = useCallback((id: string, children: ReactNode) => {
    setModals((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, children);
      return newMap;
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  return { openModal, closeModal };
};
