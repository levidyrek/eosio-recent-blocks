/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

jest.mock('../../containers/RecentBlocks', () => () => <div className="RecentBlocks" />);

test('Render component', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
