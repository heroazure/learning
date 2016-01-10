// Create the mock file:
var mockFile = {
    name: "fileName"
    //size: 12345
};

// Call the default addedfile event handler
myDropzone.emit("addedfile", mockFile);
$(mockFile.previewElement).insertBefore($("#file-add"));
// And optionally show the thumbnail of the file:
myDropzone.emit("thumbnail", mockFile, "http://waboon-10011254.image.myqcloud.com/waboon1450354334");
// Or if the file on your server is not yet in the right
// size, you can let Dropzone download and resize it
// callback and crossOrigin are optional.
//myDropzone.createThumbnailFromUrl(file, imageUrl, callback, crossOrigin);

// Make sure that there is no progress bar, etc...
myDropzone.emit("complete", mockFile);

// If you use the maxFiles option, make sure you adjust it to the
// correct amount:
var existingFileCount = 1; // The number of files already uploaded
myDropzone.options.maxFiles = myDropzone.options.maxFiles - existingFileCount;