export function isValidSha256(digest: string){
    const sha256Regex = /^[a-fA-F0-9]{64}$/
    return sha256Regex.test(digest);
}