import * as React from 'react';
import { SlotContainer, Slot, SlotContent } from '.';
import { render, cleanup } from '@testing-library/react';

describe('mobx-react-slot', () => {
  afterEach(cleanup);
  it('should be going well', async () => {
    const { getByTestId } = render(<SlotContainer>
      <Slot name="box" />
      <Slot name="slate" />
      <Slot name="amx" />
      <SlotContent name="box">
        <div data-testid="box-test">Suhail</div>
        <SlotContainer>
          <SlotContent name="slate">
            <div data-testid="isac">British</div>
            <SlotContent name="amx">
              <div data-testid="wilko">
                Indeedio
                </div>
            </SlotContent>
          </SlotContent>
        </SlotContainer>
        <div data-testid="box-test2">Suhail XYZ</div>
      </SlotContent>
    </SlotContainer>);

    expect(getByTestId('box-test').innerHTML).toEqual('Suhail');

    expect(getByTestId('isac').textContent).toContain('British');

    expect(getByTestId('wilko').textContent).toContain('Indeedio');

  });
});
