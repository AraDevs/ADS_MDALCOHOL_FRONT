import { ResourceFactory } from '@core/types';

export class RestResourceFactory implements ResourceFactory {
  constructor(private resourceTemplate: string, private keys: string[]) {}

  create(data: any) {
    const resourceData = data.resource;
    const result = this.keys.reduce((values: string[], key: string) => {
      return [...values, resourceData[key]];
    }, []);

    return result.reduce((resource, value, i) => {
      const pattern = '$$' + i;
      return resource.replace(pattern, value);
    }, this.resourceTemplate);
  }
}
