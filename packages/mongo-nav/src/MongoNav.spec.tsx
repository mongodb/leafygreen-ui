import React, { ChangeEventHandler } from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Deferred } from '@leafygreen-ui/lib';
import MongoNav, { MongoNavInterface } from './MongoNav';
import { Product } from './types';
import fixtureData from './data';

// We need a consistent type for our fetch polyfill, but since the
// polyfill is never used, only mocked, the type is irrelevant
type mockFetchFunction = jest.MockedFunction<any>;
type mockChangeHandler = jest.Mock<ChangeEventHandler>;

// Because JSDom doesn't implement fetch, it also doesn't implement
// the Response API, so we mock the minimum interface we need for testing
// and provide a helper to create the object and mock any calls to json
interface ResponseInterface {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<any>;
}

interface ConstructResponseInterface {
  jsonResponse: Object;
  ok: boolean;
  status: number;
}

const constructResponse = ({
  jsonResponse,
  ok,
  status,
}: ConstructResponseInterface): ResponseInterface => {
  return {
    ok,
    status,
    json: () => Promise.resolve(jsonResponse),
  };
};

// a helper function to handle any repeated rendering of MongoNav
const renderComponent = ({
  activeProduct = Product.Cloud,
  onOrganizationChange = jest.fn(),
  onProjectChange = jest.fn(),
  ...rest
}: MongoNavInterface) => {
  return render(
    <MongoNav
      activeProduct={activeProduct}
      onOrganizationChange={onOrganizationChange}
      onProjectChange={onProjectChange}
      {...rest}
    />,
  );
};

describe('packages/MongoNav', () => {
  let onOrgChangeMock: mockChangeHandler;
  let onProjectChangeMock: mockChangeHandler;
  let fetchDeferred: Deferred<Response>;
  let fetchMock: mockFetchFunction;
  let onErrorMock: jest.Mock<Function>;
  let onSuccessMock: jest.Mock<Function>;
  let consoleErrorMock: any;

  const testIds = {
    loading: 'mongo-nav-loader',
    orgNav: 'organization-nav',
    projectNav: 'project-nav',
  };

  beforeAll(() => {
    // JSDom doesn't implement fetch, so we need to polyfill it
    // in order to mock it (our polyfill's behavior doesn't matter)
    // @ts-ignore "Property 'fetch' does not exist on type 'Global'"
    global.fetch = () => {};
  });

  afterAll(() => {
    // Once finished, we need to remove our polyfill so that this
    // doesn't adversely impact other tests
    // @ts-ignore "Property 'fetch' does not exist on type 'Global'"
    delete global.fetch;
  });

  beforeEach(() => {
    onOrgChangeMock = jest.fn();
    onProjectChangeMock = jest.fn();
    fetchDeferred = new Deferred();
    fetchMock = jest
      .spyOn(global, 'fetch' as any)
      .mockReturnValue(fetchDeferred.promise());
    consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockReturnValue();
    onErrorMock = jest.fn();
    onSuccessMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe('when rendered with default props', () => {
    let component: RenderResult;
    let queryByTestId: typeof component.queryByTestId;

    beforeEach(() => {
      const { queryByTestId: currentQueryByTestId } = renderComponent({
        activeProduct: Product.Cloud,
        onOrganizationChange: onOrgChangeMock,
        onProjectChange: onProjectChangeMock,
        onError: onErrorMock,
        onSuccess: onSuccessMock,
      });

      queryByTestId = currentQueryByTestId;
    });

    it('displays the loading component', () => {
      expect(queryByTestId(testIds.loading)).toBeInTheDocument();
    });

    it('does not display the org or project nav components', () => {
      expect(queryByTestId(testIds.orgNav)).not.toBeInTheDocument();
      expect(queryByTestId(testIds.projectNav)).not.toBeInTheDocument();
    });

    it('calls to fetch the data from cloud', () => {
      expect(fetchMock.mock.calls.length).toEqual(1);
    });

    describe('when the data is returned', () => {
      describe('and the response is valid, with fixture data', () => {
        beforeEach(() => {
          const fetchResponse = constructResponse({
            jsonResponse: fixtureData, ok: true, status: 200,
          });
          fetchDeferred.resolve(fetchResponse as Response);
        });

        it('calls the on success handler', () => {
          expect(onSuccessMock).toHaveBeenCalledTimes(1);
        });

        it('no longer displays the loading component', () => {
          expect(queryByTestId(testIds.loading)).not.toBeInTheDocument();
        });

        it('displays the org nav component', () => {
          expect(queryByTestId(testIds.orgNav)).toBeInTheDocument();
        });

        it('displays the product nav component', () => {
          expect(queryByTestId(testIds.projectNav)).toBeInTheDocument();
        });
      });

      describe('and the response is an error code', () => {
        beforeEach(() => {
          const fetchResponse = constructResponse({
            jsonResponse: fixtureData, ok: false, status: 401,
          });
          fetchDeferred.resolve(fetchResponse as Response);
        });

        it('calls the on error handler', () => {
          expect(onErrorMock).toHaveBeenCalledTimes(1);
        });

        it('logs the error to the console', () => {
          expect(consoleErrorMock).toHaveBeenCalledTimes(1);
        });

        it('still displays the loading component', () => {
          expect(queryByTestId(testIds.loading)).toBeInTheDocument();
        });

        it('still does not display the org or project nav components', () => {
          expect(queryByTestId(testIds.orgNav)).not.toBeInTheDocument();
          expect(queryByTestId(testIds.projectNav)).not.toBeInTheDocument();
        });
      });
    });

    describe('when the data is not returned successfully', () => {
      beforeEach(function() {
        fetchDeferred.reject(new Error('fetch calls rarely result in a rejection'));
      });

      it('logs the error to the console', () => {
        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      });

      it('still displays the loading component', () => {
        expect(queryByTestId(testIds.loading)).toBeInTheDocument();
      });

      it('still does not display the org or project nav components', () => {
        expect(queryByTestId(testIds.orgNav)).not.toBeInTheDocument();
        expect(queryByTestId(testIds.projectNav)).not.toBeInTheDocument();
      });
    });
  });
});
