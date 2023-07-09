import { App, PluginSettingTab, Setting } from "obsidian";
import FinnishSpellcheck from "./main";

export interface FinnishSpellcheckSettings {
	extraWhitespace: boolean;
	spaceBeforePunctuation: boolean;
	invalidCharactersBeforeSentenceStart: boolean;
	invalidSpelling: boolean;
	extraComma: boolean;
	writeFirstLowercase: boolean;
	writeFirstUppercase: boolean;
	repeatingWord: boolean;
	missingTerminatingPunctuation: boolean;
	invalidPunctuationAtEndOfQuotation: boolean;
	foreignQuotationMark: boolean;
	misplacedClosingParenthesis: boolean;
	negativeVerbMismatch: boolean;
	aInfinitiveRequired: boolean;
	maInfinitiveRequired: boolean;
	misplacedSidesana: boolean;
	missingMainVerb: boolean;
	extraMainVerb: boolean;
}

export const DEFAULT_SETTINGS: FinnishSpellcheckSettings = {
	extraWhitespace: true,
	spaceBeforePunctuation: true,
	invalidCharactersBeforeSentenceStart: false,
	invalidSpelling: true,
	extraComma: true,
	writeFirstLowercase: true,
	writeFirstUppercase: false,
	repeatingWord: true,
	missingTerminatingPunctuation: false,
	invalidPunctuationAtEndOfQuotation: true,
	foreignQuotationMark: true,
	misplacedClosingParenthesis: true,
	negativeVerbMismatch: true,
	aInfinitiveRequired: true,
	maInfinitiveRequired: true,
	misplacedSidesana: true,
	missingMainVerb: true,
	extraMainVerb: true,
};

export const SETTINGS_CONTENT: {
	title: string;
	description: string;
	id: string;
	code: number;
}[] = [
	{
		code: 1,
		title: "Incorrect spelling of word(s)",
		description: "Warn about incorrect spelling of word(s).",
		id: "invalidSpelling",
	},
	{
		code: 2,
		title: "Extra space",
		description: "Warn about extra space between words.",
		id: "extraWhitespace",
	},
	{
		code: 3,
		title: "Space before punctuation",
		description: "Warn about space before punctuation marks.",
		id: "spaceBeforePunctuation",
	},
	{
		code: 4,
		title: "Remove extra comma",
		description: "Warn about unnecessary or extra commas.",
		id: "extraComma",
	},
	{
		code: 5,
		title: "Invalid characters before sentence start",
		description:
			"Warn about invalid characters at the beginning of a sentence.",
		id: "invalidSentenceStarter",
	},
	{
		code: 6,
		title: "Consider changing first letter to lower case",
		description:
			"Warn about the need to change the first letter of a sentence to lower case.",
		id: "writeFirstLowercase",
	},
	{
		code: 7,
		title: "Change first letter to upper case",
		description:
			"Warn about the need to change the first letter of a sentence to upper case.",
		id: "writeFirstUppercase",
	},
	{
		code: 8,
		title: "Remove duplicate word",
		description: "Warn about duplicate words and suggest removal.",
		id: "repeatingWord",
	},
	{
		code: 9,
		title: "Terminating punctuation is missing",
		description:
			"Warn about the absence of terminating punctuation at the end of a sentence.",
		id: "missingTerminatingPunctuation",
	},
	{
		code: 10,
		title: "Invalid punctuation at the end of quotation",
		description:
			"Warn about invalid punctuation at the end of a quotation and suggest correction.",
		id: "invalidPunctuationAtEndOfQuotation",
	},
	{
		code: 11,
		title: "Foreign quotation mark",
		description:
			"Warn about the use of a foreign quotation mark and suggest correction.",
		id: "foreignQuotationMark",
	},
	{
		code: 12,
		title: "Misplaced closing parenthesis",
		description:
			"Warn about misplaced closing parenthesis and suggest correction.",
		id: "misplacedClosingParenthesis",
	},
	{
		code: 13,
		title: "Mismatched negative and verb",
		description:
			"Warn about mismatched negative and verb and suggest correction.",
		id: "negativeVerbMismatch",
	},
	{
		code: 14,
		title: "You should use infinitive ending with a/ä as the second verb",
		description:
			"Warn about the need to use infinitive ending with 'a/ä' as the second verb.",
		id: "aInfinitiveRequired",
	},
	{
		code: 15,
		title: "You should use infinitive ending with maan/mään as the second verb",
		description:
			"Warn about the need to use infinitive ending with 'maan/mään' as the second verb.",
		id: "maInfinitiveRequired",
	},
	{
		code: 16,
		title: "Sentence should not end with a conjunction",
		description: "Warn about the sentence ending with a conjunction.",
		id: "misplacedSidesana",
	},
	{
		code: 17,
		title: "Sentence should contain one or more main verbs",
		description:
			"Warn about the absence of one or more main verbs in a sentence.",
		id: "missingMainVerb",
	},
	{
		code: 18,
		title: "Check if sentence contains unnecessary verbs or if a comma is missing",
		description:
			"Warn about the presence of unnecessary verbs or missing commas in a sentence.",
		id: "extraMainVerb",
	},
];

export class FinnishSpellcheckSettingTab extends PluginSettingTab {
	plugin: FinnishSpellcheck;

	constructor(app: App, plugin: FinnishSpellcheck) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", {
			text: "What should be classified as an error.",
		});

		for (const settingContent of SETTINGS_CONTENT) {
			const { description, id, title } = settingContent;
			new Setting(containerEl)
				.setName(title)
				.setDesc(description)
				.addToggle((state) =>
					state
						// @ts-expect-error
						.setValue(this.plugin.settings[id])
						.onChange(async (value) => {
							// @ts-expect-error
							this.plugin.settings[id] = value;
							await this.plugin.saveSettings();
						})
				);
		}
	}
}
