import { emptySplitApi as api } from './index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiActivity: build.mutation<PostApiActivityApiResponse, PostApiActivityApiArg>({
      query: (queryArg) => ({ url: `/api/Activity`, method: 'POST', body: queryArg.individualActivityRequest }),
    }),
    getApiActivityByActivityId: build.query<GetApiActivityByActivityIdApiResponse, GetApiActivityByActivityIdApiArg>({
      query: (queryArg) => ({ url: `/api/Activity/${queryArg.activityId}` }),
    }),
    putApiActivityByActivityId: build.mutation<PutApiActivityByActivityIdApiResponse, PutApiActivityByActivityIdApiArg>({
      query: (queryArg) => ({ url: `/api/Activity/${queryArg.activityId}`, method: 'PUT', body: queryArg.individualActivityRequest }),
    }),
    deleteApiActivityByActivityId: build.mutation<DeleteApiActivityByActivityIdApiResponse, DeleteApiActivityByActivityIdApiArg>({
      query: (queryArg) => ({ url: `/api/Activity/${queryArg.activityId}`, method: 'DELETE' }),
    }),
    postApiAuthLogin: build.mutation<PostApiAuthLoginApiResponse, PostApiAuthLoginApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/login`, method: 'POST', body: queryArg.upwardIdentityCredentials }),
    }),
    postApiAuthValidateTotp: build.mutation<PostApiAuthValidateTotpApiResponse, PostApiAuthValidateTotpApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/validateTOTP`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiAuthTokenrefresh: build.mutation<PostApiAuthTokenrefreshApiResponse, PostApiAuthTokenrefreshApiArg>({
      query: () => ({ url: `/api/Auth/tokenrefresh`, method: 'POST' }),
    }),
    postApiAuthPasswordreset: build.mutation<PostApiAuthPasswordresetApiResponse, PostApiAuthPasswordresetApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/passwordreset`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiAuthRequestusernamechange: build.mutation<PostApiAuthRequestusernamechangeApiResponse, PostApiAuthRequestusernamechangeApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/requestusernamechange`, method: 'POST', body: queryArg.requiredSingleEmailAddress }),
    }),
    postApiAuthAcceptusernamechange: build.mutation<PostApiAuthAcceptusernamechangeApiResponse, PostApiAuthAcceptusernamechangeApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/acceptusernamechange`, method: 'POST', body: queryArg.acceptUsernameChangeRequest }),
    }),
    getApiAuthGuesttoken: build.query<GetApiAuthGuesttokenApiResponse, GetApiAuthGuesttokenApiArg>({
      query: () => ({ url: `/api/Auth/guesttoken` }),
    }),
    postApiAuthUisRequestnewuser: build.mutation<PostApiAuthUisRequestnewuserApiResponse, PostApiAuthUisRequestnewuserApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/uis/requestnewuser`, method: 'POST', body: queryArg.upwardRunningNewUisUserRequest }),
    }),
    postApiAuthUisResendnewusercode: build.mutation<PostApiAuthUisResendnewusercodeApiResponse, PostApiAuthUisResendnewusercodeApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/uis/resendnewusercode`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiAuthUisVerifynewusercode: build.mutation<PostApiAuthUisVerifynewusercodeApiResponse, PostApiAuthUisVerifynewusercodeApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/uis/verifynewusercode`, method: 'POST', body: queryArg.verifyUserRequestCode }),
    }),
    postApiAuthAddnewuser: build.mutation<PostApiAuthAddnewuserApiResponse, PostApiAuthAddnewuserApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/addnewuser`, method: 'POST', body: queryArg.upwardRunningNewUserRequest }),
    }),
    postApiAuthCheckExists: build.mutation<PostApiAuthCheckExistsApiResponse, PostApiAuthCheckExistsApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/checkExists`, method: 'POST', body: queryArg.requiredSingleEmailAddress }),
    }),
    getApiBadgeByBadgetype: build.query<GetApiBadgeByBadgetypeApiResponse, GetApiBadgeByBadgetypeApiArg>({
      query: (queryArg) => ({ url: `/api/Badge/${queryArg.badgetype}` }),
    }),
    getApiBadge: build.query<GetApiBadgeApiResponse, GetApiBadgeApiArg>({
      query: () => ({ url: `/api/Badge` }),
    }),
    postApiBadgeNewbadgecheck: build.mutation<PostApiBadgeNewbadgecheckApiResponse, PostApiBadgeNewbadgecheckApiArg>({
      query: () => ({ url: `/api/Badge/newbadgecheck`, method: 'POST' }),
    }),
    postApiChallengeSignup: build.mutation<PostApiChallengeSignupApiResponse, PostApiChallengeSignupApiArg>({
      query: (queryArg) => ({ url: `/api/Challenge/signup`, method: 'POST', body: queryArg.challengeSignupRequest }),
    }),
    postApiChallengeByChallengeIdParticipantsCancel: build.mutation<
      PostApiChallengeByChallengeIdParticipantsCancelApiResponse,
      PostApiChallengeByChallengeIdParticipantsCancelApiArg
    >({
      query: (queryArg) => ({ url: `/api/Challenge/${queryArg.challengeId}/participants/cancel`, method: 'POST', body: queryArg.requiredString }),
    }),
    putApiChallengeByChallengeIdTasksAndTaskId: build.mutation<
      PutApiChallengeByChallengeIdTasksAndTaskIdApiResponse,
      PutApiChallengeByChallengeIdTasksAndTaskIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Challenge/${queryArg.challengeId}/tasks/${queryArg.taskId}`,
        method: 'PUT',
        body: queryArg.challengeTaskRequest,
      }),
    }),
    getApiChallengeWeeklyoverview: build.query<GetApiChallengeWeeklyoverviewApiResponse, GetApiChallengeWeeklyoverviewApiArg>({
      query: () => ({ url: `/api/Challenge/weeklyoverview` }),
    }),
    getApiChallengeWeeklyoverviewByWeekNumber: build.query<
      GetApiChallengeWeeklyoverviewByWeekNumberApiResponse,
      GetApiChallengeWeeklyoverviewByWeekNumberApiArg
    >({
      query: (queryArg) => ({ url: `/api/Challenge/weeklyoverview/${queryArg.weekNumber}` }),
    }),
    getApiContentLegal: build.query<GetApiContentLegalApiResponse, GetApiContentLegalApiArg>({
      query: () => ({ url: `/api/Content/legal` }),
    }),
    getApiContentLegalByVersionId: build.query<GetApiContentLegalByVersionIdApiResponse, GetApiContentLegalByVersionIdApiArg>({
      query: (queryArg) => ({ url: `/api/Content/legal/${queryArg.versionId}` }),
    }),
    getApiContentWelcomevideo: build.query<GetApiContentWelcomevideoApiResponse, GetApiContentWelcomevideoApiArg>({
      query: () => ({ url: `/api/Content/welcomevideo` }),
    }),
    getApiContentDocumentByContentPageSlug: build.query<
      GetApiContentDocumentByContentPageSlugApiResponse,
      GetApiContentDocumentByContentPageSlugApiArg
    >({
      query: (queryArg) => ({ url: `/api/Content/document/${queryArg.contentPageSlug}` }),
    }),
    getApiContentDocumentByContentPageSlugAndVersionId: build.query<
      GetApiContentDocumentByContentPageSlugAndVersionIdApiResponse,
      GetApiContentDocumentByContentPageSlugAndVersionIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Content/document/${queryArg.contentPageSlug}/${queryArg.versionId}` }),
    }),
    getApiContentEvents: build.query<GetApiContentEventsApiResponse, GetApiContentEventsApiArg>({
      query: () => ({ url: `/api/Content/events` }),
    }),
    getApiContentMemberevents: build.query<GetApiContentMembereventsApiResponse, GetApiContentMembereventsApiArg>({
      query: () => ({ url: `/api/Content/memberevents` }),
    }),
    getApiContentAssessment: build.query<GetApiContentAssessmentApiResponse, GetApiContentAssessmentApiArg>({
      query: (queryArg) => ({ url: `/api/Content/assessment`, params: { questionID: queryArg.questionId } }),
    }),
    getApiContentChallengeweek: build.query<GetApiContentChallengeweekApiResponse, GetApiContentChallengeweekApiArg>({
      query: (queryArg) => ({
        url: `/api/Content/challengeweek`,
        params: { challengeID: queryArg.challengeId, weekNumber: queryArg.weekNumber, startDate: queryArg.startDate },
      }),
    }),
    getApiContentBible365: build.query<GetApiContentBible365ApiResponse, GetApiContentBible365ApiArg>({
      query: (queryArg) => ({
        url: `/api/Content/bible365`,
        params: { bible365ID: queryArg.bible365Id, bGetNext: queryArg.bGetNext, bGetPrevious: queryArg.bGetPrevious },
      }),
    }),
    getApiContentThoughts: build.query<GetApiContentThoughtsApiResponse, GetApiContentThoughtsApiArg>({
      query: (queryArg) => ({
        url: `/api/Content/thoughts`,
        params: { thoughtID: queryArg.thoughtId, bGetNext: queryArg.bGetNext, bGetPrevious: queryArg.bGetPrevious },
      }),
    }),
    getApiContentCategories: build.query<GetApiContentCategoriesApiResponse, GetApiContentCategoriesApiArg>({
      query: () => ({ url: `/api/Content/categories` }),
    }),
    getApiContentChallengesbycategory: build.query<GetApiContentChallengesbycategoryApiResponse, GetApiContentChallengesbycategoryApiArg>({
      query: (queryArg) => ({ url: `/api/Content/challengesbycategory`, params: { categoryID: queryArg.categoryId } }),
    }),
    postApiFormSupport: build.mutation<PostApiFormSupportApiResponse, PostApiFormSupportApiArg>({
      query: (queryArg) => ({ url: `/api/Form/support`, method: 'POST', body: queryArg.contactSupportForm }),
    }),
    getApiPartnerChallengeListForAccountByAcct: build.query<
      GetApiPartnerChallengeListForAccountByAcctApiResponse,
      GetApiPartnerChallengeListForAccountByAcctApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/listForAccount/${queryArg.acct}` }),
    }),
    getApiPartnerChallengeInfoByUpwardChallengeId: build.query<
      GetApiPartnerChallengeInfoByUpwardChallengeIdApiResponse,
      GetApiPartnerChallengeInfoByUpwardChallengeIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/info/${queryArg.upwardChallengeId}` }),
    }),
    getApiPartnerChallengeInfoByUpwardChallengeIdParticipants: build.query<
      GetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsApiResponse,
      GetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/info/${queryArg.upwardChallengeId}/participants` }),
    }),
    postApiPartnerChallenge: build.mutation<PostApiPartnerChallengeApiResponse, PostApiPartnerChallengeApiArg>({
      query: (queryArg) => ({ url: `/api/PartnerChallenge`, method: 'POST', body: queryArg.partnerChallengeRequest }),
    }),
    getApiPartnerChallengeByUpwardChallengeId: build.query<
      GetApiPartnerChallengeByUpwardChallengeIdApiResponse,
      GetApiPartnerChallengeByUpwardChallengeIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/${queryArg.upwardChallengeId}` }),
    }),
    putApiPartnerChallengeByUpwardChallengeId: build.mutation<
      PutApiPartnerChallengeByUpwardChallengeIdApiResponse,
      PutApiPartnerChallengeByUpwardChallengeIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/${queryArg.upwardChallengeId}`, method: 'PUT', body: queryArg.partnerChallengeRequest }),
    }),
    postApiPartnerChallengeVerificationDetails: build.mutation<
      PostApiPartnerChallengeVerificationDetailsApiResponse,
      PostApiPartnerChallengeVerificationDetailsApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallenge/verificationDetails`, method: 'POST', body: queryArg.partnerChallengeRequest }),
    }),
    postApiPartnerChallengeByUpwardChallengeIdVerificationDetails: build.mutation<
      PostApiPartnerChallengeByUpwardChallengeIdVerificationDetailsApiResponse,
      PostApiPartnerChallengeByUpwardChallengeIdVerificationDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/PartnerChallenge/${queryArg.upwardChallengeId}/verificationDetails`,
        method: 'POST',
        body: queryArg.partnerChallengeRequest,
      }),
    }),
    getApiPartnerChallengeRegistrationInfoByUpwardChallengeId: build.query<
      GetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdApiResponse,
      GetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/PartnerChallengeRegistration/info/${queryArg.upwardChallengeId}` }),
    }),
    getApiPodCast: build.query<GetApiPodCastApiResponse, GetApiPodCastApiArg>({
      query: () => ({ url: `/api/PodCast` }),
    }),
    getApiPodCastList: build.query<GetApiPodCastListApiResponse, GetApiPodCastListApiArg>({
      query: (queryArg) => ({ url: `/api/PodCast/list`, params: { startDate: queryArg.startDate, endDate: queryArg.endDate } }),
    }),
    getApiStatsByChallengeId: build.query<GetApiStatsByChallengeIdApiResponse, GetApiStatsByChallengeIdApiArg>({
      query: (queryArg) => ({ url: `/api/Stats/${queryArg.challengeId}` }),
    }),
    getApiStats: build.query<GetApiStatsApiResponse, GetApiStatsApiArg>({
      query: () => ({ url: `/api/Stats` }),
    }),
    getApiStatsLog: build.query<GetApiStatsLogApiResponse, GetApiStatsLogApiArg>({
      query: (queryArg) => ({
        url: `/api/Stats/log`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate, challengeID: queryArg.challengeId },
      }),
    }),
    postApiStripeNewsession: build.mutation<PostApiStripeNewsessionApiResponse, PostApiStripeNewsessionApiArg>({
      query: (queryArg) => ({ url: `/api/Stripe/newsession`, method: 'POST', body: queryArg.createCheckoutSessionRequest }),
    }),
    postApiStripeNewPartnerChallengeSession: build.mutation<
      PostApiStripeNewPartnerChallengeSessionApiResponse,
      PostApiStripeNewPartnerChallengeSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Stripe/newPartnerChallengeSession`,
        method: 'POST',
        body: queryArg.createPartnerChallengeCheckoutSessionRequest,
      }),
    }),
    postApiSubscriptionConfirm: build.mutation<PostApiSubscriptionConfirmApiResponse, PostApiSubscriptionConfirmApiArg>({
      query: (queryArg) => ({ url: `/api/Subscription/confirm`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiSubscriptionCancel: build.mutation<PostApiSubscriptionCancelApiResponse, PostApiSubscriptionCancelApiArg>({
      query: (queryArg) => ({ url: `/api/Subscription/cancel`, method: 'POST', body: queryArg.requiredString }),
    }),
    getApiUserCurrentUserInfo: build.query<GetApiUserCurrentUserInfoApiResponse, GetApiUserCurrentUserInfoApiArg>({
      query: () => ({ url: `/api/User/currentUserInfo` }),
    }),
    getApiUserNewamitytoken: build.query<GetApiUserNewamitytokenApiResponse, GetApiUserNewamitytokenApiArg>({
      query: () => ({ url: `/api/User/newamitytoken` }),
    }),
    putApiUserProfile: build.mutation<PutApiUserProfileApiResponse, PutApiUserProfileApiArg>({
      query: (queryArg) => ({ url: `/api/User/profile`, method: 'PUT', body: queryArg.updateUserProfileRequest }),
    }),
    postApiUserSetLastViewedBible365: build.mutation<PostApiUserSetLastViewedBible365ApiResponse, PostApiUserSetLastViewedBible365ApiArg>({
      query: (queryArg) => ({ url: `/api/User/setLastViewedBible365`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiUserSetLastViewedThoughts: build.mutation<PostApiUserSetLastViewedThoughtsApiResponse, PostApiUserSetLastViewedThoughtsApiArg>({
      query: (queryArg) => ({ url: `/api/User/setLastViewedThoughts`, method: 'POST', body: queryArg.requiredString }),
    }),
    postApiUserHasSeenWelcomeVideo: build.mutation<PostApiUserHasSeenWelcomeVideoApiResponse, PostApiUserHasSeenWelcomeVideoApiArg>({
      query: () => ({ url: `/api/User/hasSeenWelcomeVideo`, method: 'POST' }),
    }),
    getApiUserNotificationSettings: build.query<GetApiUserNotificationSettingsApiResponse, GetApiUserNotificationSettingsApiArg>({
      query: () => ({ url: `/api/User/notificationSettings` }),
    }),
    putApiUserNotificationSettings: build.mutation<PutApiUserNotificationSettingsApiResponse, PutApiUserNotificationSettingsApiArg>({
      query: (queryArg) => ({ url: `/api/User/notificationSettings`, method: 'PUT', body: queryArg.body }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as upwardApi };
export type PostApiActivityApiResponse = /** status 200 OK */ IndividualActivityRead;
export type PostApiActivityApiArg = {
  individualActivityRequest: IndividualActivityRequest;
};
export type GetApiActivityByActivityIdApiResponse = /** status 200 OK */ IndividualActivityRead;
export type GetApiActivityByActivityIdApiArg = {
  activityId: number;
};
export type PutApiActivityByActivityIdApiResponse = /** status 200 OK */ IndividualActivityRead;
export type PutApiActivityByActivityIdApiArg = {
  activityId: number;
  individualActivityRequest: IndividualActivityRequest;
};
export type DeleteApiActivityByActivityIdApiResponse = /** status 200 OK */ void;
export type DeleteApiActivityByActivityIdApiArg = {
  activityId: number;
};
export type PostApiAuthLoginApiResponse = /** status 200 OK */ UpwardRunningAuthToken;
export type PostApiAuthLoginApiArg = {
  upwardIdentityCredentials: UpwardIdentityCredentials;
};
export type PostApiAuthValidateTotpApiResponse = /** status 200 OK */ UpwardRunningAuthToken;
export type PostApiAuthValidateTotpApiArg = {
  requiredString: RequiredString;
};
export type PostApiAuthTokenrefreshApiResponse = /** status 200 OK */ UpwardRunningAuthToken;
export type PostApiAuthTokenrefreshApiArg = void;
export type PostApiAuthPasswordresetApiResponse = /** status 200 OK */ void;
export type PostApiAuthPasswordresetApiArg = {
  requiredString: RequiredString;
};
export type PostApiAuthRequestusernamechangeApiResponse = /** status 202 Accepted */ void;
export type PostApiAuthRequestusernamechangeApiArg = {
  requiredSingleEmailAddress: RequiredSingleEmailAddress;
};
export type PostApiAuthAcceptusernamechangeApiResponse = /** status 200 OK */ void;
export type PostApiAuthAcceptusernamechangeApiArg = {
  acceptUsernameChangeRequest: AcceptUsernameChangeRequest;
};
export type GetApiAuthGuesttokenApiResponse = /** status 200 OK */ UpwardRunningAuthToken;
export type GetApiAuthGuesttokenApiArg = void;
export type PostApiAuthUisRequestnewuserApiResponse = /** status 200 OK */ void;
export type PostApiAuthUisRequestnewuserApiArg = {
  upwardRunningNewUisUserRequest: UpwardRunningNewUisUserRequest;
};
export type PostApiAuthUisResendnewusercodeApiResponse = /** status 200 OK */ void;
export type PostApiAuthUisResendnewusercodeApiArg = {
  requiredString: RequiredString;
};
export type PostApiAuthUisVerifynewusercodeApiResponse = /** status 200 OK */ void;
export type PostApiAuthUisVerifynewusercodeApiArg = {
  verifyUserRequestCode: VerifyUserRequestCode;
};
export type PostApiAuthAddnewuserApiResponse = /** status 200 OK */ UpwardRunningAuthToken;
export type PostApiAuthAddnewuserApiArg = {
  upwardRunningNewUserRequest: UpwardRunningNewUserRequest;
};
export type PostApiAuthCheckExistsApiResponse = /** status 200 OK */ boolean;
export type PostApiAuthCheckExistsApiArg = {
  requiredSingleEmailAddress: RequiredSingleEmailAddress;
};
export type GetApiBadgeByBadgetypeApiResponse = /** status 200 OK */ BadgeSummary;
export type GetApiBadgeByBadgetypeApiArg = {
  badgetype: string;
};
export type GetApiBadgeApiResponse = /** status 200 OK */ BadgeSummary;
export type GetApiBadgeApiArg = void;
export type PostApiBadgeNewbadgecheckApiResponse = /** status 200 OK */ BadgeSummary;
export type PostApiBadgeNewbadgecheckApiArg = void;
export type PostApiChallengeSignupApiResponse = /** status 200 OK */ number;
export type PostApiChallengeSignupApiArg = {
  challengeSignupRequest: ChallengeSignupRequest;
};
export type PostApiChallengeByChallengeIdParticipantsCancelApiResponse = unknown;
export type PostApiChallengeByChallengeIdParticipantsCancelApiArg = {
  challengeId: number;
  requiredString: RequiredString;
};
export type PutApiChallengeByChallengeIdTasksAndTaskIdApiResponse = unknown;
export type PutApiChallengeByChallengeIdTasksAndTaskIdApiArg = {
  challengeId: number;
  taskId: string;
  challengeTaskRequest: ChallengeTaskRequest;
};
export type GetApiChallengeWeeklyoverviewApiResponse = /** status 200 OK */ ChallengeWeekRead;
export type GetApiChallengeWeeklyoverviewApiArg = void;
export type GetApiChallengeWeeklyoverviewByWeekNumberApiResponse = /** status 200 OK */ ChallengeWeekRead;
export type GetApiChallengeWeeklyoverviewByWeekNumberApiArg = {
  weekNumber: number;
};
export type GetApiContentLegalApiResponse = /** status 200 OK */ PageContent;
export type GetApiContentLegalApiArg = void;
export type GetApiContentLegalByVersionIdApiResponse = /** status 200 OK */ PageContent;
export type GetApiContentLegalByVersionIdApiArg = {
  versionId: number;
};
export type GetApiContentWelcomevideoApiResponse = /** status 200 OK */ PageContent;
export type GetApiContentWelcomevideoApiArg = void;
export type GetApiContentDocumentByContentPageSlugApiResponse = /** status 200 OK */ PageContent;
export type GetApiContentDocumentByContentPageSlugApiArg = {
  contentPageSlug: string;
};
export type GetApiContentDocumentByContentPageSlugAndVersionIdApiResponse = /** status 200 OK */ PageContent;
export type GetApiContentDocumentByContentPageSlugAndVersionIdApiArg = {
  contentPageSlug: string;
  versionId: number;
};
export type GetApiContentEventsApiResponse = /** status 200 OK */ Event[];
export type GetApiContentEventsApiArg = void;
export type GetApiContentMembereventsApiResponse = /** status 200 OK */ Event[];
export type GetApiContentMembereventsApiArg = void;
export type GetApiContentAssessmentApiResponse = /** status 200 OK */ QuestionContent;
export type GetApiContentAssessmentApiArg = {
  questionId?: string;
};
export type GetApiContentChallengeweekApiResponse = /** status 200 OK */ ChallengeWeekRead;
export type GetApiContentChallengeweekApiArg = {
  challengeId?: string;
  weekNumber?: number;
  startDate?: string;
};
export type GetApiContentBible365ApiResponse = /** status 200 OK */ Podcast;
export type GetApiContentBible365ApiArg = {
  bible365Id?: string;
  bGetNext?: boolean;
  bGetPrevious?: boolean;
};
export type GetApiContentThoughtsApiResponse = /** status 200 OK */ Thoughts;
export type GetApiContentThoughtsApiArg = {
  thoughtId?: string;
  bGetNext?: boolean;
  bGetPrevious?: boolean;
};
export type GetApiContentCategoriesApiResponse = /** status 200 OK */ ChallengeCategoryRead[];
export type GetApiContentCategoriesApiArg = void;
export type GetApiContentChallengesbycategoryApiResponse = /** status 200 OK */ ChallengeDetails[];
export type GetApiContentChallengesbycategoryApiArg = {
  categoryId?: string;
};
export type PostApiFormSupportApiResponse = /** status 200 OK */ SubmissionResponse;
export type PostApiFormSupportApiArg = {
  contactSupportForm: ContactSupportForm;
};
export type GetApiPartnerChallengeListForAccountByAcctApiResponse = /** status 200 OK */ PartnerChallengeInfoRead[];
export type GetApiPartnerChallengeListForAccountByAcctApiArg = {
  acct: string;
};
export type GetApiPartnerChallengeInfoByUpwardChallengeIdApiResponse = /** status 200 OK */ PartnerChallengeInfoRead;
export type GetApiPartnerChallengeInfoByUpwardChallengeIdApiArg = {
  upwardChallengeId: string;
};
export type GetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsApiResponse = /** status 200 OK */ PartnerChallengeParticipantInfoRead[];
export type GetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsApiArg = {
  upwardChallengeId: string;
};
export type PostApiPartnerChallengeApiResponse = /** status 200 OK */ PartnerChallengeRead;
export type PostApiPartnerChallengeApiArg = {
  partnerChallengeRequest: PartnerChallengeRequest;
};
export type GetApiPartnerChallengeByUpwardChallengeIdApiResponse = /** status 200 OK */ PartnerChallengeRead;
export type GetApiPartnerChallengeByUpwardChallengeIdApiArg = {
  upwardChallengeId: string;
};
export type PutApiPartnerChallengeByUpwardChallengeIdApiResponse = /** status 200 OK */ PartnerChallengeRead;
export type PutApiPartnerChallengeByUpwardChallengeIdApiArg = {
  upwardChallengeId: string;
  partnerChallengeRequest: PartnerChallengeRequest;
};
export type PostApiPartnerChallengeVerificationDetailsApiResponse = /** status 200 OK */ UpwardVerificationDetailsRead;
export type PostApiPartnerChallengeVerificationDetailsApiArg = {
  partnerChallengeRequest: PartnerChallengeRequest;
};
export type PostApiPartnerChallengeByUpwardChallengeIdVerificationDetailsApiResponse = /** status 200 OK */ UpwardVerificationDetailsRead;
export type PostApiPartnerChallengeByUpwardChallengeIdVerificationDetailsApiArg = {
  upwardChallengeId: string;
  partnerChallengeRequest: PartnerChallengeRequest;
};
export type GetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdApiResponse = /** status 200 OK */ PartnerChallengeRegistrationInfoRead;
export type GetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdApiArg = {
  upwardChallengeId: string;
};
export type GetApiPodCastApiResponse = unknown;
export type GetApiPodCastApiArg = void;
export type GetApiPodCastListApiResponse = unknown;
export type GetApiPodCastListApiArg = {
  startDate?: string;
  endDate?: string;
};
export type GetApiStatsByChallengeIdApiResponse = /** status 200 OK */ IndividualStatsRead;
export type GetApiStatsByChallengeIdApiArg = {
  challengeId: number;
};
export type GetApiStatsApiResponse = /** status 200 OK */ IndividualStatsRead;
export type GetApiStatsApiArg = void;
export type GetApiStatsLogApiResponse = /** status 200 OK */ IndividualActivityInfo[];
export type GetApiStatsLogApiArg = {
  startDate?: string;
  endDate?: string;
  challengeId?: number;
};
export type PostApiStripeNewsessionApiResponse = /** status 200 OK */ CreateCheckoutSessionResponse;
export type PostApiStripeNewsessionApiArg = {
  createCheckoutSessionRequest: CreateCheckoutSessionRequest;
};
export type PostApiStripeNewPartnerChallengeSessionApiResponse = /** status 200 OK */ CreateCheckoutSessionResponse;
export type PostApiStripeNewPartnerChallengeSessionApiArg = {
  createPartnerChallengeCheckoutSessionRequest: CreatePartnerChallengeCheckoutSessionRequest;
};
export type PostApiSubscriptionConfirmApiResponse = unknown;
export type PostApiSubscriptionConfirmApiArg = {
  requiredString: RequiredString;
};
export type PostApiSubscriptionCancelApiResponse = unknown;
export type PostApiSubscriptionCancelApiArg = {
  requiredString: RequiredString;
};
export type GetApiUserCurrentUserInfoApiResponse = /** status 200 OK */ IndividualInfoRead;
export type GetApiUserCurrentUserInfoApiArg = void;
export type GetApiUserNewamitytokenApiResponse = /** status 200 OK */ string;
export type GetApiUserNewamitytokenApiArg = void;
export type PutApiUserProfileApiResponse = /** status 200 OK */ IndividualInfoRead;
export type PutApiUserProfileApiArg = {
  updateUserProfileRequest: UpdateUserProfileRequest;
};
export type PostApiUserSetLastViewedBible365ApiResponse = unknown;
export type PostApiUserSetLastViewedBible365ApiArg = {
  requiredString: RequiredString;
};
export type PostApiUserSetLastViewedThoughtsApiResponse = unknown;
export type PostApiUserSetLastViewedThoughtsApiArg = {
  requiredString: RequiredString;
};
export type PostApiUserHasSeenWelcomeVideoApiResponse = unknown;
export type PostApiUserHasSeenWelcomeVideoApiArg = void;
export type GetApiUserNotificationSettingsApiResponse = /** status 200 OK */ IndividualTypeNotificationInfo[];
export type GetApiUserNotificationSettingsApiArg = void;
export type PutApiUserNotificationSettingsApiResponse = /** status 200 OK */ IndividualTypeNotificationInfo[];
export type PutApiUserNotificationSettingsApiArg = {
  body: IndividualTypeNotificationInfo[];
};
export type IndividualActivity = {
  individualID?: number;
  typeActivityID?: string | null;
  activityName?: string | null;
  activityStartDate?: string | null;
  activityEndDate?: string | null;
  distance?: number;
  steps?: number;
  elevationChange?: number;
  note?: string | null;
  isPersonalBest?: boolean;
  gpsTrackingData?: string | null;
  challengeID?: number;
  challengeTaskID?: string | null;
};
export type IndividualActivityRead = {
  activityID?: number;
  individualID?: number;
  typeActivityID?: string | null;
  activityName?: string | null;
  activityStartDate?: string | null;
  activityEndDate?: string | null;
  distance?: number;
  steps?: number;
  elevationChange?: number;
  note?: string | null;
  isPersonalBest?: boolean;
  gpsTrackingData?: string | null;
  challengeID?: number;
  challengeTaskID?: string | null;
};
export type IndividualActivityRequest = {
  typeActivityID: string;
  activityName: string;
  activityStartDate: string;
  activityEndDate: string;
  distance?: number;
  steps?: number;
  elevationChange?: number;
  note?: string | null;
  isPersonalBest?: boolean;
  gpsTrackingData?: string | null;
  challengeID?: number;
  challengeTaskID?: string | null;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type UpwardRunningAuthToken = {
  upwrJWToken?: string | null;
  hasUpwardRunningAccount?: boolean;
  hasUpwardRunningSubscription?: boolean;
};
export type IOutputFormatter = object;
export type UpwardExceptionResult = {
  value?: any | null;
  formatters?: IOutputFormatter[] | null;
  contentTypes?: string[] | null;
  declaredType?: string | null;
  statusCode?: number | null;
};
export type UpwardIdentityCredentials = {
  username: string;
  password: string;
  newPassword?: string | null;
  tokenTimeoutMinutes?: number;
};
export type RequiredString = {
  value: string;
};
export type RequiredSingleEmailAddress = {
  emailAddress: string;
};
export type AcceptUsernameChangeRequest = {
  newUsername: string;
  usernameChangeCode: string;
};
export type UpwardRunningNewUisUserRequest = {
  newPassword: string;
  newUsername: string;
  newFullName: string;
  twoFactorAuthEnabled?: boolean;
};
export type VerifyUserRequestCode = {
  newUserCode: string;
  emailAddress: string;
};
export type IndividualAddressChangeRequest = {
  typeAddressID: string;
  street1: string;
  street2?: string | null;
  subdivision1: string;
  subdivision2: string;
  postalCode: string;
  typeCountryID: string;
};
export type UpwardRunningNewUserRequest = {
  firstName: string;
  lastName: string;
  middleInitial?: string | null;
  emailAddress: string;
  password?: string | null;
  gender: string;
  address: IndividualAddressChangeRequest;
  birthDate: string;
  newUISUserCode?: string | null;
};
export type IndividualBadgeInfo = {
  individualID?: number;
  typeBadgeID?: string | null;
  awardDate?: string | null;
  badgeViewed?: boolean;
  badgeImageOverride?: string | null;
};
export type BadgeInfo = {
  name?: string | null;
  count?: number;
  badgeUrl?: string | null;
  individualBadges?: IndividualBadgeInfo[] | null;
};
export type BadgeSummary = {
  badges?: BadgeInfo[] | null;
};
export type ProfileAnswer = {
  upwardProfileQuestionID: string;
  answerValue: string;
};
export type Challenge = {
  upwardChallengeCMSID: string;
  startDate?: string | null;
};
export type ChallengeSignupRequest = {
  profileAnswers?: ProfileAnswer[] | null;
  selectedChallenge?: Challenge;
};
export type ChallengeTaskRequest = {
  completionDate?: string | null;
  upwardCMSContentTypeID?: string | null;
  viewedCMSContentID?: string | null;
};
export type ChallengeInfo = {
  name?: string | null;
  imageUrl?: string | null;
  badgeType?: string | null;
  badgeUrl?: string | null;
  currentWeek?: number;
  weekInThisPayload?: number;
  totalWeeks?: number;
  totalTasks?: number;
  nationalChallenge?: boolean;
  partnerChallenge?: boolean;
  progress?: number;
  challengeID?: string | null;
  individualChallengeID?: number;
  challengeType?: string | null;
  startDate?: string | null;
};
export type IInspirationContent = {
  inspirationID?: string | null;
  id?: number;
  title?: string | null;
  subTitle?: string | null;
  content?: string | null;
  headerImageUrl?: string | null;
};
export type DayTask = {
  taskID?: string | null;
  dayOfWeek?: number;
  weekDayDate?: string | null;
  description?: string | null;
  primaryTask?: string | null;
  primaryTaskType?: string | null;
  inspiration?: IInspirationContent;
  inspirationType?: string | null;
  runWalkActivityID?: number;
  isComplete?: boolean;
};
export type DayTaskRead = {
  taskID?: string | null;
  dayOfWeek?: number;
  weekDayDate?: string | null;
  weekDayName?: string | null;
  description?: string | null;
  primaryTask?: string | null;
  primaryTaskType?: string | null;
  inspiration?: IInspirationContent;
  inspirationType?: string | null;
  runWalkActivityID?: number;
  isComplete?: boolean;
};
export type ChallengeWeek = {
  completed?: boolean;
  info?: ChallengeInfo;
  tasks?: DayTask[] | null;
};
export type ChallengeWeekRead = {
  completed?: boolean;
  info?: ChallengeInfo;
  tasks?: DayTaskRead[] | null;
};
export type PageContent = {
  title?: string | null;
  shortDescription?: string | null;
  htmlContent?: string | null;
  mediaLink?: string | null;
  active?: boolean;
  version?: string | null;
};
export type Event = {
  title?: string | null;
  subtitle?: string | null;
  htmlContent?: string | null;
  formattedDate?: string | null;
  imageLink?: string | null;
  actionLink?: string | null;
  actionLinkText?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  active?: boolean;
  membersOnly?: boolean;
  pinToTop?: boolean;
};
export type Question = {
  label?: string | null;
  value?: string | null;
  sortOrder?: number;
};
export type StartDateDetails = {
  challengeID?: string | null;
  startDate?: string | null;
  nationalChallenge?: boolean;
  durationInDays?: number;
};
export type ChallengeDetails = {
  title?: string | null;
  subTitle?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  imageUrl?: string | null;
  badgeUrl?: string | null;
  badgeType?: string | null;
  startDate?: string | null;
  duration?: number;
  durationInDays?: number;
  nationalChallenge?: boolean;
  totalTasks?: number;
  upwardChallengeCMSID?: string | null;
};
export type WarningDetails = object;
export type SingleSelectDetails = object;
export type QuestionContent = {
  description?: string | null;
  question?: string | null;
  questionType?: string | null;
  answers?: Question[] | null;
  startDateDetails?: StartDateDetails;
  challengeDetails?: ChallengeDetails;
  warningDetails?: WarningDetails;
  singleSelectDetails?: SingleSelectDetails;
  nextStep?: string | null;
};
export type Podcast = {
  id?: string | null;
  title?: string | null;
  episode?: string | null;
  duration?: string | null;
  audioFileUrl?: string | null;
  description?: string | null;
  publishDate?: string | null;
  thumbnailImageUrl?: string | null;
  dashboardImageUrl?: string | null;
};
export type Thoughts = {
  title?: string | null;
  subtitle?: string | null;
  thoughtID?: string | null;
  dashboardImageUrl?: string | null;
  headerImageUrl?: string | null;
  thoughtArticleID?: number;
  content?: string | null;
};
export type ChallengeCategory = {
  name?: string | null;
  description?: string | null;
  thumbnailImageUrl?: string | null;
  sortOrder?: string | null;
};
export type ChallengeCategoryRead = {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  thumbnailImageUrl?: string | null;
  sortOrder?: string | null;
};
export type Content = {
  submissionID?: string | null;
  url?: string | null;
};
export type SubmissionResponse = {
  responseCode?: number;
  message?: string | null;
  content?: Content;
  'limit-left'?: number;
};
export type ContactSupportForm = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  description?: string | null;
  additionalInfo?: string | null;
};
export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type IndividualThirdPartyClientIdInfo = {
  individualID?: number;
  typeThirdPartyClientID?: string | null;
  thirdPartyClientID?: string | null;
};
export type IndividualThirdPartyClientIdInfoRead = {
  individualID?: number;
  typeThirdPartyClientID?: string | null;
  thirdPartyClientID?: string | null;
  isEmpty?: boolean;
};
export type IndividualEmailInfo = {
  individualID?: number;
  emailID?: number;
  typeEmailID?: string | null;
  emailAddress?: string | null;
  priority?: number;
  valid?: boolean;
  validityReason?: string | null;
};
export type IndividualAddressInfo = {
  individualID?: number;
  addressID?: number;
  typeAddressID?: string | null;
  street1?: string | null;
  street2?: string | null;
  subdivision1?: string | null;
  subdivision2?: string | null;
  postalCode?: string | null;
  typeCountryID?: string | null;
  priority?: number;
};
export type IndividualPhoneInfo = {
  individualID?: number;
  phoneID?: number;
  typePhoneID?: string | null;
  phoneNumber?: string | null;
  extension?: string | null;
  allowSMS?: boolean;
  priority?: number;
};
export type IndividualInfo = {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  churchName?: string | null;
  joinDate?: string | null;
  hasViewedWelcomeVideo?: boolean;
  lastViewed365CMSID?: string | null;
  lastViewedThoughtCMSID?: string | null;
  currentChallengeID?: number;
  currentChallengeName?: string | null;
  currentChallengeIsPartnerChallenge?: boolean;
  growthGoalID?: string | null;
  knowledgeLevelID?: string | null;
  lastReadKnowledgeContentID?: string | null;
  renewalDate?: string | null;
  hasBeenEnrolled?: boolean;
  thirdPartyClientIDs?: IndividualThirdPartyClientIdInfo[] | null;
  emails?: IndividualEmailInfo[] | null;
  addresses?: IndividualAddressInfo[] | null;
  phones?: IndividualPhoneInfo[] | null;
};
export type IndividualInfoRead = {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  churchName?: string | null;
  joinDate?: string | null;
  hasViewedWelcomeVideo?: boolean;
  lastViewed365CMSID?: string | null;
  lastViewedThoughtCMSID?: string | null;
  currentChallengeID?: number;
  currentChallengeName?: string | null;
  currentChallengeIsPartnerChallenge?: boolean;
  growthGoalID?: string | null;
  knowledgeLevelID?: string | null;
  lastReadKnowledgeContentID?: string | null;
  renewalDate?: string | null;
  hasBeenEnrolled?: boolean;
  thirdPartyClientIDs?: IndividualThirdPartyClientIdInfoRead[] | null;
  emails?: IndividualEmailInfo[] | null;
  addresses?: IndividualAddressInfo[] | null;
  phones?: IndividualPhoneInfo[] | null;
  isEmpty?: boolean;
  formattedName?: string | null;
  firstEmailAddress?: string | null;
  firstPhoneNumber?: string | null;
};
export type PartnerChallengeUdfDefinitionInfo = {};
export type PartnerChallengeUdfDefinitionInfoRead = {
  udfid?: number;
  label?: string | null;
  description?: string | null;
  sortOrder?: number;
  isRequired?: boolean;
  isPrivate?: boolean;
};
export type PartnerChallengeInfo = {
  id?: number;
  upwardChallengeCMSID?: string | null;
  startDate?: string | null;
  publicDisplayName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  kickoffEventLocation?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  classDay?: DayOfWeek;
  runningCoachInfo?: IndividualInfo;
  udfs?: PartnerChallengeUdfDefinitionInfo[] | null;
};
export type PartnerChallengeProductConfigInfo = {};
export type PartnerChallengeProductConfigInfoRead = {
  upwardProductID?: string | null;
  upwardColorTypeID?: string | null;
  upwardSizeTypeID?: string | null;
  isOptional?: boolean;
  optionalProductCost?: number;
};
export type PartnerChallengeInfoRead = {
  id?: number;
  upwardChallengeCMSID?: string | null;
  startDate?: string | null;
  publicDisplayName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  kickoffEventLocation?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  challengeName?: string | null;
  upwardChallengeID?: string | null;
  coachPartnerContactID?: number;
  accountNumber?: string | null;
  typeTimezoneID?: string | null;
  classDay?: DayOfWeek;
  classTime?: string | null;
  missionObjective?: string | null;
  registrationBeginDate?: string | null;
  registrationEndDate?: string | null;
  registrationFee?: number;
  earlyRegistrationEndDate?: string | null;
  earlyRegistrationFee?: number;
  registrationStartMessage?: string | null;
  confirmationMessage?: string | null;
  devotionTrackCMSID?: string | null;
  hideFromLeagueFinder?: boolean;
  leagueFinderMessage?: string | null;
  participantEstimate?: number;
  typeLeagueID?: string | null;
  runningCoachInfo?: IndividualInfoRead;
  productConfig?: PartnerChallengeProductConfigInfoRead[] | null;
  udfs?: PartnerChallengeUdfDefinitionInfoRead[] | null;
  isEmpty?: boolean;
};
export type PartnerChallengeParticipantUdfValueInfo = {
  udfid?: number;
  udfValue?: string | null;
};
export type PartnerChallengeParticipantInfo = {
  challengeID?: number;
  individualID?: number;
  isLeader?: boolean;
  completionDate?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  generalNotes?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  churchName?: string | null;
  emailAddress?: string | null;
  street1?: string | null;
  street2?: string | null;
  subdivision1?: string | null;
  subdivision2?: string | null;
  postalCode?: string | null;
  typeCountryID?: string | null;
  phoneNumber?: string | null;
  extension?: string | null;
  udFs?: PartnerChallengeParticipantUdfValueInfo[] | null;
};
export type PartnerChallengeParticipantInfoRead = {
  challengeID?: number;
  individualID?: number;
  isLeader?: boolean;
  completionDate?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  generalNotes?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  churchName?: string | null;
  emailAddress?: string | null;
  street1?: string | null;
  street2?: string | null;
  subdivision1?: string | null;
  subdivision2?: string | null;
  postalCode?: string | null;
  typeCountryID?: string | null;
  phoneNumber?: string | null;
  extension?: string | null;
  udFs?: PartnerChallengeParticipantUdfValueInfo[] | null;
  isActive?: boolean;
  formattedName?: string | null;
};
export type PartnerChallengeStartupProductConfig = {
  upwardProductID?: string | null;
  upwardColorTypeID?: string | null;
  upwardSizeTypeID?: string | null;
  quantity?: number;
};
export type PartnerChallengeProductConfig = {
  upwardProductID?: string | null;
  upwardColorTypeID?: string | null;
  upwardSizeTypeID?: string | null;
  isOptional?: boolean;
  optionalProductCost?: number;
};
export type PartnerChallengeUdfDefinition = {
  label?: string | null;
  description?: string | null;
  sortOrder?: number;
  isRequired?: boolean;
  isPrivate?: boolean;
};
export type PartnerChallengeUdfDefinitionRead = {
  udfid?: number;
  label?: string | null;
  description?: string | null;
  sortOrder?: number;
  isRequired?: boolean;
  isPrivate?: boolean;
};
export type PartnerChallengeDiscountCode = {
  description?: string | null;
  discountCode?: string | null;
  discountAmount?: number;
  maxUsages?: number;
  numberOfUsages?: number;
  active?: boolean;
};
export type PartnerChallengeDiscountCodeRead = {
  discountCodeID?: number;
  description?: string | null;
  discountCode?: string | null;
  discountAmount?: number;
  maxUsages?: number;
  numberOfUsages?: number;
  active?: boolean;
};
export type ChallengeParticipant = {
  individualID?: number;
  isLeader?: boolean;
  completionDate?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  generalNotes?: string | null;
};
export type PartnerChallenge = {
  challengeName?: string | null;
  coachPartnerContactID?: number;
  accountNumber?: string | null;
  typeTimezoneID?: string | null;
  classDay?: DayOfWeek;
  classTime?: string | null;
  missionObjective?: string | null;
  registrationBeginDate?: string | null;
  registrationEndDate?: string | null;
  registrationFee?: number;
  earlyRegistrationEndDate?: string | null;
  earlyRegistrationFee?: number;
  registrationStartMessage?: string | null;
  confirmationMessage?: string | null;
  devotionTrackCMSID?: string | null;
  hideFromLeagueFinder?: boolean;
  leagueFinderMessage?: string | null;
  participantEstimate?: number;
  startupProductConfig?: PartnerChallengeStartupProductConfig[] | null;
  productConfig?: PartnerChallengeProductConfig[] | null;
  udfs?: PartnerChallengeUdfDefinition[] | null;
  discountCodes?: PartnerChallengeDiscountCode[] | null;
  upwardChallengeCMSID?: string | null;
  startDate?: string | null;
  lockedToIndividualID?: number;
  publicDisplayName?: string | null;
  upwardBadgeTypeID?: string | null;
  badgeUrl?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  kickoffEventLocation?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  totalTasks?: number;
  participants?: ChallengeParticipant[] | null;
};
export type PartnerChallengeRead = {
  challengeName?: string | null;
  upwardChallengeID?: string | null;
  coachPartnerContactID?: number;
  accountNumber?: string | null;
  typeTimezoneID?: string | null;
  classDay?: DayOfWeek;
  classTime?: string | null;
  missionObjective?: string | null;
  registrationBeginDate?: string | null;
  registrationEndDate?: string | null;
  registrationFee?: number;
  earlyRegistrationEndDate?: string | null;
  earlyRegistrationFee?: number;
  registrationStartMessage?: string | null;
  confirmationMessage?: string | null;
  devotionTrackCMSID?: string | null;
  hideFromLeagueFinder?: boolean;
  leagueFinderMessage?: string | null;
  participantEstimate?: number;
  startupProductConfig?: PartnerChallengeStartupProductConfig[] | null;
  productConfig?: PartnerChallengeProductConfig[] | null;
  udfs?: PartnerChallengeUdfDefinitionRead[] | null;
  discountCodes?: PartnerChallengeDiscountCodeRead[] | null;
  typeLeagueID?: string | null;
  id?: number;
  upwardChallengeCMSID?: string | null;
  startDate?: string | null;
  lockedToIndividualID?: number;
  publicDisplayName?: string | null;
  upwardBadgeTypeID?: string | null;
  badgeUrl?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  kickoffEventLocation?: string | null;
  cancelDate?: string | null;
  cancelReason?: string | null;
  totalTasks?: number;
  participants?: ChallengeParticipant[] | null;
};
export type PartnerChallengeStartupProductConfigRequest = {
  upwardProductID?: string | null;
  upwardColorTypeID?: string | null;
  upwardSizeTypeID?: string | null;
  quantity?: number;
};
export type PartnerChallengeProductConfigRequest = {
  upwardProductID?: string | null;
  upwardColorTypeID?: string | null;
  upwardSizeTypeID?: string | null;
  isOptional?: boolean;
  optionalProductCost?: number;
};
export type PartnerChallengeUdfDefinitionRequest = {
  udfid?: number;
  label?: string | null;
  description?: string | null;
  sortOrder?: number;
  isRequired?: boolean;
  isPrivate?: boolean;
};
export type PartnerChallengeDiscountCodeRequest = {
  discountCodeID?: number;
  description?: string | null;
  discountCode?: string | null;
  discountAmount?: number;
  maxUsages?: number;
  numberOfUsages?: number;
  active?: boolean;
};
export type PartnerChallengeRequest = {
  challengeID?: number;
  startDate?: string | null;
  publicDisplayName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  typeLeagueID?: string | null;
  challengeName?: string | null;
  upwardChallengeID?: string | null;
  coachPartnerContactID?: number;
  accountNumber?: string | null;
  typeTimezoneID?: string | null;
  classDay?: DayOfWeek;
  classTime?: string | null;
  missionObjective?: string | null;
  registrationBeginDate?: string | null;
  registrationEndDate?: string | null;
  registrationFee?: number;
  earlyRegistrationEndDate?: string | null;
  earlyRegistrationFee?: number;
  registrationStartMessage?: string | null;
  confirmationMessage?: string | null;
  devotionTrackCMSID?: string | null;
  hideFromLeagueFinder?: boolean;
  leagueFinderMessage?: string | null;
  participantEstimate?: number;
  startupProductConfig?: PartnerChallengeStartupProductConfigRequest[] | null;
  productConfig?: PartnerChallengeProductConfigRequest[] | null;
  udfs?: PartnerChallengeUdfDefinitionRequest[] | null;
  discountCodes?: PartnerChallengeDiscountCodeRequest[] | null;
};
export type PropertyMessage = {
  propertyName?: string | null;
  message?: string | null;
  messageID?: string | null;
};
export type UpwardVerificationDetails = {
  brokenRules?: PropertyMessage[] | null;
};
export type UpwardVerificationDetailsRead = {
  brokenRules?: PropertyMessage[] | null;
  warnings?: PropertyMessage[] | null;
  model?: any | null;
};
export type StringStringKeyValuePair = {
  key?: string | null;
  value?: string | null;
};
export type RegistrationProductInfo = {
  id?: number;
  productID?: string | null;
  productName?: string | null;
  parentProductID?: string | null;
  productSizeList?: StringStringKeyValuePair[] | null;
  intendedForGender?: string | null;
  cmsProductName?: string | null;
  cmsProductDescription?: string | null;
  cmsProductImageUrls?: string[] | null;
  cmsUnitDescription?: string | null;
  cmsSizingGuideUrl?: string | null;
  digitalFormatAvailable?: string | null;
};
export type RegistrationProductInfoRead = {
  id?: number;
  productID?: string | null;
  productName?: string | null;
  parentProductID?: string | null;
  productSizeList?: StringStringKeyValuePair[] | null;
  intendedForGender?: string | null;
  productNamePlural?: string | null;
  cmsProductName?: string | null;
  cmsProductDescription?: string | null;
  cmsProductImageUrls?: string[] | null;
  cmsUnitDescription?: string | null;
  cmsSizingGuideUrl?: string | null;
  digitalFormatAvailable?: string | null;
  bailoutProductName?: string | null;
};
export type PartnerInfo = {
  name?: string | null;
  isGlobal?: boolean;
  address1_Line1?: string | null;
  address1_Line2?: string | null;
  address1_City?: string | null;
  address1_StateOrProvince?: string | null;
  address1_County?: string | null;
  address1_Country?: string | null;
  address1_CountryCode?: string | null;
  address1_PostalCode?: string | null;
  facebookPage?: string | null;
  twitterAccount?: string | null;
  webSiteUrl?: string | null;
  fanGearCustomURL?: string | null;
};
export type PartnerChallengeRegistrationInfo = {
  partnerChallengeInfo?: PartnerChallengeInfo;
  registrationProducts?: RegistrationProductInfo[] | null;
  partnerInfo?: PartnerInfo;
};
export type PartnerChallengeRegistrationInfoRead = {
  partnerChallengeInfo?: PartnerChallengeInfoRead;
  registrationProducts?: RegistrationProductInfoRead[] | null;
  partnerInfo?: PartnerInfo;
};
export type ChallengeStats = {
  activityType?: string | null;
  totalMiles?: number | null;
  steps?: number | null;
  activities?: number | null;
  totalMinutes?: number | null;
  avgPace?: number | null;
  avgSpeed?: number | null;
  avgPerActivity?: number | null;
  avgElevationChange?: number | null;
};
export type LifetimeStats = {
  totalMilesRunning?: number | null;
  totalMilesWalking?: number | null;
  totalMinutesRunning?: number | null;
  totalMinutesWalking?: number | null;
  totalSteps?: number | null;
  totalRunsLogged?: number | null;
  totalWalksLogged?: number | null;
  avgPaceRunning?: number | null;
  avgPaceWalking?: number | null;
  avgSpeedRunning?: number | null;
  avgSpeedWalking?: number | null;
  totalMilesThisWeek?: number | null;
  totalMilesThisMonth?: number | null;
  totalMilesThisYear?: number | null;
  totalElevation?: number | null;
};
export type LifetimeStatsRead = {
  totalMilesRunning?: number | null;
  totalMilesWalking?: number | null;
  totalMiles?: number | null;
  totalMinutesRunning?: number | null;
  totalMinutesWalking?: number | null;
  totalMinutes?: number | null;
  totalSteps?: number | null;
  totalRunsLogged?: number | null;
  totalWalksLogged?: number | null;
  avgPaceRunning?: number | null;
  avgPaceWalking?: number | null;
  avgSpeedRunning?: number | null;
  avgSpeedWalking?: number | null;
  totalMilesThisWeek?: number | null;
  totalMilesThisMonth?: number | null;
  totalMilesThisYear?: number | null;
  totalElevation?: number | null;
};
export type IndividualStats = {
  enrolledInChallenge?: boolean;
  challengeStats?: ChallengeStats;
  lifetimeStats?: LifetimeStats;
};
export type IndividualStatsRead = {
  enrolledInChallenge?: boolean;
  challengeStats?: ChallengeStats;
  lifetimeStats?: LifetimeStatsRead;
};
export type IndividualActivityInfo = {
  typeActivityID?: string | null;
  activityName?: string | null;
  activityStartDate?: string | null;
  activityEndDate?: string | null;
  distance?: number;
  steps?: number;
  elevationChange?: number;
  averagePace?: number;
  note?: string | null;
  isPersonalBest?: boolean;
  gpsTrackingData?: string | null;
  challengeID?: number;
  challengeTaskID?: string | null;
  individualID?: number;
  activityID?: number;
};
export type CreateCheckoutSessionResponse = {
  checkoutURL?: string | null;
};
export type CreateCheckoutSessionRequest = {
  typeSubscriptionID: string;
  typePricingPlanID: string;
  redirectBaseURL?: string | null;
  promoCodes?: string[] | null;
};
export type IndividualPhoneChangeRequest = {
  typePhoneID: string;
  phoneNumber: string;
  extension?: string | null;
  allowSMS?: boolean;
};
export type PartnerChallengeParticipantUdfValueChangeRequest = {
  udfid?: number;
  udfValue: string;
};
export type PartnerChallengeParticipantProductChangeRequest = {
  upwardProductID: string;
  upwardSizeTypeID: string;
};
export type CreatePartnerChallengeCheckoutSessionRequest = {
  upwardChallengeID: string;
  churchName?: string | null;
  generalNotes?: string | null;
  phone: IndividualPhoneChangeRequest;
  udfs?: PartnerChallengeParticipantUdfValueChangeRequest[] | null;
  products?: PartnerChallengeParticipantProductChangeRequest[] | null;
  typeSubscriptionID?: string | null;
  typePricingPlanID?: string | null;
  redirectBaseURL?: string | null;
  promoCodes?: string[] | null;
};
export type UpdateUserProfileRequest = {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
};
export type IndividualTypeNotificationInfo = {
  upwardNotificationTypeID?: string | null;
  description?: string | null;
  isEmailNotification?: boolean;
  isPushNotification?: boolean;
  isEnabled?: boolean;
};
export const {
  usePostApiActivityMutation,
  useGetApiActivityByActivityIdQuery,
  useLazyGetApiActivityByActivityIdQuery,
  usePutApiActivityByActivityIdMutation,
  useDeleteApiActivityByActivityIdMutation,
  usePostApiAuthLoginMutation,
  usePostApiAuthValidateTotpMutation,
  usePostApiAuthTokenrefreshMutation,
  usePostApiAuthPasswordresetMutation,
  usePostApiAuthRequestusernamechangeMutation,
  usePostApiAuthAcceptusernamechangeMutation,
  useGetApiAuthGuesttokenQuery,
  useLazyGetApiAuthGuesttokenQuery,
  usePostApiAuthUisRequestnewuserMutation,
  usePostApiAuthUisResendnewusercodeMutation,
  usePostApiAuthUisVerifynewusercodeMutation,
  usePostApiAuthAddnewuserMutation,
  usePostApiAuthCheckExistsMutation,
  useGetApiBadgeByBadgetypeQuery,
  useLazyGetApiBadgeByBadgetypeQuery,
  useGetApiBadgeQuery,
  useLazyGetApiBadgeQuery,
  usePostApiBadgeNewbadgecheckMutation,
  usePostApiChallengeSignupMutation,
  usePostApiChallengeByChallengeIdParticipantsCancelMutation,
  usePutApiChallengeByChallengeIdTasksAndTaskIdMutation,
  useGetApiChallengeWeeklyoverviewQuery,
  useLazyGetApiChallengeWeeklyoverviewQuery,
  useGetApiChallengeWeeklyoverviewByWeekNumberQuery,
  useLazyGetApiChallengeWeeklyoverviewByWeekNumberQuery,
  useGetApiContentLegalQuery,
  useLazyGetApiContentLegalQuery,
  useGetApiContentLegalByVersionIdQuery,
  useLazyGetApiContentLegalByVersionIdQuery,
  useGetApiContentWelcomevideoQuery,
  useLazyGetApiContentWelcomevideoQuery,
  useGetApiContentDocumentByContentPageSlugQuery,
  useLazyGetApiContentDocumentByContentPageSlugQuery,
  useGetApiContentDocumentByContentPageSlugAndVersionIdQuery,
  useLazyGetApiContentDocumentByContentPageSlugAndVersionIdQuery,
  useGetApiContentEventsQuery,
  useLazyGetApiContentEventsQuery,
  useGetApiContentMembereventsQuery,
  useLazyGetApiContentMembereventsQuery,
  useGetApiContentAssessmentQuery,
  useLazyGetApiContentAssessmentQuery,
  useGetApiContentChallengeweekQuery,
  useLazyGetApiContentChallengeweekQuery,
  useGetApiContentBible365Query,
  useLazyGetApiContentBible365Query,
  useGetApiContentThoughtsQuery,
  useLazyGetApiContentThoughtsQuery,
  useGetApiContentCategoriesQuery,
  useLazyGetApiContentCategoriesQuery,
  useGetApiContentChallengesbycategoryQuery,
  useLazyGetApiContentChallengesbycategoryQuery,
  usePostApiFormSupportMutation,
  useGetApiPartnerChallengeListForAccountByAcctQuery,
  useLazyGetApiPartnerChallengeListForAccountByAcctQuery,
  useGetApiPartnerChallengeInfoByUpwardChallengeIdQuery,
  useLazyGetApiPartnerChallengeInfoByUpwardChallengeIdQuery,
  useGetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsQuery,
  useLazyGetApiPartnerChallengeInfoByUpwardChallengeIdParticipantsQuery,
  usePostApiPartnerChallengeMutation,
  useGetApiPartnerChallengeByUpwardChallengeIdQuery,
  useLazyGetApiPartnerChallengeByUpwardChallengeIdQuery,
  usePutApiPartnerChallengeByUpwardChallengeIdMutation,
  usePostApiPartnerChallengeVerificationDetailsMutation,
  usePostApiPartnerChallengeByUpwardChallengeIdVerificationDetailsMutation,
  useGetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdQuery,
  useLazyGetApiPartnerChallengeRegistrationInfoByUpwardChallengeIdQuery,
  useGetApiPodCastQuery,
  useLazyGetApiPodCastQuery,
  useGetApiPodCastListQuery,
  useLazyGetApiPodCastListQuery,
  useGetApiStatsByChallengeIdQuery,
  useLazyGetApiStatsByChallengeIdQuery,
  useGetApiStatsQuery,
  useLazyGetApiStatsQuery,
  useGetApiStatsLogQuery,
  useLazyGetApiStatsLogQuery,
  usePostApiStripeNewsessionMutation,
  usePostApiStripeNewPartnerChallengeSessionMutation,
  usePostApiSubscriptionConfirmMutation,
  usePostApiSubscriptionCancelMutation,
  useGetApiUserCurrentUserInfoQuery,
  useLazyGetApiUserCurrentUserInfoQuery,
  useGetApiUserNewamitytokenQuery,
  useLazyGetApiUserNewamitytokenQuery,
  usePutApiUserProfileMutation,
  usePostApiUserSetLastViewedBible365Mutation,
  usePostApiUserSetLastViewedThoughtsMutation,
  usePostApiUserHasSeenWelcomeVideoMutation,
  useGetApiUserNotificationSettingsQuery,
  useLazyGetApiUserNotificationSettingsQuery,
  usePutApiUserNotificationSettingsMutation,
} = injectedRtkApi;
