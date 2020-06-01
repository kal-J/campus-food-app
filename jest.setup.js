import {NativeModules} from 'react-native';
import jest from 'jest';

// Mock the ImagePickerManager native module to allow us to unit test the JavaScript code
// NativeModules.ImagePickerManager = {
//   showImagePicker: jest.fn(),
//   launchCamera: jest.fn(),
//   launchImageLibrary: jest.fn(),
// };
//jest.mock('react-native-image-picker', () => ({}));

// Reset the mocks before each test
global.beforeEach(() => {
  jest.resetAllMocks();
});

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
