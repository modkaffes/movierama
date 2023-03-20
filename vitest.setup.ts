import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "./src/mocks/server";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

afterAll(() => server.close());
