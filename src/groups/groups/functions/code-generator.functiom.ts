export function GenerateCode():string {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
    const randomString = Math.random().toString(36).slice(2, 2 +(20 - timestamp.length)); // Generate random string of appropriate length
    return timestamp + randomString;
}