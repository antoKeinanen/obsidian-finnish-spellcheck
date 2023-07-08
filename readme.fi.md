# Finnish Spellcheck for Obsidian

The instructions have also been translated into English. You can read them [here](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/blob/main/README.md).

Finnish Spellcheck for Obsidian on lisäosa [obsidian](obsidian.md) sovellukselle, joka integroi kehittyneen oikeinkirjoituksen tarkistuksen ja kieliopillisen analyysin Obsidian-editoriin. Se hyödyntää Voikkoa, suomen kielen työkalua, joka sisältää morfologisen analyysin, oikeinkirjoituksen, kieliopin tarkistuksen, yhdyssanatarkistuksen ja muita kielitieteellisiä tietoja.

## Asennus
**Huomaa: Tällä hetkellä tätä lisäosaa ei voi asentaa suoraan Obsidianin lisäosien markkinapaikalta.**

### Manuaalinen asennus
1. Lataa uusimmat `main.js`-, `styles.css`- ja `manifest.json`-tiedostot [releases-sivulta](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/releases).
2. Kopioi nämä tiedostot Obsidian-holvisi seuraavaan hakemistoon: `{holvipolku}/.obsidian/plugins/finnish-spellcheck/`.
3. Joissakin tapauksissa sinun on ehkä ladattava libvoikko. Ohjeet libvoikon lataamiseen löytyvät täältä: [Windows](https://www.puimula.org/htp/testing/voikko-sdk/win-crossbuild/), [Apple](https://formulae.brew.sh/formula/libvoikko), ja Linuxin osalta useimmissa pakettivarastoissa pitäisi olla libvoikko saatavilla.

## Käyttö
Kun tämä lisäosa on asennettu, se lisää komentopaneeliin merkinnän nimeltä "Spellcheck", johon pääsee painamalla `Ctrl+P`. Lisäksi voit suorittaa oikeinkirjoituksen tarkistuksen napsauttamalla "Aa"-painiketta oikeassa alakulmassa.

## Avustaminen
Tämän lisäosan lisäykset ovat tervetulleita ja toivittuja. Huolehdithan kuitenkin siitä, että kaikki lisäyksesi noudattavat koodipohjan tapoja, käyttävät Angular-tyyliä commit-viestejä ja muotoile lopuksi koodi `npm run format`:lla.

## Kääntäminen lähteestä
Voit kääntää laajennuksen lähdekoodista noudattamalla seuraavia ohjeita:

1. Kloonaa ja käännä `libvoikko-js` osoitteesta [https://github.com/niilo/libvoikko-js](https://github.com/niilo/libvoikko-js) käyttäen annettua Dockerfile-tiedostoa.
2. Siirrä `libvoikko-morpho.js` ja `libvoikko-morpho.d.ts` tämän arkiston `src/voikko`-osioon.
3. Käännä käyttäen komentoa: `npm run build`.

## Lisenssi 
Tämä arkisto on GNU Affero General Public License v3.0:n alainen. Lue lisätietoja [license](https://github.com/antoKeinanen/obsidian-finnish-spellcheck/blob/main/LICENSE) -tiedostosta.

## Kiitokset
Tämä lisäosa riippuu vahvasti seuraavista avoimen lähdekoodin projekteista ja haluan kiittää niiden kirjoittajia ja ylläpitäjiä:
- [Obsidian LanguageTool Plugin](https://github.com/Clemens-E/obsidian-languagetool-plugin) by Clemens-E (lisensoitu AGPL-3.0:n alle).
- [libvoikko](https://github.com/voikko/corevoikko/tree/master/libvoikko) (verkkosivusto: [https://voikko.puimula.org](https://voikko.puimula.org)) (lisensoitu GPL-3.0:n alle).
- [libvoikko-js](https://github.com/niilo/libvoikko-js) Niilo Ursin (lisensoitu GPL-3.0:n alle).