import { createContext, ReactNode, use, useMemo, useState } from "react";

interface WorkContextType {
  setRunning: (val: boolean) => void;
  isRunning: boolean
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export const useWorkContext = () => {
  const context = use(WorkContext);
  if (!context) throw new Error("usePopoverContext must be used within WorkContextProvider");
  return context;
};

export const WorkContextProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setRunning] = useState(false);

  const context = useMemo<WorkContextType>(() => ({
    setRunning: setRunning,
    isRunning
  }), [isRunning])

  return (
    <WorkContext value={context}>
      {children}
    </WorkContext>
  );
};
