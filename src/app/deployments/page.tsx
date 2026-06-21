import {
  deployments,
  deploymentTypes,
} from "@/lib/deployments";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { DeploymentCard } from "@/components/DeploymentCard";

export default function DeploymentsPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 min-w-0">
          <div className="border-b border-violet-200/80 dark:border-violet-900/50 bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-800 dark:from-violet-950 dark:via-violet-900 dark:to-fuchsia-950 px-6 lg:px-8 py-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-200 mb-2">
              Copy & deploy
            </p>
            <h1 className="text-3xl font-bold text-white">
              Configs
            </h1>
            <p className="text-violet-100 mt-2 max-w-2xl leading-relaxed">
              Docker Compose, Kubernetes YAML, and Dockerfiles — copy, customize, and deploy.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {deploymentTypes.map((type) => {
                const count = deployments.filter((d) => d.type === type.id).length;
                if (count === 0) return null;
                return (
                  <a
                    key={type.id}
                    href={`#${type.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-white transition-colors"
                  >
                    <span>{type.icon}</span>
                    <span>{type.name}</span>
                    <span className="text-violet-200 text-xs">{count}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {deploymentTypes.map((type) => {
              const items = deployments.filter((d) => d.type === type.id);
              if (items.length === 0) return null;
              return (
                <section key={type.id} id={type.id} className="mb-14 scroll-mt-28">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-violet-100 dark:border-violet-900/40">
                    <span className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-xl">
                      {type.icon}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {type.name}
                      </h2>
                      <p className="text-xs text-zinc-500">{items.length} templates</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((recipe) => (
                      <DeploymentCard key={recipe.slug} recipe={recipe} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
