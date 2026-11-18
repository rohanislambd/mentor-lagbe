<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Coding Rules & Development Guidelines

Follow these rules strictly throughout the entire project.

### 1. Keep Code Simple
- Do not over-engineer the application.
- Keep the implementation beginner-friendly and easy to understand.
- Write clean, readable, and maintainable code.
- Prefer simple solutions over complex abstractions.
- Avoid unnecessary design patterns, abstractions, and premature optimizations.
- Do not add features that are not requested.

### 2. File & Code Organization
- Keep each file reasonably small and focused.
- Do not put the entire application logic into one file.
- Do not create unnecessarily large files containing 300–400+ lines of code.
- As a general guideline, keep files around 100–200 lines whenever practical.
- If a file becomes too large, split it into smaller, meaningful components or modules.
- Each component or function should have one clear responsibility.
- Avoid creating too many tiny files unnecessarily.
- Use meaningful and consistent file and folder names.

### 3. Component Development
- Create reusable components only when they are genuinely needed.
- Avoid unnecessary component splitting.
- Keep components focused on a single responsibility.
- Separate UI components from business logic when it improves readability.
- Do not repeat the same code unnecessarily.

### 4. Code Quality
- Use proper TypeScript types instead of `any`.
- Avoid unnecessary comments. Add comments only when the logic is not obvious.
- Avoid duplicate code and unnecessary state.
- Do not add unnecessary validation or error-handling layers.
- Use existing project dependencies whenever possible.
- Do not install additional packages without a good reason.

### 5. Project Consistency
- Before writing code, inspect the existing project structure and understand the current implementation.
- Follow the existing coding style, naming conventions, and architecture.
- Do not unnecessarily modify existing working code.
- Do not create duplicate files, components, functions, or API endpoints.
- Reuse existing utilities and components where appropriate.

### 6. Development Workflow
- First, understand the requirements.
- Plan the necessary files and components before implementation.
- Implement features step by step.
- Keep changes focused on the requested task.
- After implementation, check for TypeScript errors, build errors, and broken functionality.
- Do not claim something is working unless you have verified it.

### Most Important Rules
1. Simplicity over complexity.
2. Readability over clever code.
3. Maintainability over unnecessary abstraction.
4. Reusability when genuinely needed.
5. Never over-engineer the application.

**Always write code that a beginner developer can easily read, understand, debug, and maintain.**

