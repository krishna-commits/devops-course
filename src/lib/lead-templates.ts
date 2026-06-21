export interface LeadTemplate {
  id: string;
  title: string;
  description: string;
  markdown: string;
}

export const leadTemplates: LeadTemplate[] = [
  {
    id: "post-incident",
    title: "Post-incident report",
    description: "After pager — symptom through follow-up actions.",
    markdown: `# Incident report

**Date:** YYYY-MM-DD  
**Severity:** P1 / P2 / P3  
**Duration:** HH:MM – HH:MM UTC  
**Runbook used:** [link to runbook](/runbooks/)

## Symptom
What users/systems saw (errors, dashboards, tickets).

## Timeline
| Time (UTC) | Event |
|------------|-------|
| HH:MM | Alert fired / user report |
| HH:MM | Investigation started |
| HH:MM | Root cause identified |
| HH:MM | Mitigation applied |
| HH:MM | Resolved |

## Root cause
One paragraph — what actually broke.

## Fix applied
\`\`\`bash
# commands run
kubectl ...
\`\`\`

## Follow-up
- [ ] Prevent recurrence (code/config change)
- [ ] Update runbook if steps were wrong
- [ ] Add alert / dashboard gap
- [ ] Owner: @name — due: YYYY-MM-DD
`,
  },
  {
    id: "change-request",
    title: "Change request",
    description: "Pre-deploy approval — what, risk, rollback.",
    markdown: `# Change request

**Change ID:** CHG-XXXX  
**Requester:** @name  
**Environment:** prod / staging  
**Window:** YYYY-MM-DD HH:MM UTC

## What is changing
Brief description (deploy v1.2.3, Terraform module bump, ingress cert renew).

## Risk
Low / Medium / High — what could break.

## Rollback command
\`\`\`bash
kubectl rollout undo deploy/<name> -n <ns>
# or: helm rollback <release> <rev> -n <ns>
# or: terraform apply previous plan
\`\`\`

## Pre-checks
- [ ] Go-live checklist complete: /go-live/
- [ ] CI green on commit SHA: \`abc123\`
- [ ] On-call aware

## Approval
| Role | Name | Approved |
|------|------|----------|
| DevOps lead | | ☐ |
| App owner | | ☐ |
`,
  },
];
