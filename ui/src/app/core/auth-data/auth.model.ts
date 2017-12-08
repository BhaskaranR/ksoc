
export interface RegisterModel {
    firstName: String;
    lastName: String;
    mail: String;
    password: String;
}

export interface LoginModel {
    mail: String;
    password: String;
}

export interface LoginSubmitPayload {
    loginModel: LoginModel;
    returnUrl: string;
}

export interface RegistrationSubmitPayload {
    registerModel: RegisterModel;
    returnUrl: string;
}

export interface ResetPasswordModel {
    newPassword: string;
    confirmPassword: string;
}

export interface Tokens {
    access_token: string;
    vapidKey: string;
    expires_in: number;
}


export interface ResetPasswordModel {
    newPassword: string;
    confirmPassword: string;
}


export interface ExternalRegistrationModel {
    accessToken: string;
    email: string;
    firstName: string;
    lastName: string;
    provider: string;
    providerId: string;
}

export interface BadTokenRequest {
    error: string;
    error_description: string;
}

export interface BadRequest {
    message: string;
    modelState: {'': string[]};
}


export interface ChangePasswordModel {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}
