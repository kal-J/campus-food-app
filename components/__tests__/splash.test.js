import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Splash from '../Splash';

describe('Splash component', () => {
  it('renders correctly', () => {
    renderer.create(<Splash />);
  });
});
