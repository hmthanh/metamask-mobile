import React, { useEffect } from 'react';
import { View } from 'react-native';
import renderWithProvider from '../../../util/test/renderWithProvider';
import ErrorBoundary from './';
import { MetricsEventBuilder } from '../../../core/Analytics/MetricsEventBuilder';

const mockTrackEvent = jest.fn();
const mockCreateEventBuilder = MetricsEventBuilder.createEventBuilder;

jest.mock('../../../components/hooks/useMetrics', () => ({
  ...jest.requireActual('../../../components/hooks/useMetrics'),
  withMetricsAwareness: jest
    .fn()
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockImplementation((Children) => (props: any) => (
      <Children
        {...props}
        metrics={{
          trackEvent: mockTrackEvent,
          createEventBuilder: mockCreateEventBuilder,
        }}
      />
    )),
}));

const MockThrowComponent = () => {
  useEffect(() => {
    throw new Error('Throw');
  }, []);
  return <View />;
};

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('render matches snapshot', () => {
    const { toJSON } = renderWithProvider(<ErrorBoundary />, {});
    expect(toJSON()).toMatchSnapshot();
  });

  it('tracks error event when error is thrown by child component', () => {
    renderWithProvider(
      <ErrorBoundary view={'Root'}>
        <MockThrowComponent />
      </ErrorBoundary>,
    );

    expect(mockTrackEvent).toHaveBeenCalled();
  });
});
