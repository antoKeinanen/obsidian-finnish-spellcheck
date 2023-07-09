import { tooltips } from "@codemirror/view";
import FinnishSpellcheck from "./main";
/* import { buildAutoCheckHandler } from './buildAutoCheckHandler'; */
import { buildTooltipField } from "./tooltipField";
import { ignoredUnderlineField, underlineField } from "./underLineStateField";

export function buildUnderlineExtension(plugin: FinnishSpellcheck) {
	return [
		tooltips({
			position: "absolute",
			tooltipSpace: (view) => {
				const rect = view.dom.getBoundingClientRect();

				return {
					top: rect.top,
					left: rect.left,
					bottom: rect.bottom,
					right: rect.right,
				};
			},
		}),
		// ignoredUnderlineField must come before underlineField
		ignoredUnderlineField,
		underlineField,
		buildTooltipField(plugin),
		/* 		buildAutoCheckHandler(plugin),  */
	];
}
