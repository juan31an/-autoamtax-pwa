# 🤖 MCP Servers Guide for AutoAmTax

## Overview

MCP (Model Context Protocol) servers enhance Claude Code with specialized capabilities. For the AutoAmTax taxi app project, we've configured four key servers that will supercharge your development workflow.

## 🛠️ Setup Instructions

### Quick Setup
```bash
# Run the setup script
./setup-mcp.sh

# Restart Claude Code
# Then verify installation
claude mcp list
```

### Manual Setup
1. Ensure Node.js and npm are installed
2. The `.mcp.json` file is already configured in your project
3. Restart Claude Code to load the MCP servers

## 🔌 Available MCP Servers

### 1. Sequential
**Purpose**: Complex multi-step analysis and structured thinking

**Best for AutoAmTax**:
- Analyzing the current app architecture
- Planning database schema optimization
- Root cause analysis for bugs
- Performance bottleneck identification
- Security vulnerability assessment

**Example Usage**:
```bash
/analyze --seq  # Deep architectural analysis
/troubleshoot --seq firebase-connection-issues
/improve --seq --focus performance
```

**Auto-activates when**:
- Complex debugging scenarios
- Multi-step problem solving
- System design questions
- Using `--think`, `--think-hard`, `--ultrathink` flags

### 2. Filesystem
**Purpose**: Enhanced file system operations within your project

**Best for AutoAmTax**:
- Advanced file operations within the taxi app project
- Batch file processing
- Project structure analysis
- File content search and manipulation

**Example Usage**:
```bash
/analyze project-structure
/search --pattern "firebase" --files
/organize project-files
```

### 3. GitHub
**Purpose**: GitHub repository integration and management

**Best for AutoAmTax**:
- Repository analysis and management
- Issue tracking and pull requests
- Code review automation
- Release management

**Example Usage**:
```bash
/git analyze-repository
/git create-issue "Fix mobile navigation bug"
/git review-changes
```

### 4. Brave Search
**Purpose**: Real-time web search for development resources

**Best for AutoAmTax**:
- Finding Firebase solutions and examples
- Looking up latest web development practices
- Researching taxi app features and implementations
- Finding libraries and tools

**Example Usage**:
```bash
/search "Firebase authentication best practices 2024"
/research "PWA taxi app examples"
/find "Chart.js mobile responsive examples"
```

### 5. Memory
**Purpose**: Persistent memory across sessions

**Best for AutoAmTax**:
- Remembering project decisions and patterns
- Storing frequently used code snippets
- Maintaining context across development sessions
- Learning from previous interactions

**Example Usage**:
```bash
/remember "Firebase config pattern for taxi app"
/recall "mobile optimization decisions"
/note "Performance improvements made"
```

## 🎯 AutoAmTax-Specific Use Cases

### Firebase Integration
```bash
# Get Firebase best practices and examples
/analyze --c7 firebase-authentication
/implement --c7 --seq firestore-security-rules
/improve --c7 --focus database-optimization
```

### Mobile Interface Optimization
```bash
# Improve mobile UI with Magic
/improve --magic mobile-navigation
/implement --magic responsive-dashboard
/design --magic taxi-driver-interface
```

### Performance Analysis
```bash
# Deep performance analysis with Sequential
/analyze --seq --focus performance
/troubleshoot --seq --play slow-loading-issues
/improve --seq firebase-query-optimization
```

### End-to-End Testing
```bash
# Test complete taxi workflows
/test --play shift-start-to-finish-workflow
/implement --play --seq automated-regression-tests
/analyze --play mobile-user-experience
```

### Complex Feature Development
```bash
# Use multiple servers for comprehensive development
/implement --c7 --seq --magic real-time-location-tracking
/improve --all-mcp taxi-app-architecture
/analyze --seq --c7 --magic --play comprehensive-audit
```

## 🚀 SuperClaude Integration

The MCP servers integrate seamlessly with your SuperClaude framework:

### With Personas
```bash
/analyze --persona-architect --seq  # Architectural analysis
/implement --persona-frontend --magic  # UI development
/improve --persona-performance --seq --play  # Performance optimization
/test --persona-qa --play  # Quality assurance testing
```

### With Thinking Modes
```bash
/analyze --think --seq  # Structured analysis
/analyze --think-hard --seq --c7  # Deep analysis with docs
/analyze --ultrathink --all-mcp  # Maximum analysis power
```

### With Flags
```bash
/improve --uc --seq  # Compressed output with analysis
/implement --validate --c7 --magic  # Validated implementation
/analyze --delegate --seq  # Delegated analysis
```

## 🔧 Troubleshooting

### MCP Server Not Found
```bash
# Check if servers are installed
claude mcp list

# Reinstall if needed
./setup-mcp.sh
```

### Server Connection Issues
```bash
# Restart Claude Code
# Check Node.js version (should be 16+)
node --version

# Verify .mcp.json is valid JSON
cat .mcp.json | jq .
```

### Performance Issues
```bash
# Use compression with MCP for large operations
/analyze --uc --seq
/improve --uc --all-mcp
```

## 📈 Best Practices

### 1. Start Simple
- Begin with single MCP servers for specific tasks
- Gradually combine servers as you get comfortable

### 2. Match Tool to Task
- **Context7**: When you need documentation or examples
- **Sequential**: For complex analysis and planning
- **Magic**: For UI/UX work
- **Playwright**: For testing and validation

### 3. Use Auto-Activation
- Let the system choose MCP servers based on context
- Override with explicit flags when needed

### 4. Combine with SuperClaude
- Use personas + MCP for domain-specific expertise
- Combine thinking flags with MCP for deeper analysis

## 🎨 Example Workflows

### New Feature Development
1. **Plan**: `/design --seq --c7 new-expense-tracking`
2. **Research**: `/analyze --c7 expense-tracking-patterns`
3. **Implement**: `/implement --magic --c7 expense-form-component`
4. **Test**: `/test --play expense-workflow`
5. **Optimize**: `/improve --seq --focus performance`

### Bug Investigation
1. **Identify**: `/troubleshoot --seq symptom-description`
2. **Research**: `/analyze --c7 --seq firebase-authentication-issues`
3. **Fix**: `/implement --c7 authentication-fix`
4. **Verify**: `/test --play login-workflow`

### Performance Optimization
1. **Analyze**: `/analyze --seq --play --focus performance`
2. **Research**: `/analyze --c7 firebase-optimization-patterns`
3. **Implement**: `/improve --seq firebase-query-optimization`
4. **Validate**: `/test --play performance-benchmarks`

## 🔐 Security Note

MCP servers run locally and don't send your code to external services. They enhance Claude's capabilities while maintaining privacy and security.

---

**Ready to supercharge your AutoAmTax development? Run `./setup-mcp.sh` and start using these powerful MCP servers!**