import { PollingOptions } from "./PollingOptions";

export class Polling implements PollingOptions {
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async waitUntil<T>(
    operation: () => Promise<ApiResult<T>>,

    isComplete: (result: ApiResult<T>) => boolean,

    options: PollingOptions = {},
  ): Promise<ApiResult<T>> {
    const timeout = options.timeout ?? 30000;
    const interval = options.interval ?? 2000;
    const retryOnStatus = options.retryOnStatus ?? [];

    const start = Date.now();

    while (Date.now() - start < timeout) {
      const result = await operation();

      // Retry for configured status codes
      if (retryOnStatus.includes(result.status)) {
        console.log(`Retrying because status is ${result.status}`);

        await this.sleep(interval);

        continue;
      }
      if (result.status >= 400) {
        throw new Error(`Polling failed. Received status ${result.status}`);
      }

      // Success
      if (isComplete(result)) {
        return result;
      }

      await this.sleep(interval);
    }

    throw new Error(`Polling timed out after ${timeout} ms`);
  }
}
