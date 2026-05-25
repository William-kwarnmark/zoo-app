export function hrsPassed(
    lastFed: string,
    hours: number
): boolean {
    const lastFedTime = new Date(lastFed).getTime();
    const currentTime = new Date().getTime();

    const hrsInMilliSec = hours * 60 * 60 * 1000;

    return currentTime - lastFedTime > hrsInMilliSec;
}

