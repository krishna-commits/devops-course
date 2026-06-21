import type { ToolGuide, GuideSection, OS } from "../types";

/**
 * Standard tool guide format (all tools should follow this):
 *
 * Sections (order): install → configure? → verify? → manage? → uninstall?
 * Section ids:       install | configure | verify | manage | uninstall
 * Section titles:    "Install {name}" | "Configure {name}" | "Verify" | "Manage {name}" | "Uninstall"
 * Step titles:       "(01) …", "(02) …" (zero-padded, sequential within each section)
 * Step fields:       title, description?, commands: { linux?, mac?, windows? }
 *
 * Config file paths: document in src/lib/tool-config-files.ts (shown on tool pages).
 */

export type Cmd = Partial<Record<OS, string>>;

export interface GuideStepMeta {
  title: string;
  description?: string;
}

export interface GuideExtra {
  configure?: Cmd;
  configureStep?: GuideStepMeta;
  verify?: Cmd;
  verifyStep?: GuideStepMeta;
  manage?: Cmd;
  manageStep?: GuideStepMeta;
  uninstall?: Cmd;
  uninstallStep?: GuideStepMeta;
  /** e.g. "Set Up GitHub Actions" for repo-based CI tools */
  installSectionTitle?: string;
  installStep?: GuideStepMeta;
}

export function section(
  id: string,
  title: string,
  steps: { title: string; description?: string; commands: Cmd }[]
): GuideSection {
  return { id, title, steps };
}

export function guide(
  slug: string,
  name: string,
  category: string,
  description: string,
  icon: string,
  install: Cmd,
  extra?: GuideExtra
): ToolGuide {
  const installTitle = extra?.installSectionTitle ?? `Install ${name}`;
  const installStepTitle = extra?.installStep?.title ?? `(01) Install ${name}`;

  return {
    slug,
    name,
    category,
    description,
    icon,
    install: section("install", installTitle, [
      {
        title: installStepTitle,
        description: extra?.installStep?.description,
        commands: install,
      },
    ]),
    ...(extra?.configure && {
      configure: section("configure", `Configure ${name}`, [
        {
          title: extra.configureStep?.title ?? `(01) Configure ${name}`,
          description: extra.configureStep?.description,
          commands: extra.configure,
        },
      ]),
    }),
    ...(extra?.verify && {
      verify: section("verify", "Verify", [
        {
          title: extra.verifyStep?.title ?? "(01) Verify installation",
          description: extra.verifyStep?.description,
          commands: extra.verify,
        },
      ]),
    }),
    ...(extra?.manage && {
      manage: section("manage", `Manage ${name}`, [
        {
          title: extra.manageStep?.title ?? "(01) Common tasks",
          description: extra.manageStep?.description,
          commands: extra.manage,
        },
      ]),
    }),
    ...(extra?.uninstall && {
      uninstall: section("uninstall", "Uninstall", [
        {
          title: extra.uninstallStep?.title ?? "(01) Remove",
          description: extra.uninstallStep?.description,
          commands: extra.uninstall,
        },
      ]),
    }),
  };
}

/** Valid section ids and their expected order on tool pages */
export const TOOL_SECTION_ORDER = ["install", "configure", "verify", "manage", "uninstall"] as const;

export type ToolSectionId = (typeof TOOL_SECTION_ORDER)[number];
