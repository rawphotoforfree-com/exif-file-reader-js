import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: 'src/exifFileReader.js',
    output: {
        file: 'dist/exif-file-reader-js.js',
        format: 'umd',
        name: 'exifFileReader'
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        })
    ]
}