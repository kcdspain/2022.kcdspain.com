const {readFileSync, writeFileSync} = require('fs');
const {sync: glob} = require('glob');
const {Logger, LogLevel, colorEmojiConfig} = require('plop-logger');

Logger.config = colorEmojiConfig;
const logger = Logger.getLogger('icons');
logger.level = LogLevel.All;

let svgFilesTheme = `themes/devfest-theme-hugo/src/icons/*.svg`;
logger.info('SVG aggregation of', svgFilesTheme);

const dataTheme = glob(svgFilesTheme)
  .map(file => {
      const parts = file.split('/');
      const id = parts[parts.length - 1].split('.')[0];
      logger.debug('handle', id);
      return readFileSync(file, 'utf8')
        .replace(`<svg xmlns="http://www.w3.org/2000/svg"`, `\t<symbol id="${id}"`)
        .replace(`</svg>`, `\t</symbol>`);
    }
  );

let svgFilesLocal = `src/icons/*.svg`;
logger.info('SVG aggregation of', svgFilesLocal);

const dataLocal = glob(svgFilesLocal)
  .map(file => {
      const parts = file.split('/');
      const id = parts[parts.length - 1].split('.')[0];
      logger.debug('handle', id);
      return readFileSync(file, 'utf8')
        .replace(`<svg xmlns="http://www.w3.org/2000/svg"`, `\t<symbol id="${id}"`)
        .replace(`</svg>`, `\t</symbol>`);
    }
  );

const svg = 
`<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" class="visually-hidden">
  ${dataTheme.join('\n')}
  ${dataLocal.join('\n')}
</svg>`;

const file = 'static/icons.svg';
logger.info('Generate', file);
writeFileSync(file, svg, {flag: 'w'});
