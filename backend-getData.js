// Filename: backend/getData.jsw (web modules need to have a .jsw extension)
import{fetch} from 'wix-fetch';
// export function multiply(factor1, factor2) {
//     return factor1 * factor2;
// }


export function rate_limit(){
	const url = "https://api.github.com/rate_limit";
	return fetch(url, {
		method: 'get',
		headers: {"Authorization": "token 54325fb09e3c015dc6bd6d4565e2e52b927fd63f"}
	})
	.then(response=>{console.log(response.json())});
}


export function getGithubMilestones(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/milestones";
	return fetch(url,{method: 'get'})
	.then(response=>response.json());
}

export function getGithubCommits(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/commits";
	return fetch(url,{method:'get'})
	.then(response => response.json());
}

export function getLinesDeletedAdded(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/stats/contributors";
	return fetch(url,{method:'get'})
	.then(response => response.json());
}

export function getTreeData(sha,ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName +"/"+ repoName + "/git/trees/" +sha
   return fetch(url, {method: "get"})
  .then(response => response.json());
//   .then(json => console.log(JSON.stringify(json)));
//   .then(json => JSON.parse(json));
}

export function getCommitURL(sha,ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName +"/"+ repoName + "/commits/" +sha
   return fetch(url, {method: "get"})
  .then(response => response.json());
//   .then(json => console.log(JSON.stringify(json)));
//   .then(json => JSON.parse(json));
}


export function getTimeToFix(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/issues/events"
	return fetch(url, {method: "get"})
	.then(response => response.json());
}

export function getOpenIssues(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/issues"
	return fetch(url, {method: "get"})
	.then(response => response.json());
}

export function getClosedIssues(ownerName,repoName)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/issues/events"
	return fetch(url, {method: "get"})
	.then(response => response.json());
}

export function getFiles(ownerName, repoName){
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/contents"
	return fetch(url, {method: "get"})
	.then(response => response.json());
}

export function getTimeToRespondToIssue(ownerName,repoName,issueNumber)
{
	const urlFront = "https://api.github.com/repos/";
	let url = urlFront + ownerName + "/" + repoName + "/issues/" + issueNumber +"/events"
	return fetch(url, {method :"get"})
	.then(response => response.json());
}

//Use the following code in one of your site's front-end files
//to call the multiply function from backend/getData.jsw.

/* 
import {multiply} from 'backend/getData';

$w.onReady(function () {
	
	multiply(4,5).then(product => {
	    console.log(product);
	      // Logs: 20
	})
	.catch(error => {
		console.log(error);
	});
});
*/
