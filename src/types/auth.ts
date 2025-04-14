export type UserType = 'seeker' | 'business';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    acess_token: string;
    refresh_token: string;
    user_id: number;
    user_type: UserType;
    name: string;
}
    
