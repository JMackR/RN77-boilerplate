import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './talloapi.ts',
  exportName: 'talloApi',
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

export default config;
