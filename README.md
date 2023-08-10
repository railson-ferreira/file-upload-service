# File Upload Service

A simple file upload service for development purposes.

## Uploading

It's possible to upload files through the browser, accessing `/` path. You can also use the `/api/file` to POST your files directly.

## ID Strategy

The SHA256 digest is used as the file id, in that way, it's possible to reset the database and re-upload the files, keeping the same id. There won't be any broken link!