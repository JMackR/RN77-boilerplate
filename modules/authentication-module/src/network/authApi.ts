import Config from 'react-native-config';

import { api } from '@tallo/store/api';

export const tagTypes = ['User'];

export const authApi = api.enhanceEndpoints({ addTagTypes: tagTypes }).injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<string, { email: string; password: number; newPassword?: number }>({
      query: ({ email, password, newPassword }) => {
        return {
          url: `${Config.BASE_URL}api/Auth/addnewuser`,
          method: 'POST',
          body: {
            firstname: 'Austin',
            lastname: 'Test',
            middleInitial: 'D',
            emailAddress: 'elektricwebdesign@gmail.com',
            password: 'abc123^ds9)',
            gender: 'male',
            birthDate: '2024-08-08T23:59:11.629Z',
          },
          extraOptions: {
            serviceName: 'AUTHENTICATE',
          },
        };
      },
      transformResponse: (_, meta: any) => {
        console.log('WHAT IS THIS :', _, 'META:::', meta);

        return meta.response.status;
      },
      transformErrorResponse: (error) => {
        return error;
      },
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
  overrideExisting: true,
});

export const { endpoints, useSignInMutation } = authApi;
