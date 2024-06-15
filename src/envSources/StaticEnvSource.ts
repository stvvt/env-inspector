import type { EnvData } from '@/envSources/EnvSource';
import EnvSource from '@/envSources/EnvSource';

class StaticEnvSource extends EnvSource {
  public constructor(name: string, protected env: EnvData) {
    super(name)
  }

  public load() {
    return this.env;
  }
}

export default StaticEnvSource;
