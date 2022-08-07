/**
 * @format
 */
// import '@testing-library/jest-native';
import '@testing-library/jest-native/extend-expect';
import 'react-native';
import React from 'react';
import App, {Section, FlatSection, FormSection} from '../App';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import '@testing-library/jest-native/extend-expect';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  renderer.create(<App />);
});

test('render text in section', () => {
  render(<Section title="count " />);
  const PlusButton = screen.getByText('+');
  const MinusButton = screen.getByText('-');
  const Counter = screen.getByText('1');

  fireEvent.press(PlusButton);
  expect(Counter).toHaveTextContent('2');
  fireEvent.press(MinusButton);
  expect(Counter).toHaveTextContent('1');
  fireEvent.press(MinusButton);
  expect(Counter).toHaveTextContent('0');
});

test('test scrolling flatsection', () => {
  const onEndReached = jest.fn();
  render(<FlatSection onEndReached={onEndReached} />);
  const eventData = {
    nativeEvent: {
      contentOffset: {
        x: 300,
      },
      contentSize: {
        // Dimensions of the scrollable content
        height: 10,
        width: 50,
      },
      layoutMeasurement: {
        // Dimensions of the device
        height: 100,
        width: 100,
      },
    },
  };
  fireEvent.scroll(screen.getByTestId('flat-list'), eventData);
  expect(onEndReached).toHaveBeenCalled();
});

test('Test Form in react native', async () => {
  const {toJSON} = render(<FormSection />);
  const programmer = 'Hadi Maher';
  const textInput = screen.getByPlaceholderText('name');
  const button = screen.getByTestId('print-button');

  fireEvent.changeText(textInput, programmer);
  fireEvent.press(button);

  await waitFor(() =>
    expect(screen.getByTestId('printed-username')).toBeTruthy(),
  );

  expect(screen.getByTestId('printed-username').props.children).toBe(
    programmer,
  );

  expect(toJSON()).toMatchSnapshot();
});
