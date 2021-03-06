//ASK ROSS: Check what the below tests mean 

import 'react-native';
import React from 'react';
import App from '../components/App';
import renderer from 'react-test-renderer';

it('renders the loading screen', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<App skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
