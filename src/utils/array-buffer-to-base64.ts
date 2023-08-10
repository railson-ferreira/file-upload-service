const btoa = (text: string) => Buffer.from(text, 'binary').toString('base64');
// const atob = (base64) => Buffer.from(base64, 'base64').toString('binary');
export default function arrayBufferToBase64( arrayBuffer: ArrayBuffer ) {
    let binary = '';
    const bytes = new Uint8Array( arrayBuffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}