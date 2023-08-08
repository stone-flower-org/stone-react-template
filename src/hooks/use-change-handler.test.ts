import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/utils/tests';

import { useChangeHandler } from './use-change-handler';

const defaultObject = {
  key0: 'some val 0',
  key1: 'some val 1',
};
const renderUseChangeHandler = (renderProps: any = {}) =>
  renderHookWithProviders((initialProps) => useChangeHandler(initialProps), renderProps);

describe('useChangeHandler', () => {
  it('should call onChange with updated object using new key value', async () => {
    const onChange = jest.fn();
    const newVal = 'Some New Val';
    const key = 'key1';
    const composition = renderUseChangeHandler({
      initialProps: {
        key,
        state: defaultObject,
        onChange,
      },
    });
    composition.result.current(newVal);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        ...defaultObject,
        [key]: newVal,
      });
    });
  });
});
