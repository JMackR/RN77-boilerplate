import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://dev.api.upwardrunning.com/swagger/v1/swagger.json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './upwardapi.ts',
  exportName: 'upwardApi',
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

export default config;
