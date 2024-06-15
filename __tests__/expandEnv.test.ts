import expandEnv from '@/envInspector/expandEnv';
import type { EnvData } from '@/envSources/EnvSource';

describe('expandEnv', () => {
  it('should be function', () => {
    expect(expandEnv).toBeInstanceOf(Function);
  });

  it('should expand var defined in the same source', () => {
    const source: EnvData = {
      APP_NAME: 'app',
      ELASTIC_INDEX: '${APP_NAME}_index',
    };

    const actual = expandEnv(source, {});

    expect(actual).toEqual({
      APP_NAME: 'app',
      ELASTIC_INDEX: 'app_index',
    })
  });
})