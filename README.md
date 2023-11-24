# Finnish Spellcheck for Obsidian

Ohjeet ovat myös käännetty suomenkielelle. Voit lukea ne [täältä](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/blob/main/readme.fi.md).

**Sadly we currently only support the computer version of obsidian.**


![Picture of text with red and blue underlines indicating mistakes.](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/blob/main/media/demo.png?raw=true)

The Finnish Spellcheck for Obsidian is a plugin for [obsidian](https://obsidian.md) that integrates advanced spellchecking and grammatical analysis into your Obsidian editor. It utilizes Voikko, a tool for Finnish language that includes morphological analysis, spelling, grammar checking, hyphenation, and other linguistic data.

## Installation
The plugin can be installed from the obsidian community plugins page.

### Manual Installation
1. Download the latest `main.js`, `styles.css`, and `manifest.json` files from the [releases page](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/releases).
2. Copy these files to the following directory in your Obsidian vault: `{vault path}/.obsidian/plugins/finnish-spellcheck/`.
3. In some cases, you may need to download libvoikko. Instructions for downloading libvoikko can be found here: [Windows](https://www.puimula.org/htp/testing/voikko-sdk/win-crossbuild/), [Apple](https://formulae.brew.sh/formula/libvoikko), and for Linux, most package repositories should have libvoikko available.

## Usage
Once installed, this plugin adds a command panel entry called "Spellcheck" that can be accessed by pressing `Ctrl+P`. Additionally, you can run the spellcheck by clicking the "Aa" button in the bottom right corner.

## Contributing
Contributions to this plugin are welcome and appreciated. Please ensure that any contributions follow the codebase's conventions, use the Angular style for commit messages and format the code with `npm run format`.

## Building from Source
To build the plugin from source, follow these steps:

1. Clone and build `libvoikko-js` from [https://github.com/niilo/libvoikko-js](https://github.com/niilo/libvoikko-js) using the provided Dockerfile.
2. Move `libvoikko-morpho.js` and `libvoikko-morpho.d.ts` to `src/voikko` in this repository.
3. Build with: `npm run build`.

## License 
This repository is under the GNU Affero General Public License v3.0. For more information please read the [license](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/blob/main/LICENSE) file.

## Acknowledgements
This plugin heavily relies on the following open-source projects and I would like to thank their authors and maintainers:
- [Obsidian LanguageTool Plugin](https://github.com/Clemens-E/obsidian-languagetool-plugin) by Clemens-E (licensed under AGPL-3.0)
- [libvoikko](https://github.com/voikko/corevoikko/tree/master/libvoikko) (website: [https://voikko.puimula.org](https://voikko.puimula.org)) (licensed under GPL-3.0)
- [libvoikko-js](https://github.com/niilo/libvoikko-js) by Niilo Ursin (licensed under GPL-3.0)
