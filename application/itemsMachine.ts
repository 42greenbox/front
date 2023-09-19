import { ItemType } from "@/domain/Item";
import { assign, createMachine } from "xstate";
import { useItem } from "./useItem";

const { getItems, getMyItems } = useItem();

export const itemsMachine = createMachine(
  {
    id: "items",
    schema: {
      context: {} as {
        items: ItemType[];
        barcode: string;
        base64: string;
      },
      events: {} as
        | { type: "items.add" }
        | { type: "items.scan" }
        | { type: "items.showMine" }
        | { type: "items.showAll" }
        | { type: "items.add.close" }
        | any,
    },
    context: {
      items: [],
      barcode: "",
      base64: "",
    },
    initial: "showing",
    on: {
      "items.add": { target: "adding" },
      "items.scan": { target: "scanning" },
      "items.add.close": { target: "showing" },
    },
    states: {
      showing: {
        type: "compound",
        initial: "all",
        on: {
          "items.showAll": { target: ".all" },
          "items.showMine": { target: ".mine" },
        },
        states: {
          all: {
            invoke: {
              src: "getItems",
              onDone: [
                {
                  cond: "hasData",
                  actions: assign({
                    items: (_, event) => {
                      return event.data;
                    },
                  }),
                },
              ],
              onError: {
                actions: "consoleLogError",
              },
            },
          },
          mine: {
            invoke: {
              src: "getMyItems",
              onDone: [
                {
                  cond: "hasData",
                  actions: assign({
                    items: (_, event) => {
                      return event.data;
                    },
                  }),
                },
              ],
              onError: {
                actions: "consoleLogError",
              },
            },
          },
        },
      },
      adding: {},
      scanning: {
        on: {
          "items.scan.close": { target: "adding" },
        },
      },
    },
  },
  {
    services: {
      getItems: getItems,
      getMyItems: getMyItems,
    },
    guards: {
      hasData: (_, event) => {
        return Boolean(event.data);
      },
    },
    actions: {
      consoleLogError: (context, event) => {
        console.log("error occured", event.data.message);
      },
    },
  }
);
