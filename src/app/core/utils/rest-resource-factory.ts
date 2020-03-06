export class RestResourceFactory {
  constructor(
    private resourceTemplate: string,
    private keys: string[]) { }

  create(data: any) {
    const result = this.keys.reduce((values: string[], key: string) => {
      return [...values, data[key]];
    }, []);

    return result.reduce((resource, value, i) => {
      const pattern = '$$' + i;
      return resource.replace(pattern, value);
    }, this.resourceTemplate);
  }
}

