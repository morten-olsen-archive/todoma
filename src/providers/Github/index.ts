import axios, { AxiosInstance } from 'axios';
import RemoteTask from 'models/RemoteTask';
import { Provider } from 'services/Providers';

interface Config {
  token?: string;
}

class GithubProvider implements Provider {
  #http: AxiosInstance;

  constructor({ token }: Config) {
    const headers: { [name: string]: string } = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    this.#http = axios.create({
      baseURL: 'https://api.github.com',
      headers,
    });
  }

  get http() {
    return this.#http;
  }

  public getTask = async (id: string) => {
    const [repo, issueId] = id.split('|');
    const { data } = await this.#http.get(`/repos/${repo}/issues/${issueId}`);
    const task = new RemoteTask();
    task.id = id;
    task.title = data.title;
    task.description = data.body;
    task.raw = JSON.stringify(data);
    task.dataType = data.pullRequest ? 'github-pr' : 'github-issue';
    task.open = data.state === 'open';
    return data;
  };
}

const setupGithubProvider = async (config: any) => {
  const githubProvider = new GithubProvider(config.token);
  return githubProvider;
};

export { GithubProvider, setupGithubProvider };

export default setupGithubProvider;
