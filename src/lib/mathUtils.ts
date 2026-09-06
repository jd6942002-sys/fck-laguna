/**
 * Utility to format and strip LaTeX formulas and raw fractions (e.g., \frac{4}{6} or similar)
 * into beautiful, accessible, human-readable math expressions or text.
 */
export function formatMathText(text: string): string {
  if (!text) return "";
  let processed = text;

  // 1. Clean up LaTeX formatting and replace \text{...} with just text inside
  processed = processed.replace(/\\text\{([^}]+)\}/g, "$1");

  // 2. Recursively replace \frac{A}{B} with A/B or similar fraction representation
  // We can use a loop to handle nested/multiple \frac matches on a single line
  const fracRegex = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
  while (fracRegex.test(processed)) {
    processed = processed.replace(fracRegex, "$1/$2");
  }

  // 3. Strip block math $$ delimiters
  processed = processed.replace(/\$\$/g, "");

  // 4. Strip inline math $ delimiters
  processed = processed.replace(/\$/g, "");

  // 5. Clean residual backslashes
  processed = processed.replace(/\\/g, "");

  // 6. Clean and strip all markdown bold star asterisks (***, **, *) to make text extremely comfortable for kids
  processed = processed.replace(/\*\*\*/g, "");
  processed = processed.replace(/\*\*/g, "");
  processed = processed.replace(/\*/g, "");

  return processed;
}
