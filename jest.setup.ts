import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;


import { server } from './src/mocks/server';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers());
afterAll(() => server.close());