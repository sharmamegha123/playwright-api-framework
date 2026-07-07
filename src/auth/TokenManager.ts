export class TokenManager {

    private token?: string;
    private expiry?: number;
    private tokenPromise?: Promise<string>;

    async getToken(): Promise<string> {
        if (
            this.token &&
            this.expiry &&
            Date.now() < this.expiry
        ) {
            return this.token;
        }
        if (!this.tokenPromise) {
            this.tokenPromise = this.fetchToken();
        }
        return await this.tokenPromise;
    }
    private async fetchToken(): Promise<string> {
        // Call OAuth server here
        this.token = "dummy-token";
        this.expiry = Date.now() + (15 * 60 * 1000);
        this.tokenPromise = undefined;
        return this.token;
    }
}