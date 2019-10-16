/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RecentBlocks from '../../components/RecentBlocks';

const getBlocks = () => {
  return Array(10)
    .fill()
    .map((_, index) => getBlockData(index + 1));
};

const getBlockData = id => {
  const timestamp = `2019-10-15T10:48:17.00${id}`;
  return {
    id: id.toString(),
    num_transactions: id,
    raw: `{"timestamp": "${timestamp}"}`,
    timestamp,
  };
};

test('Render component', () => {
  const reloadMock = jest.fn();
  const component = renderer.create(
    <RecentBlocks blocks={getBlocks()} isFetchingBlocks={false} reloadRecentBlocks={reloadMock} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Fetching blocks', () => {
  const reloadMock = jest.fn();
  const component = renderer.create(
    <RecentBlocks blocks={getBlocks()} isFetchingBlocks reloadRecentBlocks={reloadMock} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Click load button', () => {
  const reloadMock = jest.fn();
  const component = shallow(
    <RecentBlocks blocks={getBlocks()} isFetchingBlocks reloadRecentBlocks={reloadMock} />
  );

  component.find('button').simulate('click');
  expect(reloadMock.mock.calls.length).toBe(1);
});
