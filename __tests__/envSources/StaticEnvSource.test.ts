import StaticEnvSource from '@/envSources/StaticEnvSource';

describe('Static ENV source', () => {
  it('loads env from other env sources', () => {
    const obj = {
      CONTEXT: '${CONTEXT:-core}',
      ENVIRONMENT: '${ENVIRONMENT:-local}'
    };
    const staticSource = new StaticEnvSource('name', obj);

    expect(staticSource.load()).toEqual(obj);
  });
});