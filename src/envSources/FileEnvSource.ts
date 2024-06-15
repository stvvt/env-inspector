import type { EnvData } from '@/envSources/EnvSource';
import EnvSource from '@/envSources/EnvSource';
import interpolate from '@/interpolate';
import { config } from 'dotenv';

class FileEnvSource extends EnvSource {
  public constructor(name: string, private filename: string) {
    super(name);
  }

  public load(currentEnv: EnvData) {
    const path = interpolate(this.filename, currentEnv);
    this.name = interpolate(this.name, currentEnv);

    const data = config({
      processEnv: {},
      path,
    });

    this.env = data.parsed as EnvData;

    return this.env;
  }
}

export default FileEnvSource;
