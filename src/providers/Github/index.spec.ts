import { GithubProvider } from './';
import moxios from 'moxios';

describe('providers/Github', () => {
  let provider: GithubProvider;

  beforeEach(() => {
    provider = new GithubProvider({});
    moxios.install(provider.http);
  });

  afterEach(() => {
    moxios.uninstall(provider.http);
  });

  it('should fetch an issue', async () => {
    moxios.stubRequest('/repos/facebook/react/issues/22045', {
      status: 200,
      response: {
        title: 'hello',
      },
    });
    const issue = await provider.getTask('facebook/react|22045');
    expect(issue.title).toBe('hello');
  });
});
