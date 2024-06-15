import expandEnv from '@/envInspector/expandEnv';
import propHistory from '@/envInspector/propHistory';
import type EnvSource from '@/envSources/EnvSource';
import type { EnvData } from '@/envSources/EnvSource';
import chalk from 'chalk';

export type EnvInspectorOptions = {
  filter?: string[];
  showUnexpanded: boolean;
  showSource: boolean;
  showHistory: boolean;
}

function dumpComment(env: EnvData, source: EnvSource, prop: string, options: EnvInspectorOptions) {
  return [
    options.showUnexpanded && source.get(prop) !== env[prop] ? chalk.blue(source.get(prop)) : undefined,
    options.showSource ? chalk.dim('[' + (source.name) + ']') : undefined
  ].filter(Boolean).join(' ');
}

function isSelectedByFilter(prop: string, filter: string[] | undefined) { 
  if (filter === undefined) {
    return true;
  }

  return filter.some(f => prop.includes(f));
}

function envInspector(sources: EnvSource[], options: EnvInspectorOptions) {
  let env: EnvData = {};

  for (const source of sources) {
    const srcEnv = source.load(env)
    env = { ...env, ...expandEnv(srcEnv, env) };
  }

  const lines: string[] = [];

  for (const prop in env) {
    if (!isSelectedByFilter(prop, options.filter)) {
      continue;
    }
    const history = propHistory(prop, sources);
    const [actual, ...inherit] = history;
    const comment = dumpComment(env, actual, prop, options);
    const line = [
      `${prop}=${chalk.green(env[prop])}`,
      comment ? `${chalk.dim('#')} ${comment}` : undefined,
    ].filter(Boolean).join(' ');

    lines.push(line);

    if (options.showHistory) {
      for (const source of inherit) {
        lines.push(chalk.dim(`\t# ${source.get(prop)} [${source.name}]`));
      }
    }
  }

  return lines.join('\n');
}

export default envInspector;
