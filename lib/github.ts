const PROFILE_REVALIDATE_SECONDS = 60 * 60;

export interface GithubRepository {
  owner: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  homepageUrl?: string;
  language?: string;
  stars: number;
  updatedAt: string;
}

const FALLBACK_PINNED_REPOS = [
  'ziri',
  'autoapplier',
  'Recursor',
  'formfix',
  'ivsunsets',
  'W.A.V.E',
];

const PROFILE_HEADERS = {
  Accept: 'text/html,application/xhtml+xml',
  'User-Agent': 'adityasingh2400-portfolio',
};

const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'adityasingh2400-portfolio',
  'X-GitHub-Api-Version': '2022-11-28',
};

export function slugifyProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fetchProfileHtml(username: string): Promise<string> {
  const response = await fetch(`https://github.com/${username}`, {
    headers: PROFILE_HEADERS,
    next: { revalidate: PROFILE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub profile for ${username}`);
  }

  return response.text();
}

function extractPinnedRepoNames(html: string, username: string): string[] {
  const pinnedListMatch = html.match(
    /<ol[\s\S]*?js-pinned-items-reorder-list[\s\S]*?>([\s\S]*?)<\/ol>/
  );

  const scopedHtml = pinnedListMatch?.[1] ?? html;
  const repoPattern = new RegExp(
    `href="/${escapeRegExp(username)}/([^"/?#]+)"`,
    'g'
  );

  const repoNames: string[] = [];
  const seen = new Set<string>();

  for (const match of scopedHtml.matchAll(repoPattern)) {
    const repoName = decodeURIComponent(match[1]);

    if (!repoName || seen.has(repoName)) {
      continue;
    }

    seen.add(repoName);
    repoNames.push(repoName);
  }

  return repoNames.slice(0, 6);
}

async function fetchRepository(
  owner: string,
  name: string
): Promise<GithubRepository | null> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${encodeURIComponent(name)}`,
    {
      headers: GITHUB_HEADERS,
      next: { revalidate: PROFILE_REVALIDATE_SECONDS },
    }
  );

  if (!response.ok) {
    return null;
  }

  const repository = await response.json();

  return {
    owner,
    name: repository.name,
    slug: slugifyProjectName(repository.name),
    description: repository.description ?? '',
    url: repository.html_url,
    homepageUrl: repository.homepage || undefined,
    language: repository.language || undefined,
    stars: repository.stargazers_count ?? 0,
    updatedAt: repository.updated_at ?? new Date().toISOString(),
  };
}

function buildFallbackRepository(owner: string, name: string): GithubRepository {
  return {
    owner,
    name,
    slug: slugifyProjectName(name),
    description: '',
    url: `https://github.com/${owner}/${encodeURIComponent(name)}`,
    homepageUrl: undefined,
    language: undefined,
    stars: 0,
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchPinnedRepositories(
  username: string
): Promise<GithubRepository[]> {
  try {
    const html = await fetchProfileHtml(username);
    const pinnedRepoNames = extractPinnedRepoNames(html, username);
    const repoNames = pinnedRepoNames.length > 0 ? pinnedRepoNames : FALLBACK_PINNED_REPOS;

    const repositories = await Promise.all(
      repoNames.map((repoName) => fetchRepository(username, repoName))
    );

    const resolved = repositories.filter(
      (repository): repository is GithubRepository => repository !== null
    );

    if (resolved.length > 0) {
      return resolved;
    }
  } catch (error) {
    console.error('Unable to fetch pinned repositories from GitHub.', error);
  }

  return FALLBACK_PINNED_REPOS.map((repoName) =>
    buildFallbackRepository(username, repoName)
  );
}
