"use client";
import { useMachine } from "@xstate/react";

/*interface ActorContextType {
  itemActor: InterpreterFrom<typeof itemsMachine>;
}

export const ActorContext = createContext<ActorContextType>(
  {} as ActorContextType
);

interface Props {
  children: React.ReactNode;
}

const StateMachineProvider = ({ children }: Props) => {
  const itemActor = useInterpret(itemsMachine);
  return (
    <ActorContext.Provider value={{ itemActor }}>
      {children}
    </ActorContext.Provider>
  );
};

export default StateMachineProvider;*/

export function useAppMachine(machine: any, state: string) {
  console.log("state", state);
  return useMachine(machine);
}
