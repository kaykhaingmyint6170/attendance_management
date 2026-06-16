#!/bin/bash
# Apply a color theme to the app.
# Usage: ./tools/apply-theme.sh <color-name>
# Examples: ./tools/apply-theme.sh indigo  → #6366F1
#           ./tools/apply-theme.sh violet  → #8B5CF6
#           ./tools/apply-theme.sh emerald → #059669
#           ./tools/apply-theme.sh sky     → #0284C7
#           ./tools/apply-theme.sh rose    → #E11D48
#           ./tools/apply-theme.sh amber   → #D97706
#           ./tools/apply-theme.sh cyan    → #0891B2

THEME_NAME="${1:-indigo}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CSS_FILE="$PROJECT_DIR/resources/css/app.css"

case "$THEME_NAME" in
  indigo)   P="#6366F1"; P2="#4F46E5" ;;
  violet)   P="#8B5CF6"; P2="#7C3AED" ;;
  emerald)  P="#059669"; P2="#047857" ;;
  sky)      P="#0284C7"; P2="#0369A1" ;;
  rose)     P="#E11D48"; P2="#BE123C" ;;
  amber)    P="#D97706"; P2="#B45309" ;;
  cyan)     P="#0891B2"; P2="#0E7490" ;;
  default)  P="#2563EB"; P2="#1D4ED8" ;;
  *)
    echo "Unknown theme: $THEME_NAME"
    echo "Available: indigo, violet, emerald, sky, rose, amber, cyan, default"
    exit 1
    ;;
esac

echo "🎨 Applying $THEME_NAME theme ($P / $P2)..."

# Update app.css with theme tokens
if grep -q '@theme' "$CSS_FILE"; then
  # Replace existing @theme block
  sed -i '' '/@theme {/,/^}/c\
@theme {\
  --color-primary: '"$P"';\
  --color-primary-dark: '"$P2"';\
  --color-primary-100: '"${P}"'20;\
  --color-primary-200: '"${P}"'40;\
  --color-primary-600: '"$P"';\
  --color-primary-700: '"$P2"';\
}
' "$CSS_FILE"
else
  # Insert @theme block after @import
  sed -i '' '/@import "tailwindcss";/a\
\
@theme {\
  --color-primary: '"$P"';\
  --color-primary-dark: '"$P2"';\
  --color-primary-100: '"${P}"'20;\
  --color-primary-200: '"${P}"'40;\
  --color-primary-600: '"$P"';\
  --color-primary-700: '"$P2"';\
}
' "$CSS_FILE"
fi

echo "✅ Theme applied! Run 'npm run dev' and check the app."
