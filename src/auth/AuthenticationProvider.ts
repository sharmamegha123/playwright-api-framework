export interface AuthenticationProvider {


    getHeaders(): Promise<Record<string, string>>;
}