export type EnvData = Record<string, string>;

abstract class EnvSource {
  protected env: EnvData = {};
  
  public constructor(public name: string) {}

  public abstract load(currentEnv?: EnvData): EnvData;

  public has(prop: string) {
    return this.env[prop] !== undefined;
  }

  public get(prop: string) {
    return this.env[prop];
  }

}

export default EnvSource;
