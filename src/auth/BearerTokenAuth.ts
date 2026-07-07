import {AuthenticationProvider} from './AuthenticationProvider';
import {TokenManager} from './tokenManager'

export class BearerTokenAuth implements AuthenticationProvider {


    constructor(private tokenManager
        : TokenManager) {}
    async getHeaders() {
        const token = await this.tokenManager.getToken();
        return {"Authorization": `Bearer ${token}`};
    }
}