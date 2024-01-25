export const log = (message?: any, ...optionalParams: any[]) => {
    if (import.meta.env.DEV) {
        console.log(message, ...optionalParams)
    }
}