import { CreatePartnerChallengeCheckoutSessionRequest, UpwardRunningNewUisUserRequest, UpwardRunningNewUserRequest } from '@tallo/store/upwardapi';

export type AuthState = {
  data: {
    upwrJWToken?: string | null;
    hasUpwardRunningSubscription?: boolean;
    hasUpwardRunningAccount?: boolean;
  } | null;
  forcedLogout: boolean;
  userAuthorized: boolean;
};

export type AuthAppStore = { auth: AuthState };
export type SignupFormState = {
  newUserRequestData: UpwardRunningNewUisUserRequest;
  participantFormData: UpwardRunningNewUserRequest;
  formError: boolean;
};
export type SignupStore = { signup: SignupFormState };


export type PartnerChallengeCheckoutFormState = {
  partnerChallengeFormData: CreatePartnerChallengeCheckoutSessionRequest;
  formError: boolean;
};
export type PartnerChallengeCheckoutStore = { partnerChallengeCheckoutInfo: PartnerChallengeCheckoutFormState };
