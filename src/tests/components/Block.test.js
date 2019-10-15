/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Block from '../../components/Block';
import { SPACE_KEY_CODE } from '../../constants';

const getBlockData = () => ({
  id: '050bd265eba5e0297f2c7e00d299c6f8b492ac184060785fad5576c2afa3e0e7',
  num_transactions: 43,
  raw: '{"timestamp": "2019-10-15T10:48:17.000"}',
  timestamp: '2019-10-15T10:48:17.000',
});

test('Render component', () => {
  const component = renderer.create(<Block block={getBlockData()} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Toggle active', () => {
  const component = renderer.create(<Block block={getBlockData()} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.getInstance().toggleActive();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Pressing the space bar expands the block.
 */
test('Toggle active on keydown', () => {
  const component = renderer.create(<Block block={getBlockData()} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const preventDefault = jest.fn();
  const testEvent = { which: SPACE_KEY_CODE, preventDefault };

  component.getInstance().toggleActiveOnKey(testEvent);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(preventDefault.mock.calls.length).toBe(1);
});

/**
 * Pressing the wrong key does not expand the block.
 */
test('Toggle active on keydown wrong key', () => {
  const component = renderer.create(<Block block={getBlockData()} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const preventDefault = jest.fn();
  const testEvent = { which: -1, preventDefault };

  component.getInstance().toggleActiveOnKey(testEvent);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(preventDefault.mock.calls.length).toBe(0);
});
