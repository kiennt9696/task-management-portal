import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authorize } from './api';

describe('authorize', () => {
  const mock = new MockAdapter(axios);
  const scope = 'read:task';
  const token = 'mocked_access_token';

  afterEach(() => {
    mock.reset();
  });

  it('should return the token if already cached', async () => {
    sessionStorage.setItem(scope, token);
    const result = await authorize(scope);
    expect(result).toBe(token);
  });

  it('should fetch a new token if not cached', async () => {
    sessionStorage.clear();
    mock
      .onPost('http://127.0.0.1:5001/v1/authorize')
      .reply(200, { access_token: token });

    const result = await authorize(scope);
    expect(result).toBe(token);
    expect(sessionStorage.getItem(scope)).toBe(token);
  });
});
