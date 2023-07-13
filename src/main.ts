import { MarkdownView, Menu, Notice, Plugin, setIcon } from "obsidian";
import {
	init,
	spellCheckText,
	getSuggestions,
	checkGrammar,
} from "./voikko-binds";
import { StateEffect } from "@codemirror/state";
import {
	IssueType,
	addUnderline,
	clearUnderlines,
} from "./underLineStateField";
import { buildUnderlineExtension } from "./underlineExtension";
import { EditorView } from "@codemirror/view";
import {
	DEFAULT_SETTINGS,
	FinnishSpellcheckSettings,
	FinnishSpellcheckSettingTab,
	SETTINGS_CONTENT,
} from "./settings";
import { log } from "console";

export default class FinnishSpellcheck extends Plugin {
	voikko: any;
	private isLoading = false;
	private statusBarText: HTMLElement;
	settings: FinnishSpellcheckSettings;

	async onload() {
		await this.loadSettings();
		this.app.workspace.onLayoutReady(() => {
			this.statusBarText = this.addStatusBarItem();
			this.setStatusBarReady();
			this.registerDomEvent(
				this.statusBarText,
				"click",
				this.handleStatusBarClick
			);
		});

		/* this.setStatusBarWorking(); */
		new Notice("Starting voikko!");

		init()
			.then((voikko) => {
				this.voikko = voikko;
				new Notice("Voikko started!");
				console.log("Voikko is ready!");
			})
			.catch((err) => {
				new Notice("Failed to start voikko!");
				console.error("Voikko failed: ", err);
			});

		this.registerEditorExtension(buildUnderlineExtension(this));
		this.registerCommands();
		this.addSettingTab(new FinnishSpellcheckSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private registerCommands() {
		this.addCommand({
			id: "spellcheck",
			name: "Spellcheck",
			editorCallback: (editor, view) => {
				if (!(view instanceof MarkdownView)) {
					new Notification("Cannot spellcheck this type of view!");
					return;
				}
				this.runDetection((editor as any).cm as EditorView, view);
			},
		});
	}

	private readonly handleStatusBarClick = () => {
		const statusBarRect =
			this.statusBarText.parentElement?.getBoundingClientRect();
		const statusBarIconRect = this.statusBarText.getBoundingClientRect();

		new Menu()
			.addItem((item) => {
				item.setTitle("Check current document");
				item.setIcon("checkbox-glyph");
				item.onClick(async () => {
					const activeLeaf = this.app.workspace.getMostRecentLeaf();
					if (
						activeLeaf?.view instanceof MarkdownView &&
						activeLeaf.view.getMode() === "source"
					) {
						try {
							await this.runDetection(
								(activeLeaf.view.editor as any).cm,
								activeLeaf.view
							);
						} catch (e) {
							console.error(e);
						}
					}
				});
			})
			.addItem((item) => {
				item.setTitle("Clear suggestions");
				item.setIcon("reset");
				item.onClick(() => {
					const view =
						this.app.workspace.getActiveViewOfType(MarkdownView);
					if (!view) return;

					const cm = (view.editor as any).cm as EditorView;
					cm.dispatch({
						effects: [clearUnderlines.of(null)],
					});
				});
			})
			.showAtPosition({
				x: statusBarIconRect.right + 5,
				y: (statusBarRect?.top || 0) - 5,
			});
	};

	runDetection(editor: EditorView, view: MarkdownView) {
		if (this.voikko === undefined) {
			new Notice(
				"Voikko has failed to start. Try disabling and reenabling it from the community plugins page."
			);
		}

		this.setStatusBarWorking();
		const text = view.data;
		const words = spellCheckText(this.voikko, text).filter(
			(w) => !w.isCorrect
		);
		const effects: StateEffect<any>[] = [];
		effects.push(clearUnderlines.of(null));
		console.log("Found the following words to be incorrect: ", words);

		for (const word of words) {
			if (!this.settings.invalidSpelling) break;
			const suggestions = getSuggestions(this.voikko, word);

			effects.push(
				addUnderline.of({
					from: word.startIndex,
					to: word.endIndex,
					match: {
						message: "The word is misspelled.",
						type: IssueType.Spell,
						replacements: suggestions,
					},
				})
			);
		}

		const grammarErrors = checkGrammar(this.voikko, text);
		console.log("Found the following grammatical errors: ", grammarErrors);

		for (const grammarError of grammarErrors) {
			const id = SETTINGS_CONTENT[grammarError.errorCode - 1].id;
			// @ts-expect-error
			const allowed: boolean = this.settings[id];

			if (!allowed) continue;

			const start = grammarError.startPos;
			const end = grammarError.startPos + grammarError.errorLen;
			effects.push(
				addUnderline.of({
					from: start,
					to: end,
					match: {
						message: grammarError.shortDescription,
						type: IssueType.Grammar,
					},
				})
			);
		}

		if (effects.length) {
			editor.dispatch({
				effects,
			});
		}

		this.setStatusBarReady();
	}

	public setStatusBarReady() {
		this.isLoading = false;
		this.statusBarText.empty();
		this.statusBarText.createSpan({ cls: "fis-status-bar-btn" }, (span) => {
			span.createSpan({
				cls: "fis-status-bar-check-icon",
				text: "Aa",
			});
		});
	}

	public setStatusBarWorking() {
		if (this.isLoading) return;

		this.isLoading = true;
		this.statusBarText.empty();
		this.statusBarText.createSpan(
			{ cls: ["fis-status-bar-btn", "fis-loading"] },
			(span) => {
				setIcon(span, "sync-small");
			}
		);
	}

	onunload() {}
}
