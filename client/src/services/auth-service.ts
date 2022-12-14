import jwtDecode from 'jwt-decode';
import { HttpError, httpService } from './http-service';
import { UserStorage } from './user-storage-service';
import { User } from 'shared';

interface LoginResponse {
    token: string;
}

export class InvalidCredentialsError extends Error {}

type AuthHandler = (user: User | undefined) => void;

class AuthService {
    private handler: AuthHandler | undefined = undefined;
    private userStorage = new UserStorage();

    constructor() {
        httpService.authErrorHandler = () => this.setToken(undefined);
    }

    private setToken(token: string | undefined) {
        if (!token) {
            this.userStorage.token = undefined;
            this.handler?.(undefined);
            return;
        }

        this.userStorage.token = token;

        const user = jwtDecode<User>(token);
        this.handler?.(user);
    }

    get currentUser() {
        const token = this.userStorage.token;

        if (!token) {
            return undefined;
        }

        return jwtDecode<User>(token);
    }

    setHandler(handler: AuthHandler | undefined) {
        this.handler = handler;
    }

    async login(credential: string) {
        try {
            const loginResponse = await httpService.post<LoginResponse>(
                'login',
                {
                    body: { credential },
                },
            );

            this.setToken(loginResponse.token);
        } catch (error) {
            if (error instanceof HttpError && error.status === 401) {
                throw new InvalidCredentialsError();
            }

            throw error;
        }
    }

    logout() {
        this.setToken(undefined);
    }
}

export const authService = new AuthService();
