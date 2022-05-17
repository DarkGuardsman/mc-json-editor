import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {getServer} from "./tests/MswSetup";
import {parameters} from "../.storybook/preview";

const server = getServer();

test('renders learn react link', () => {
  server.use(...parameters.msw.handlers);
  render(<App />);

  //Checks that we included the component
  const explorer = screen.getByTestId('explorer');
  expect(explorer).toBeInTheDocument();
});
