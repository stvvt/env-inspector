import FileEnvSource from '@/envSources/FileEnvSource';

jest.mock('dotenv', () => ({
  esModule: true,
  config: jest.fn().mockImplementation(({ path }: { path: string }) => {
    switch (path) {
      case '.env.global':
        return {
          parsed: {
            ENVIRONMENT: '${ENVIRONMENT:-local}',
          },
        };
      case '.env.local':
        return {
          parsed: {
            LISTEN_HOST: 'localhost',
          },
        };
    }

    return {
      parsed: {},
    };
  }),
}));

describe('File ENV source', () => {
  it('loads and expands env from file', () => {
    const fileSource = new FileEnvSource('.env.global', '.env.global');
    const loaded = fileSource.load({});

    expect(loaded.ENVIRONMENT).toEqual('${ENVIRONMENT:-local}');
  });

  it('loads and expands env from file with variable name', () => {
    const fileSource = new FileEnvSource('.env.${ENVIRONMENT}', '.env.${ENVIRONMENT}');
    const loaded = fileSource.load({
      ENVIRONMENT: 'local'
    });

    expect(loaded).toEqual({
      LISTEN_HOST: 'localhost'
    });
  });
});