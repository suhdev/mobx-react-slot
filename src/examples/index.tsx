import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SlotContainer, Slot, SlotContent } from '..';

function App({ children }) {
  return (
    <SlotContainer>
      <div id="top-level">
        <div className="dashboard__top-bar">
          <Slot name="TopBar" />
        </div>
        <div className="dashboard__content">
          <Slot name="Content" />
        </div>
      </div>
      {children}
    </SlotContainer>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="counter">
      <div>{count}</div>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
    </div>
  );
}

ReactDOM.render(
  <App>
    <SlotContainer>
      <Slot name="box" />
      <SlotContent name="Content">
        Test App
        <SlotContent name="TopBar">
          Top Bar 3
        </SlotContent>
        <SlotContent name="TopBar">
          Top Bar 4 (overrides 3)
          <Counter />
        </SlotContent>
      </SlotContent>
    </SlotContainer>
  </App>,
  document.getElementById('root'));
