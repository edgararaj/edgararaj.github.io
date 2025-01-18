export async function apiRepoData(userName: string, repoName: string) {
  console.log('EXPENSIVE FETCH!')
  if (process.env.NODE_ENV == 'development') {
    return {
      id: 460565742,
      node_id: 'R_kgDOG3Os7g',
      name: 'Gunolandia',
      full_name: 'edgararaj/Gunolandia',
      private: false,
      owner: {
        login: 'edgararaj',
        id: 43727819,
        node_id: 'MDQ6VXNlcjQzNzI3ODE5',
        avatar_url: 'https://avatars.githubusercontent.com/u/43727819?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/edgararaj',
        html_url: 'https://github.com/edgararaj',
        followers_url: 'https://api.github.com/users/edgararaj/followers',
        following_url:
          'https://api.github.com/users/edgararaj/following{/other_user}',
        gists_url: 'https://api.github.com/users/edgararaj/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/edgararaj/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/edgararaj/subscriptions',
        organizations_url: 'https://api.github.com/users/edgararaj/orgs',
        repos_url: 'https://api.github.com/users/edgararaj/repos',
        events_url: 'https://api.github.com/users/edgararaj/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/edgararaj/received_events',
        type: 'User',
        user_view_type: 'public',
        site_admin: false,
      },
      html_url: 'https://github.com/edgararaj/Gunolandia',
      description: 'Gunna go guna',
      fork: false,
      url: 'https://api.github.com/repos/edgararaj/Gunolandia',
      forks_url: 'https://api.github.com/repos/edgararaj/Gunolandia/forks',
      keys_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/keys{/key_id}',
      collaborators_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/edgararaj/Gunolandia/teams',
      hooks_url: 'https://api.github.com/repos/edgararaj/Gunolandia/hooks',
      issue_events_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/issues/events{/number}',
      events_url: 'https://api.github.com/repos/edgararaj/Gunolandia/events',
      assignees_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/assignees{/user}',
      branches_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/branches{/branch}',
      tags_url: 'https://api.github.com/repos/edgararaj/Gunolandia/tags',
      blobs_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/blobs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/tags{/sha}',
      git_refs_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/refs{/sha}',
      trees_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/trees{/sha}',
      statuses_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/statuses/{sha}',
      languages_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/languages',
      stargazers_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/stargazers',
      contributors_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/contributors',
      subscribers_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/subscribers',
      subscription_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/subscription',
      commits_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/commits{/sha}',
      git_commits_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/commits{/sha}',
      comments_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/comments{/number}',
      issue_comment_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/issues/comments{/number}',
      contents_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/contents/{+path}',
      compare_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/edgararaj/Gunolandia/merges',
      archive_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/{archive_format}{/ref}',
      downloads_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/downloads',
      issues_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/issues{/number}',
      pulls_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/pulls{/number}',
      milestones_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/milestones{/number}',
      notifications_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/notifications{?since,all,participating}',
      labels_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/labels{/name}',
      releases_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/releases{/id}',
      deployments_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/deployments',
      created_at: '2022-02-17T18:50:14Z',
      updated_at: '2022-07-06T18:42:55Z',
      pushed_at: '2022-07-06T18:53:56Z',
      git_url: 'git://github.com/edgararaj/Gunolandia.git',
      ssh_url: 'git@github.com:edgararaj/Gunolandia.git',
      clone_url: 'https://github.com/edgararaj/Gunolandia.git',
      svn_url: 'https://github.com/edgararaj/Gunolandia',
      homepage: '',
      size: 30008,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'C#',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      has_discussions: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      allow_forking: true,
      is_template: false,
      web_commit_signoff_required: false,
      topics: [],
      visibility: 'public',
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      temp_clone_token: null,
      network_count: 0,
      subscribers_count: 1,
    }
  }

  const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        return null
      }
      return response.json()
    })
    .catch(error => {
      throw new Error(`Failed to fetch repository data: ${error.message}`)
    })
}

export async function apiRepoReadme(userName: string, repoName: string) {
  if (process.env.NODE_ENV == 'development') {
    return {
      name: 'README.md',
      path: 'README.md',
      sha: '776ae77b8b5003808f9bad68957c295c79c7fa83',
      size: 37,
      url: 'https://api.github.com/repos/edgararaj/Gunolandia/contents/README.md?ref=master',
      html_url: 'https://github.com/edgararaj/Gunolandia/blob/master/README.md',
      git_url:
        'https://api.github.com/repos/edgararaj/Gunolandia/git/blobs/776ae77b8b5003808f9bad68957c295c79c7fa83',
      download_url:
        'https://raw.githubusercontent.com/edgararaj/Gunolandia/master/README.md',
      type: 'file',
      content: 'IyBHdW5vbMOibmRpYQoKIVtCYW5uZXJdKGJhbm5lci5wbmcpCg==\n',
      encoding: 'base64',
      _links: {
        self: 'https://api.github.com/repos/edgararaj/Gunolandia/contents/README.md?ref=master',
        git: 'https://api.github.com/repos/edgararaj/Gunolandia/git/blobs/776ae77b8b5003808f9bad68957c295c79c7fa83',
        html: 'https://github.com/edgararaj/Gunolandia/blob/master/README.md',
      },
    }
  }

  const apiUrl = `https://api.github.com/repos/${userName}/${repoName}/readme`
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch readme (Status ${response.status})`)
      }
      return response.json()
    })
    .catch(_ => {
      return null
    })
}

export async function apiGetReadme(downloadUrl: string) {
  if (process.env.NODE_ENV == 'development') {
    return `# Gunolândia

![Banner](banner.png)
`
  }
  return fetch(downloadUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch README content (Status ${response.status})`,
        )
      }
      return response.text()
    })
    .catch(error => {
      throw new Error(`Failed to fetch README content: ${error.message}`)
    })
}
