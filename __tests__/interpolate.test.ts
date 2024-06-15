import interpolate from '@/interpolate';

describe('interpolateFilename', () => {
  it('should interpolate', () => {

    const filename = '${CONTEXT}/.env.${ENVIRONMENT}';
    
    const CONTEXT = String(Math.floor(Math.random() * 100));
    const ENVIRONMENT = String(Math.floor(Math.random() * 100));

    const actual = interpolate(filename, {
      CONTEXT,
      ENVIRONMENT,
    });
    
    expect(actual).toBe(`${CONTEXT}/.env.${ENVIRONMENT}`);
  });

  it('should respect defaults', () => {
    const CONTEXT = String(Math.floor(Math.random() * 100));
    const actual = interpolate('${CONTEXT:-ctx}/.env.${ENVIRONMENT:-local}', {
      CONTEXT,
    });
    expect(actual).toBe(`${CONTEXT}/.env.local`);
  });
});