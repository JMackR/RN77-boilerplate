export interface FormState {
  value: string | undefined;
  isValid: boolean;
  error?: string;
}

export interface FormFields {
  firstName: FormState;
  lastName: FormState;
  email: FormState;
  phone: FormState;
  message: FormState;
  additionalInfo: FormState;
}
