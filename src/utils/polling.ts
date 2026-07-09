import { PollingOptions } from "./PollingOptions";

export class Polling implements PollingOptions {
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async waitUntil<T extends { status: number | (() => number | Promise<number>) }>(
    operation: () => Promise<T>,

    isComplete: (result: T) => boolean,

    options: PollingOptions = {},
  ): Promise<T> {
    const timeout = options.timeout ?? 30000;
    const interval = options.interval ?? 2000;
    const retryOnStatus = options.retryOnStatus ?? [];

    const start = Date.now();

    while (Date.now() - start < timeout) {
      const result = await operation();
      const status = typeof result.status === "function"
        ? await result.status()
        : result.status;

      // Retry for configured status codes
      if (retryOnStatus.includes(status)) {
        console.log(`Retrying because status is ${status}`);

        await this.sleep(interval);

        continue;
      }
      if (status >= 400) {
        throw new Error(`Polling failed. Received status ${status}`);
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
