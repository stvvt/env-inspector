import type { EnvData } from '@/envSources/EnvSource';
import interpolate from '@/interpolate';

function expandEnv(env: EnvData, currentEnv: EnvData) {
  const expanded: EnvData = {};
  for (const prop in env) {
    expanded[prop] = interpolate(env[prop], {...currentEnv, ...expanded })
  }

  return expanded;
}

export default expandEnv;
