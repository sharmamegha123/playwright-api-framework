export class Polling {
    static async waitUntil<T>(
        operation: () => Promise<T>,
        condition: (result: T) => boolean
    ) {
        while (true) {
            const result = await operation();

            if (condition(result)) {
                return result;
            }
            await Polling.sleep(2000);
        }
    }

    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}

