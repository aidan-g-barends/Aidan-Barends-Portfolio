import { ArrowUpRight } from "lucide-react";
import { GITHUB_USERNAME } from "../lib/site";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ContributionData = {
  total: { lastYear: number };
  contributions: Day[];
};

const DAY_SECONDS = 60 * 60 * 24;

// Public contribution calendar (no token needed). Refreshed once a day.
async function getContributions(): Promise<ContributionData | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: DAY_SECONDS } }
    );

    if (!response.ok) return null;
    return (await response.json()) as ContributionData;
  } catch {
    return null;
  }
}

async function getPublicRepoCount(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { next: { revalidate: DAY_SECONDS } }
    );

    if (!response.ok) return null;
    const user = (await response.json()) as { public_repos?: number };
    return user.public_repos ?? null;
  } catch {
    return null;
  }
}

const levelClasses = [
  "bg-foreground/[0.07]",
  "bg-accent/30",
  "bg-accent/55",
  "bg-accent/80",
  "bg-accent",
];

// Group days into week columns (Sunday first), padding the first week
function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  let week: (Day | null)[] = Array(firstWeekday).fill(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) weeks.push(week);
  return weeks;
}

function longestStreak(days: Day[]) {
  let best = 0;
  let current = 0;

  for (const day of days) {
    current = day.count > 0 ? current + 1 : 0;
    best = Math.max(best, current);
  }

  return best;
}

export default async function GitHubActivity() {
  const [data, repoCount] = await Promise.all([
    getContributions(),
    getPublicRepoCount(),
  ]);

  // If GitHub can't be reached, leave the section out rather than break the page
  if (!data || data.contributions.length === 0) return null;

  const weeks = toWeeks(data.contributions);
  const activeDays = data.contributions.filter((day) => day.count > 0).length;

  const stats = [
    { value: data.total.lastYear.toLocaleString("en-ZA"), label: "Contributions in the last year" },
    { value: String(activeDays), label: "Days with commits" },
    { value: `${longestStreak(data.contributions)} days`, label: "Longest streak" },
    ...(repoCount !== null
      ? [{ value: String(repoCount), label: "Public repositories" }]
      : []),
  ];

  return (
    <section
      aria-labelledby="github-activity-heading"
      className="rounded-2xl border border-surface-border bg-surface p-6 sm:p-8"
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
            Shipping consistently
          </p>

          <h2
            id="github-activity-heading"
            className="text-2xl font-bold"
          >
            GitHub activity
          </h2>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          @{GITHUB_USERNAME}
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-surface-border bg-background px-4 py-3"
          >
            <dt className="text-xs text-foreground-muted">{stat.label}</dt>
            <dd className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-accent">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* The grid is decorative; the numbers above carry the information */}
      <div
        aria-hidden="true"
        className="mt-6 overflow-x-auto pb-2"
      >
        {/* Column-first grid: 7 rows (days), one column per week, stretched to fill */}
        <div className="grid min-w-[640px] auto-cols-fr grid-flow-col grid-rows-7 gap-[3px]">
          {weeks.flatMap((week, weekIndex) =>
            Array.from({ length: 7 }, (_, dayIndex) => {
              const day = week[dayIndex];

              return day ? (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={`aspect-square w-full rounded-[3px] ${levelClasses[day.level]}`}
                />
              ) : (
                <span
                  key={`empty-${weekIndex}-${dayIndex}`}
                  className="aspect-square w-full"
                />
              );
            })
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-foreground-muted"
      >
        Less
        {levelClasses.map((className) => (
          <span
            key={className}
            className={`h-[11px] w-[11px] rounded-[3px] ${className}`}
          />
        ))}
        More
      </div>
    </section>
  );
}
