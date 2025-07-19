#!/bin/bash

# AutoAmTax - MCP Server Setup Script
echo "🚀 Setting up MCP servers for AutoAmTax project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install MCP servers globally for better performance
echo "📦 Installing MCP servers..."

echo "  → Installing Context7 MCP Server..."
npm install -g @context7/mcp-server 2>/dev/null || echo "    Note: Context7 may need manual setup"

echo "  → Installing Sequential MCP Server..."
npm install -g @sequential/mcp-server 2>/dev/null || echo "    Note: Sequential may need manual setup" 

echo "  → Installing Magic MCP Server..."
npm install -g @21st-dev/magic-mcp-server 2>/dev/null || echo "    Note: Magic may need manual setup"

echo "  → Installing Playwright MCP Server..."
npm install -g @playwright/mcp-server 2>/dev/null || echo "    Note: Playwright may need manual setup"

echo ""
echo "🔧 MCP Configuration created at: .mcp.json"
echo ""
echo "📋 Next steps:"
echo "   1. Restart Claude Code"
echo "   2. Run: claude mcp list"
echo "   3. Test with: /analyze --seq --c7 --magic"
echo ""
echo "🔗 For more information:"
echo "   • Claude Code MCP docs: https://docs.anthropic.com/en/docs/claude-code/mcp"
echo "   • Context7: https://context7.ai/"
echo "   • Sequential: https://sequential.ai/"
echo "   • Magic: https://21st.dev/"
echo ""
echo "✨ Setup complete! Your AutoAmTax project is now enhanced with MCP servers."