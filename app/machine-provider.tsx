"use client";
import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import { itemsMachine } from "../application/itemsMachine";

interface ActorContextType {
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

export default StateMachineProvider;
