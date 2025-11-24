# Contributing Guide

Thank you for your interest in contributing to the Mixo Ads Dashboard! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Avoid toxic behavior
- Report issues to project maintainers

## How to Contribute

### Reporting Bugs

1. Check if bug is already reported in Issues
2. Provide detailed description
3. Include steps to reproduce
4. Attach screenshots/videos if helpful

**Bug Report Template:**
```
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[If applicable]

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.0]
```

### Suggesting Features

1. Use GitHub Issues with "enhancement" label
2. Describe the use case
3. Explain why it would be useful
4. Provide examples if possible

### Code Contributions

#### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/yourusername/mixo-ads-dashboard.git
cd mixo-ads-dashboard

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

#### Code Standards

- Follow existing code style
- Use TypeScript for all new code
- Add meaningful variable/function names
- Comment complex logic
- Keep functions focused and small

#### Before Submitting PR

```bash
# Test your changes
npm run build

# Check for lint errors (if linting is enabled)
npm run lint

# Test the build locally
npm run preview
```

#### Pull Request Process

1. Update README.md if needed
2. Add tests if applicable
3. Update documentation for new features
4. Create PR with clear description
5. Reference related issues
6. Respond to review feedback promptly

**PR Template:**
```
## Description
What does this PR do?

## Related Issues
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] Feature addition
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots
[If UI changes]
```

## Project Structure Guidelines

When adding new features:

- **Components**: `src/components/` - Reusable React components
- **Pages**: `src/pages/` - Full-page components
- **Services**: `src/services/` - API calls and utilities
- **Styles**: Use Tailwind CSS classes in components

## Coding Guidelines

### TypeScript

- Define interfaces for props
- Use proper typing
- Avoid `any` types where possible

### React

- Use functional components
- Use React hooks
- Keep components focused
- Export as default

### Example Component:

```typescript
interface MyComponentProps {
  title: string
  onAction: () => void
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  )
}
```

## Commit Messages

- Use clear, descriptive messages
- Start with action verb (Add, Fix, Update, etc.)
- Keep first line under 50 characters

Examples:
```
Add campaign filtering
Fix loading state bug
Update API error handling
```

## Documentation

- Update README for new features
- Add JSDoc comments for functions
- Document complex logic
- Keep docs up-to-date

## Local Testing

Before submitting:

1. Test all routes
2. Test error states
3. Test on mobile
4. Check console for errors
5. Verify build succeeds

## Questions?

- Open an issue with question label
- Check existing discussions
- Review README and code comments

---

Thank you for contributing! 🎉
