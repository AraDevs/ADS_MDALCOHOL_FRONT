import { LoadFile } from '@shared/types';

export const LoadI18nFile = (loadFunction: LoadFile) => {
  const loader = ['es'].reduce((acc, lang) => {
    acc[lang] = loadFunction(lang);
    return acc;
  }, {});
  return loader;
};
