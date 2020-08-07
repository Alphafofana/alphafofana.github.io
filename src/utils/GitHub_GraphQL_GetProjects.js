//GitHub GraphQL API client for browsers and Node

var rp = require("request-promise");
var result = require("lodash/result");
var each = require("lodash/each");
var fs = require("fs");
var path = require("path");

var args = process.argv.slice(2);
let GITHUB_PAT;

args[0] === undefined
	? (GITHUB_PAT = process.env.GITHUB_PAT)
	: (GITHUB_PAT = args[0]);

const _getCommentObject = () => {
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

const _githubFetcher = (query) => {
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

const _generateProjectReposQuery = (
	totalResults = 100,
	nextId = null,
	repositoryType
) => {
	const offset = nextId ? `after:"${nextId}"` : "";
	return `{
      user(login: "Alphafofana") {
        bio,
        avatarUrl,
        ${repositoryType} (first :${totalResults} ${offset} privacy: PUBLIC) {
          nodes {
          	name,
            url,
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

const _recursiveProjectGetter = (queryParam, queryResult, repositoryType) => {
	const query = _generateProjectReposQuery(
		queryParam.totalResults,
		queryParam.nextId,
		repositoryType
	);
	return _githubFetcher(query).then((response) => {
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
			return _recursiveProjectGetter(
				queryParam,
				queryResult,
				repositoryType
			);
		}
		queryResult.push(response);
		return queryResult;
	});
};

const _getMergedRepositoryInfo = (resultArray = [], repositoryType) => {
	const nodes = [];
	each(resultArray, (res) => {
		const resultNodes = result(
			res,
			`data.user.${repositoryType}.nodes`,
			[]
		);

		nodes.push(_getCommentObject());
		nodes.push(...resultNodes);
		console.log(nodes);
	});
	return nodes;
};

const _writeJSON = (filename, data) => {
	const filePath = path.resolve(__dirname, "../assets", filename);
	fs.writeFileSync(filePath, data);
	return filePath;
};

const _getAllProjects = (repositoryType) => {
	const queryResult = [];
	const queryParam = {
		totalResults: 100,
		nextId: null,
	};
	return _recursiveProjectGetter(
		queryParam,
		queryResult,
		repositoryType
	).then((data) => _getMergedRepositoryInfo(data, repositoryType));
};

// MAIN STATEMENT THAT EXECUTES THE ABOVE FUNCTIONS
// BASICALLY THIS GETS ALL THE REPOS AND CONTRIBUTIONS FROM GITHUB

Promise.all([
	_getAllProjects("repositories").then((data) =>
		_writeJSON("projects.json", JSON.stringify(data, null, "\t"))
	),
])
	.then((filepaths) => console.log("updated files", filepaths))
	.catch((err) => {
		console.log(err);
		process.exit(-1);
	});
