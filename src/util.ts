import { IssueType } from "./underLineStateField";

export interface Word {
	substring: string;
	startIndex: number;
	endIndex: number;
	isCorrect: boolean | undefined;
}

export function splitAndCleanString(input: string): Word[] {
	const result: Word[] = [];
	let startIndex = 0;
	let endIndex = 0;
	let isInsideDollarSigns = false;
	let previous = "";

	for (let i = 0; i < input.length; i++) {
		const char = input[i];

		if (char === "$" && previous !== "\\") {
			isInsideDollarSigns = !isInsideDollarSigns;
			continue;
		}

		if (!isInsideDollarSigns && /[a-zA-ZåÅäÄöÖ\-]/.test(char)) {
			if (startIndex === endIndex) {
				startIndex = i;
			}
			endIndex = i + 1;
		} else {
			if (startIndex !== endIndex) {
				const substring = input.substring(startIndex, endIndex);
				if (substring !== "-")
					result.push({
						substring,
						startIndex,
						endIndex,
						isCorrect: undefined,
					});
			}
			startIndex = i + 1;
			endIndex = i + 1;
		}

		previous = char;
	}

	if (startIndex !== endIndex) {
		const substring = input.substring(startIndex, endIndex);
		result.push({ substring, startIndex, endIndex, isCorrect: undefined });
	}

	return result;
}

export function getIssueTypeClassName(issueType: IssueType) {
	switch (issueType) {
		case IssueType.Spell:
			return "fis-major";
		case IssueType.Grammar:
			return "fis-style";
		default:
			return "fis-minor";
	}
}

export const ignoreListRegEx =
	/frontmatter|code|math|templater|blockid|hashtag|internal/;
