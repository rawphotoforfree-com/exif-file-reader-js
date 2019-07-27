'use strict';

import {UnSupportedFileError} from "./UnSupportedFileError";

export const supportedMimeTypes = ['image/jpg', 'image/jpeg'];

/**
 * @param {{EXIF}} exifReader
 * @param {{FileReader}} FileReader
 * @returns {{getExifData: (function(): Promise<any>)}}
 */
export function ExifFileReader(exifReader, FileReader = window.FileReader) {

    /**
     * @param {{File}} file
     * @returns {Promise<any>}
     */
    function getExifData(file) {
        return new Promise((resolve, reject) => {

            if (file instanceof File === false) {
                reject(new TypeError('The file must be instance of File object!'))
            }

            if (supportedMimeTypes.indexOf(file.type) === -1) {
                reject(new UnSupportedFileError(`The file type "${file.type}" is not supported.`));
            }

            const fileReader = new FileReader();

            fileReader.onload = () => {
                try {
                    const exifData = readExif(fileReader.result)
                    resolve(exifData)
                } catch (e) {
                    reject(new Error('Cannot read EXIF data properly for this file.'))
                }
            }

            fileReader.readAsArrayBuffer(file)
        })
    }

    /**
     * @param {{ArrayBuffer}} arrayBuffer
     * @returns {null|Object}
     */
    function readExif(arrayBuffer) {
        const exifData = exifReader.readFromBinaryFile(arrayBuffer)

        if (exifData === false) {
            throw new Error('Read EXIF data failed');
        }

        if (isExifEmpty(exifData)) {
            return null
        }

        return exifData
    }

    /**
     * @param exifData
     * @returns {boolean}
     */
    function isExifEmpty(exifData) {
        return exifData === null || typeof exifData === 'object' && Object.keys(exifData).length === 0
    }

    return {getExifData}
}