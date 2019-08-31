import * as React from 'react';
import { observable, reaction, action } from 'mobx';

type ISlotContext = {
  parent: ISlotContext;
  exists: {},
  slots: {};
  getView(name): React.ReactNode;
  addSlot(name): void;
  setSlot(name: string, view: React.ReactNode): void;
};

class SlotContextModel implements ISlotContext {
  slots = observable.object({}, {}, { deep: false });
  parent: ISlotContext;
  exists = {};

  constructor(parent?: ISlotContext) {
    this.parent = parent;
  }

  getView(name: string): React.ReactNode {
    return this.slots[name] || (this.parent && this.parent.getView(name));
  }

  @action.bound
  addSlot(name) {
    this.slots[name] = this.slots[name] || null;
  }

  @action.bound
  setSlot(name: string, view: React.ReactNode) {
    if (this.exists[name]) {
      this.slots[name] = view;
      return;
    }
    if (this.parent) {
      this.parent.setSlot(name, view);
    }
  }

}

const SlotContext = React.createContext<ISlotContext>(null);

export function useObserver(viewFn: () => React.ReactNode | any, deps = []) {
  const [view, setView] = React.useState(viewFn);
  const firstTimeRef = React.useRef<boolean>();
  React.useEffect(
    () => {
      if (!firstTimeRef.current) {
        setView(viewFn);
        firstTimeRef.current = true;
      }
      const sub = reaction(viewFn, v => setView(v));
      return () => {
        sub();
        firstTimeRef.current = false;
      };
    },
    deps);
  return view;
}

export function SlotContainer({ children }) {
  const parentModel = React.useContext(SlotContext);
  const [model] = React.useState(() => new SlotContextModel(parentModel));
  return (
    <SlotContext.Provider value={model}>
      {children}
    </SlotContext.Provider>
  );
}

export function Slot({ name }) {
  const context = React.useContext(SlotContext);
  context.exists[name] = true;
  return useObserver(
    () => context.getView(name) || null,
    [context]);
}

export function SlotContent({ name, children }) {
  const context = React.useContext(SlotContext);
  React.useEffect(
    () => {
      context.setSlot(name, children);
    },
    [children],
  );
  return null;
}
