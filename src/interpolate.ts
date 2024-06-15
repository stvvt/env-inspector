import { expand } from 'dotenv-expand';

function interpolate(str: string, env: Record<string, string>) {
  const expanded = expand({
    processEnv: { ...env },
    parsed: {
      __str__: str,
    }
  });

  return expanded.parsed?.__str__ ?? '';
}

export default interpolate;
