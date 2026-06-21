# Content directory (future MDX migration)

Guides currently live as TypeScript modules under `src/lib/tools/`. Each file exports a `ToolGuide` object consumed by `src/lib/content.ts`.

## Planned structure

```
content/
  tools/
    ssh.mdx          # frontmatter + markdown body
    docker.mdx
  deployments/
    flask-postgres-compose.mdx
```

### Example tool frontmatter

```yaml
---
slug: ssh
name: SSH
category: networking
description: Secure remote shell access
icon: 🔑
whatIsThis: SSH lets you control a remote computer securely...
---
```

Steps would use a custom MDX component:

```mdx
<Step title="Install OpenSSH" os="linux">
sudo apt-get install openssh-server
</Step>
```

## Migration steps (when ready)

1. Add `@next/mdx` and configure `next.config.ts` for `.mdx` pages or a content loader.
2. Move one pilot guide (e.g. `ssh`) to `content/tools/ssh.mdx`.
3. Add a build script that compiles MDX → `ToolGuide` JSON or imports at build time.
4. Keep `tool-extras.ts` for cross-links (`relatedDeployments`, `troubleshoot`) until those move to frontmatter.
5. Run `npm run validate:content` in CI after edits.

## Contributing today

Edit files in `src/lib/tools/` and register new tools in `src/lib/content.ts`. Add search metadata in `src/lib/search-index.ts` and extras in `src/lib/tool-extras.ts`.
