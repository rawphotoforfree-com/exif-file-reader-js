import {EXIF} from 'exif-js/exif'
import {ExifFileReader, supportedMimeTypes} from '../src/exifFileReader'
import {UnSupportedFileError} from "../src/UnSupportedFileError";

const createExifReader = (exif) => new ExifFileReader(exif)
const createExifStub = returnValue => ({readFromBinaryFile: () => returnValue})
const createJpgFile = () => new File([{}], 'test.jpg', {type: 'image/jpg'})

describe('EXIF reader wrapper', () => {
    it('should thrown TypeError with wrong constructor type', async function () {
        expect.assertions(1)
        const exifReader = createExifReader(EXIF)
        await expect(exifReader.getExifData('file')).rejects.toThrow(TypeError)
    });

    it('should thrown UnSupportedFileError for unsupported MIME types', async function () {
        expect.assertions(3)
        const exifReader = createExifReader(EXIF);
        const unSupportedMimeTypes = ['text/plain', 'audio/mpeg', 'image/gif']

        for (let mimeType of unSupportedMimeTypes) {
            await expect(
                exifReader.getExifData(new File([''], 'test.jpg', {type: mimeType}))
            ).rejects.toThrow(UnSupportedFileError)
        }
    });

    it('should allow load supported MIME types', async function () {
        expect.assertions(2)
        for (let mimeType of supportedMimeTypes) {
            const exifStub = createExifStub(new File([{}], 'test.jpg', {type: mimeType}))
            const exifReader = createExifReader(exifStub)

            await expect(exifReader.getExifData(createJpgFile()))
                .resolves
                .toBeNull()
        }
    })

    it('should return null if the exif data will be empty', async function () {
        expect.assertions(2);
        const stubValues = [null, {}];

        for (let stubValue of stubValues) {
            const exifStub = createExifStub(stubValue)
            const exifReader = createExifReader(exifStub)

            await expect(exifReader.getExifData(createJpgFile())).resolves.toBeNull()
        }
    });

    it('should return an error when the exif reader returns false', async function () {
        expect.assertions(1)

        const exifStub = createExifStub(false)
        const exifReader = createExifReader(exifStub)

        await expect(exifReader.getExifData(createJpgFile())).rejects.toThrow(Error)
    });
})