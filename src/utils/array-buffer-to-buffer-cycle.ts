
export default function arrayBufferToBufferCycle(arrayBuffer: ArrayBuffer) {
    const buffer = new Buffer(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}