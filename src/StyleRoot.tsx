import type { ReactNode } from 'react';
import { StyleSheetManager } from 'styled-components';

// In production styled-components injects rules through the CSSOM
// (style.sheet.insertRule). When something else alters <head> (browser
// translators, extensions, in-app browsers), the <style> tag has no
// CSSStyleSheet and the first render throws styled-components error #17,
// which takes the whole page down to the ErrorBoundary fallback.
// Writing rules as plain text into the tag does not depend on .sheet,
// and the cost is negligible for a page this size.
export default function StyleRoot({ children }: { children: ReactNode }) {
  return <StyleSheetManager disableCSSOMInjection>{children}</StyleSheetManager>;
}
