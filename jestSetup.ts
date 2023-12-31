import {server} from 'src/testUtils/setupTestServer';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// example of mocking another library, that needs gesture-handler and reanimated
jest.mock('@gorhom/bottom-sheet', () => {
  const react = require('react-native');

  return {
    BottomSheetModal: react.View,
  };
});

beforeEach(() => server.listen({onUnhandledRequest: 'error'}));
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
