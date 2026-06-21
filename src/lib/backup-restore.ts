export interface BackupPlaybook {
  id: string;
  title: string;
  icon: string;
  what: string;
  backupSnippetId: string;
  restoreSnippetId: string;
  verifySnippetId?: string;
  toolHref?: string;
  configHref?: string;
  scheduleHint: string;
}

/** What to back up → how → how to prove restore works */
export const backupPlaybooks: BackupPlaybook[] = [
  {
    id: "postgres",
    title: "PostgreSQL",
    icon: "🐘",
    what: "App database — pg_dump logical backup; PITR if using WAL archiving.",
    backupSnippetId: "pg-dump-backup",
    restoreSnippetId: "pg-restore",
    verifySnippetId: "postgres-conn",
    toolHref: "/tools/postgresql/",
    scheduleHint: "Daily cron or K8s CronJob; test restore quarterly to empty DB.",
  },
  {
    id: "mysql",
    title: "MySQL / MariaDB",
    icon: "🐬",
    what: "mysqldump for logical backup; binlog for point-in-time if enabled.",
    backupSnippetId: "mysql-dump-backup",
    restoreSnippetId: "mysql-restore",
    toolHref: "/tools/mysql/",
    scheduleHint: "Nightly dump to S3; retain 7–30 days per policy.",
  },
  {
    id: "mongodb",
    title: "MongoDB",
    icon: "🍃",
    what: "mongodump archive; replica set snapshots for larger clusters.",
    backupSnippetId: "mongo-dump-backup",
    restoreSnippetId: "mongo-restore",
    toolHref: "/tools/mongodb/",
    scheduleHint: "Daily archive; restore to staging before prod dependency.",
  },
  {
    id: "redis",
    title: "Redis",
    icon: "🔴",
    what: "RDB snapshot or BGSAVE; AOF for durability if configured.",
    backupSnippetId: "redis-rdb-backup",
    restoreSnippetId: "redis-restore-rdb",
    toolHref: "/tools/redis/",
    scheduleHint: "BGSAVE before deploy; copy dump.rdb off-host.",
  },
  {
    id: "k8s-velero",
    title: "Kubernetes (Velero)",
    icon: "☸️",
    what: "Cluster resources + PVC snapshots to object storage.",
    backupSnippetId: "velero-backup-ns",
    restoreSnippetId: "velero-restore",
    verifySnippetId: "k8s-rollout-undo",
    toolHref: "/tools/velero/",
    configHref: "/deployments/k8s-cronjob/",
    scheduleHint: "Daily schedule per namespace; restore drill to staging cluster quarterly.",
  },
  {
    id: "etcd",
    title: "etcd (control plane)",
    icon: "🔐",
    what: "Snapshot etcd before control plane upgrades — cluster brain.",
    backupSnippetId: "etcd-snapshot",
    restoreSnippetId: "etcd-restore-snapshot",
    toolHref: "/tools/kubernetes/",
    scheduleHint: "Before every K8s upgrade; store snapshot off control plane node.",
  },
  {
    id: "terraform-state",
    title: "Terraform state",
    icon: "🏗️",
    what: "Remote state in S3/GCS — versioning + lock table; not local tfstate.",
    backupSnippetId: "tf-state-pull",
    restoreSnippetId: "tf-state-version-restore",
    toolHref: "/tools/terraform/",
    configHref: "/deployments/terraform-aws-ec2/#prod-delta",
    scheduleHint: "Enable S3 versioning; never delete state without backup.",
  },
  {
    id: "aws-rds",
    title: "AWS RDS",
    icon: "☁️",
    what: "Automated snapshots + manual snapshot before major change.",
    backupSnippetId: "rds-snapshot",
    restoreSnippetId: "rds-restore-snapshot",
    toolHref: "/tools/aws-cli/",
    scheduleHint: "7–35 day retention; restore to new instance to test.",
  },
  {
    id: "files-s3",
    title: "Files / configs to S3",
    icon: "📦",
    what: "Sync /etc, nginx configs, or app uploads to durable object storage.",
    backupSnippetId: "s3-sync-backup",
    restoreSnippetId: "s3-sync-restore",
    toolHref: "/tools/aws-cli/",
    scheduleHint: "Cron with --delete only after verify; versioned bucket.",
  },
];

export const backupDrillChecklist = [
  { id: "pick-target", label: "Pick one system (DB, Velero, RDS) — not everything at once" },
  { id: "restore-isolated", label: "Restore to staging / empty instance — never first try on prod" },
  { id: "verify-data", label: "Run app smoke test or row count against backup timestamp" },
  { id: "document-rto", label: "Note how long restore took (RTO) and log in change ticket" },
  { id: "fix-gaps", label: "Update cron, retention, or runbook if restore failed or took too long" },
];
