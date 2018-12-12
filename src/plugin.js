import path from 'path';

/*
* externalPaths return a rollup plugin instance for exclude paths from rollup resolve
* Options
* - dir a string or an array of paths, the plugin should exclude form rollup resolve
* */
export default ({
  dir,
}) => {
  const flatter = () => (acc, a) => [...acc, ...(Array.isArray(a) ? a : [a])];
  const paths = [dir].reduce(flatter(), []).map(d => path.resolve(__dirname, d));
  return ({
    options: (options) => {
      const { input: inputOri, external } = options;
      const input = [inputOri].reduce(flatter(), []).map(f => path.resolve(__dirname, f));
      return {
        ...options,
        external: (id, ...args) => {
          const inFiles = paths.some(p => id.startsWith(p)) && !input.includes(id);
          if (inFiles) return inFiles;
          if (typeof external === 'function') {
            return inFiles || external(id, ...args);
          }
          if (Array.isArray(external)) {
            return external.includes(id);
          }
          return null;
        },
      };
    },
  });
};
