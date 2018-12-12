# rollup-plugin-exclude-paths

Let you use paths in exclude.

## Setup
In your rollup config
```ecmascript 6
import excludePaths from 'rollup-plugin-exclude-paths';


export default {
    entry: './app.js',
    format: 'cjs',
    dest: 'public/app.min.js',
    plugins: [ excludePaths({
      dir: './src', // exclude all the ./src path
    }) ],
};
```

## Options

### dir `'' | ['']`
An array of paths that the plugin should exclude from resolution.

Example: `['./src/no-chunk1', 'src/no-chunk2']`
