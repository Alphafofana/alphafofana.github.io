//GitHub GraphQL API client for browsers and Node

const rp = require("request-promise");
const result = require("lodash/result");
const each = require("lodash/each");
const fs = require("fs");
const path = require("path");

let args = process.argv.slice(2);
let GITHUB_PAT;

args[0] === undefined
	? (GITHUB_PAT = process.env.GITHUB_PAT)
	: (GITHUB_PAT = args[0]);

const getCommentObject = () => {
	let comment;
	args[0] === undefined
		? (comment = {
				_comment: `manual update, ${new Date().toLocaleString()}`,
		  })
		: (comment = {
				_comment: `GH actions update, ${new Date().toLocaleString()}`,
		  });
	return comment;
};

const githubRequest = (query) => {
	const requestBody = { query };
	return rp({
		uri: "https://api.github.com/graphql",
		method: "post",
		json: true,
		headers: {
			Authorization: `bearer ${GITHUB_PAT}`,
			"User-Agent": "Request-Promise",
		},
		body: requestBody,
	});
};

const generateQuery = (totalResults = 100, nextId = null, repositoryType) => {
	const offset = nextId ? `after:"${nextId}"` : "";
	return `{
      user(login: "Alphafofana") {
        bio,
        avatarUrl,
        ${repositoryType} (first :${totalResults} ${offset} privacy: PUBLIC) {
          nodes {
          	name,
			url,
			languages(first: 50, orderBy: {field: SIZE, direction: DESC}) {
				edges {
				  size
				  node {
					name
				  }
				}
			},
            stargazers{
              totalCount
            },
            owner {
              login
            }
            forks {
              totalCount
            },
            homepageUrl,
            description,
            repositoryTopics (first: ${totalResults}){
              nodes {
                topic {
                  name
                }
              }
            }
          },
          pageInfo {
          	hasNextPage,
            endCursor
        	}
        }
      }
    }`;
};

const getProjects = (queryParam, queryResult, repositoryType) => {
	const query = generateQuery(
		queryParam.totalResults,
		queryParam.nextId,
		repositoryType
	);
	return githubRequest(query).then((response) => {
		const nextPageInfo = result(
			response,
			`data.user.${repositoryType}.pageInfo`,
			{}
		);
		if (response.errors) {
			throw response.errors;
		}
		if (nextPageInfo.hasNextPage) {
			queryParam.nextId = nextPageInfo.endCursor;
			queryResult.push(response);
			return getProjects(queryParam, queryResult, repositoryType);
		}
		queryResult.push(response);
		return queryResult;
	});
};

const mergeRepoInfo = (resultArray = [], repositoryType) => {
	const nodes = [];
	each(resultArray, (res) => {
		const resultNodes = result(
			res,
			`data.user.${repositoryType}.nodes`,
			[]
		);

		nodes.push(getCommentObject());
		nodes.push(...resultNodes);
		console.log(nodes);
	});
	return nodes;
};

const writeJSON = (filename, data) => {
	const filePath = path.resolve(__dirname, "../assets", filename);
	fs.writeFileSync(filePath, data);
	return filePath;
};

const getAllProjects = (repositoryType) => {
	const queryResult = [];
	const queryParam = {
		totalResults: 100,
		nextId: null,
	};
	return getProjects(queryParam, queryResult, repositoryType).then((data) =>
		mergeRepoInfo(data, repositoryType)
	);
};

// MAIN STATEMENT THAT EXECUTES THE ABOVE FUNCTIONS
// BASICALLY THIS GETS ALL THE REPOS AND CONTRIBUTIONS FROM GITHUB

Promise.all([
	getAllProjects("repositories").then((data) =>
		writeJSON("projects.json", JSON.stringify(data, null, "\t"))
	),
])
	.then((filepaths) => console.log("updated files", filepaths))
	.catch((err) => {
		console.log(err);
		process.exit(-1);
	});
