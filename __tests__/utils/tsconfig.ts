import { loadConfig, type ConfigLoaderSuccessResult } from 'tsconfig-paths';

const config = loadConfig();

if (config.resultType === 'failed') {
  throw new Error('Unable to parse tsconfig.json');
}

export default config as ConfigLoaderSuccessResult;
