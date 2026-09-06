/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

/**
 * Splits an English word into its constituent syllables using basic rule-based heuristics.
 */
export function splitIntoSyllables(word: string): string[] {
  // Extract word pure characters for mapping
  const clean = word.replace(/[^a-zA-Z']/g, "");
  if (clean.length <= 3) return [word];

  // Regex rules to split by voice vowel grouping bounds
  const matches = clean.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy](?![aeiouy]))*/gi);
  if (!matches || matches.length <= 1) return [word];

  // If the last syllable is "e" and it is preceded by a consonant, it's typically a silent 'e'.
  // Merge it with the previous syllable.
  let res = [...matches];
  if (res.length > 1 && res[res.length - 1].toLowerCase() === "e") {
    const last = res.pop()!;
    res[res.length - 1] += last;
  }

  // Preserve any leading/trailing punctuations
  const prefix = word.match(/^[^a-zA-Z]+/)?.[0] || "";
  const suffix = word.match(/[^a-zA-Z]+$/)?.[0] || "";
  
  if (res.length > 0) {
    res[0] = prefix + res[0];
    res[res.length - 1] = res[res.length - 1] + suffix;
  } else {
    return [word];
  }

  return res;
}

/**
 * Processes text into reactive color-coded syllable word elements.
 */
export const renderDyslexicText = (text: string): React.ReactNode => {
  if (!text) return "";

  // Split spaces and preserve
  const tokens = text.split(/(\s+)/);
  return tokens.map((token, idx) => {
    if (/^\s+$/.test(token)) {
      return <span key={idx}>{token}</span>;
    }

    const syllables = splitIntoSyllables(token);
    return (
      <span key={idx} className="inline-block mr-1">
        {syllables.map((syl, sIdx) => {
          // Soft color-palette that contrasts high in both light and dark backgrounds
          const colors = [
            "text-rose-600 dark:text-rose-400",
            "text-blue-600 dark:text-blue-400",
            "text-emerald-600 dark:text-emerald-400",
            "text-amber-600 dark:text-amber-400",
            "text-violet-600 dark:text-violet-400",
            "text-cyan-600 dark:text-cyan-400",
          ];
          const color = colors[sIdx % colors.length];
          return (
            <span key={sIdx} className={color}>
              {syl}
            </span>
          );
        })}
      </span>
    );
  });
};
