import type EnvSource from '@/envSources/EnvSource';

function propHistory(prop: string, sources: EnvSource[]) {
  const history = sources.filter((source) => source.has(prop));
  return history.reverse();
}

export default propHistory;
