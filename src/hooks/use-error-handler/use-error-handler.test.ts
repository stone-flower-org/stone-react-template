import { waitFor } from '@testing-library/react';

import { errorReporterProvider } from '@src/boot';
import { useAlertContext } from '@src/components/common/Alert/hooks';
import { AlertType } from '@src/components/common/Alert/types';
import { renderHookWithProviders } from '@src/utils/tests';

import { useErrorHandler } from './use-error-handler';

const error = new Error('Some Error');
const renderUseErrorHandler = (renderProps: any = {}) =>
  renderHookWithProviders(() => {
    const useErrorHandlerValue = useErrorHandler();
    const alertContextValue = useAlertContext();
    return {
      useErrorHandlerValue,
      alertContextValue,
    };
  }, renderProps);

describe('useErrorHandler', () => {
  let reportSpy: ReturnType<typeof jest.spyOn> | undefined;

  beforeAll(() => {
    reportSpy = jest.spyOn(errorReporterProvider.get(), 'report').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should report error when handler called', async () => {
    const composition = renderUseErrorHandler();
    await waitFor(() => {
      composition.result.current.useErrorHandlerValue(error);
    });
    await waitFor(() => {
      expect(reportSpy).toHaveBeenCalledWith(error);
    });
  });

  it('should add error alert with error message', async () => {
    const composition = renderUseErrorHandler();
    await waitFor(() => {
      composition.result.current.useErrorHandlerValue(error);
    });
    await waitFor(() => {
      expect(composition.result.current.alertContextValue.alerts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: AlertType.error,
            message: error.message,
          }),
        ])
      );
    });
  });
});
