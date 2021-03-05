// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import {getGithubMilestones} from 'backend/getData';
import {getGithubCommits} from 'backend/getData';
import {getLinesDeletedAdded} from 'backend/getData';
import {getTreeData} from 'backend/getData';
import {getTimeToFix} from 'backend/getData';
import {getCommitURL} from 'backend/getData';
import {getOpenIssues} from 'backend/getData';
import {getClosedIssues} from 'backend/getData';
import {getFiles} from 'backend/getData';
import {getTimeToRespondToIssue} from 'backend/getData';
import {rate_limit} from 'backend/getData';
import wixData from 'wix-data';
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';

$w.onReady(function () {
	//TODO: write your page related code here...
    let user = wixUsers.currentUser
    user.getEmail()
    .then((email)=>{
        if (email.length > 12){
            $w('#text15').text = email.substring(0, 12) +"..."
        }
        else{
            $w('#text15').text = email
        }
        $w('#text15').expand()
        if (email === "jengyue96@gmail.com") {
            $w('#button4').show()
        }
    })
    wixData.query("storeGithubLink")
    .find()
    .then((results)=>{
        if (results.items.length > 0)
        {
            let closeIssues,respondDiscussion;
            let returnToMain = results.items[0].otherPage;
            closeIssues = results.items[0].closeIssues;
            respondDiscussion = results.items[0].respondDiscussion;
            if (returnToMain === "true")
            {
                console.log(closeIssues,respondDiscussion);
                $w("#text18").text = closeIssues;
                $w("#text20").text = respondDiscussion;
                $w("#table1").show();
                $w('#text16').show();
                $w('#text17').expand();
                $w('#text18').expand();
                $w('#text19').expand();
                $w('#text20').expand();
                $w('#text21').show();
                $w('#text22').show();
                $w("#table2").show();
                $w('#text23').show();
                $w("#table3").show();
                $w("#table4").show();
                $w("#table5").show();
                $w("#table6").show();
                $w("#table7").show();
                $w("#table8").show();
                $w('#saveTimelineButton').show(); // button1
                $w('#saveLinesContributed').show(); // button2
                $w('#saveAveTimeCloseIssueButton').show(); // button3
                $w('#saveAveTimeRespondIssueButton').show(); // button4
                $w('#saveNumIssuesPerFile').show(); // button5
                $w('#saveFrequentlyChangedButton').show(); // button6
                $w('#saveAverageTimeButton').show();
                $w('#saveAverageNumChange').show();
                $w('#saveAverageChangePerCommitutton').show();
                $w('#checkboxGroup1').show();
                $w('#button1').show();
                $w('#button5').show();
                $w('#saveMainDevelopersButton').show();
            }
            else
            {
                $w("#table1").hide();
                $w("#table2").hide();
                $w("#table3").hide();
                $w("#table4").hide();
                $w("#table5").hide();
                $w("#table6").hide();
                $w("#table7").hide();
                $w("#table8").hide();
            }
        }
    });

    // $w("#table1").hide();
    // $w("#table2").hide();
    // $w("#table3").hide();
    // $w("#table4").hide();
    // $w("#table5").hide();
    // $w("#table6").hide();
    // $w("#table7").hide();
    // $w("#table8").hide();
    $w("#text24").hide();
    $w("#text25").hide();    

    $w('#checkboxGroup1').onChange(() => {
        $w("#table1").hide();
        $w("#table2").hide();
        $w("#table3").hide();
        $w("#table4").hide();
        $w("#table5").hide();
        $w("#table6").hide();
        $w("#table7").hide();
        $w("#table8").hide();
        $w('#text16').hide();
        $w('#text17').hide();
        $w('#text18').hide();
        $w('#text19').hide();
        $w('#text20').hide();
        $w('#text21').hide();
        $w('#text22').hide();
        $w('#text23').hide();
        $w('#saveTimelineButton').hide(); // button1
        $w('#saveLinesContributed').hide(); // button2
        $w('#saveAveTimeCloseIssueButton').hide(); // button3
        $w('#saveAveTimeRespondIssueButton').hide(); // button4
        $w('#saveNumIssuesPerFile').hide(); // button5
        $w('#saveFrequentlyChangedButton').hide(); //button6
        $w('#saveAverageTimeButton').hide();
        $w('#saveAverageNumChange').hide();
        $w('#saveAverageChangePerCommitutton').hide();
        $w('#saveMainDevelopersButton').hide();


        let selected_indices = $w('#checkboxGroup1').selectedIndices;
        for (let i=0;i<selected_indices.length;i++){
            if (selected_indices[i] === 0){
                $w('#table2').show();
                $w('#text23').show();
                $w('#saveTimelineButton').show(); // button2
            }
            if (selected_indices[i] === 1){
                $w('#table1').show();
                $w('#text16').show();
                $w('#saveLinesContributed').show(); // button2
            }
            if (selected_indices[i] === 2){
                $w('#text17').show();
                $w('#text18').show();
                $w('#saveAveTimeCloseIssueButton').show(); // button3
            }
            if (selected_indices[i] === 3){
                $w('#text19').show();
                $w('#text20').show();
                $w('#saveAveTimeRespondIssueButton').show(); // button4
            }
            if (selected_indices[i] === 4){
                $w('#table4').show();
                $w('#table6').show();
                $w('#text21').show();
                $w('#saveNumIssuesPerFile').show(); // button5
                $w('#saveMainDevelopersButton').show();
            }
            if (selected_indices[i] === 5){
                $w('#text22').show();
                $w('#table3').show();
                $w('#table5').show();
                $w('#table7').show();
                $w('#table8').show();
                $w('#saveFrequentlyChangedButton').show(); // button6
                $w('#saveAverageTimeButton').show();
                $w('#saveAverageNumChange').show();
                $w('#saveAverageChangePerCommitutton').show();
            }

        }
    }); 
    
    $w('#button1').onClick((handler) => {
		wixLocation.to("/blank-1")
	})

    $w('#button4').onClick((handler) => {
        wixLocation.to("/blank-2")
    })
       
});

async function doSomething()
{
    wixLocation.to(wixLocation.url);
}
export async function searchButton_click(event) {
	//Add your code for this event here: 
    clear2();
    clear1(); 
    clear3();
    clear5();
    clear6();
    clear7();
    clear8();
    clear9();
    clear10();    
    
	let url = $w("#githubLink").value.toString();
    // let githubLinkObj = {
    //     "title": url,
    //     "otherPage" : "false"
    // }
    // wixData.insert("storeGithubLink",githubLinkObj);
    console.log(url);
	let owner, repoName;
    let counter = 1;
    let index1, index2, i;
    let someArray;
    let timeline;
    let commits;
    let lineChangesStats;
    let issues, closedIssues;
    let fileNamesRaw, fileNames;
    let fileNamesCounter;
    // obtain the name of the repo owner along with the repo's name
    for (i = url.length - 1 ;i >= 0; i --)
	{
        if (url[i] === "/" && counter === 1)
        {
            index1 = i + 1;
            repoName = url.substring(index1, url.length);
            counter ++;
        }
        else if (url[i] === "/" && counter === 2)
        {
            index2 = index1 - 1;   
            owner = url.substring(i + 1, index2);
            counter = 0;
        }
    
    }
    
    if (repoName.includes("."))
    {
        let removeCharIndex = repoName.indexOf(".");
        repoName = repoName.substring(0,removeCharIndex);
    }

	console.log("owner name:"+ owner +"\n"+"repo name:" + repoName);
    // rate_limit();
    $w("#text25").hide();
    $w("#text24").show();
    // TIMELINE WHEN WORK IS BEING CHECKED IN
    timeline = await getGithubMilestones(owner, repoName);
    extractDates(timeline);    

    // // console.log(timeline);
    commits = await getGithubCommits(owner,repoName);
    console.log(commits);
    // findind the sha for each commit*
    let commitShaArray = getEachCommitSha(commits);
    let frequentData = await extractFrequentlyChangedFiles(commitShaArray, owner, repoName);

    // MOST FREQUENTLY CHANGED FILES FOR EACH DEVELOPER
    let mostFrequentData = getMostFrequentlyChangedFile(frequentData);
    // console.log(mostFrequentData);
    let top3 = getTop3File(frequentData);
    // console.log(top3);

    // AVERAGE CHANGE PER DEVELOPER FOR TOP 3 MOST FREQUENTLY CHANGED FILES
    getAverageUpdate(top3, frequentData);
    let commitData = await getAllFilesAndChangesInCommits(commitShaArray, owner, repoName);
    // console.log(commitData);

    // AVERAGE LINES OF CODE CHANGE PER COMMIT FOR TOP 3 MOST FREQUENTLY CHANGED FILES
    getAverageLinesOfCodeChangePerCommit(commitData, top3);
    // console.log(top3);

    // AVERAGE TIME BETWEEN UPDATE FOR TOP 3 MOST FREQUENTLY CHANGED FILES
    calculateAverageTimeUpdate(frequentData);

    // PROPORTION OF LINES OF CODES EACH CONTRIBUTOR CHECKED IN
    lineChangesStats = await getLinesDeletedAdded(owner,repoName);
    extractLinesChanges(lineChangesStats);

    // AVERAGE TIME TO FIX OR CLOSE ISSUE + AVERAGE TIME TO RESPOND TO ISSUE DISCUSSION
    let timeToFix = await getTimeToFix(owner,repoName);
    extractTimeToFixAndRespond(timeToFix,owner,repoName);

    // NUMBER OF ISSUES RAISED PER CLASS/FILE AND MAIN DEVELOPERS WHO RESOLVED THE ISSUES
    fileNames = await extractFiles(commitShaArray, owner, repoName)
    console.log(fileNames);
    fileNamesCounter = [];
    for (let j = 0; j < fileNames.length; j+=1){
	    fileNamesCounter[j] = 0;
    }   
    issues = await getOpenIssues(owner, repoName);
    await checkOpenIssues(fileNames, issues, fileNamesCounter);
    closedIssues = await getClosedIssues(owner,repoName);
    await checkClosedIssues(fileNames, closedIssues, fileNamesCounter);
    extractIssuesPerFile(fileNames, fileNamesCounter);
    console.log(fileNames);
    console.log(fileNamesCounter);

    let mainDeveloperAndFreqList = await extractMainDeveloper(commitShaArray, owner, repoName);
    // // console.log(mainDeveloperAndFreqList);
    let mainDevelopers = getTopFiveDevelopers(mainDeveloperAndFreqList)
    // // console.log(mainDevelopers);

    $w("#dataset1").refresh()
    .then(()=>{
        $w("#dataset2").refresh()
        .then(()=>{
            $w("#dataset3").refresh()
            .then(()=>{
                $w("#dataset4").refresh()
                .then(()=>{
                    $w("#dataset5").refresh()
                    .then(()=>{
                        $w("#dataset6").refresh()
                        .then(()=>{
                            $w("#dataset7").refresh()
                            .then(()=>{
                                $w("#dataset8").refresh()
                                .then(()=>{
                                    $w("#table1").show();
                                    $w('#text16').show();
                                    $w('#text17').show();
                                    $w('#text18').show();
                                    $w('#text19').show();
                                    $w('#text20').show();
                                    $w('#text21').show();
                                    $w('#text22').show();
                                    $w("#table2").show();
                                    $w('#text23').show();
                                    $w("#table3").show();
                                    $w("#table4").show();
                                    $w("#table5").show();
                                    $w("#table6").show();
                                    $w("#table7").show();
                                    $w("#table8").show();
                                    $w("#text24").hide();
                                    $w("#text25").show();
                                    $w('#saveTimelineButton').show(); // button1
                                    $w('#saveLinesContributed').show(); // button2
                                    $w('#saveAveTimeCloseIssueButton').show(); // button3
                                    $w('#saveAveTimeRespondIssueButton').show(); // button4
                                    $w('#saveNumIssuesPerFile').show(); // button5
                                    $w('#saveFrequentlyChangedButton').show(); // button6
                                    $w('#saveAverageTimeButton').show();
                                    $w('#saveAverageNumChange').show();
                                    $w('#saveAverageChangePerCommitutton').show();
                                    $w('#checkboxGroup1').show();
                                    $w('#button1').show();
                                    $w('#button5').show();
                                    $w('#saveMainDevelopersButton').show();
                                    // wixLocation.to(wixLocation.url);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    // wixLocation.to(wixLocation.url);
    // .then(()=>{console.log("hello")});
    // doSomething()
}

function getTop3File(mostFreqFilesData)
{
    // let allDevNames = freqFilesData[0];
    // let allFilenames = freqFilesData[1];
    // let allFileChangeCount = freqFilesData[2];
    let mostFreqChangedFiles = mostFreqFilesData[3];
    let mostFreqChangedCount = mostFreqFilesData[5];

    console.log(mostFreqChangedFiles,mostFreqChangedCount);
    let top3MostChanged = [];
    let counter = 0;
    // finding the maximum file change count
    while (counter < 3)
    {
        let i;
        let maxChangeCount = mostFreqChangedCount[0];
        let maxChangeIndex = 0;
        for (i = 1 ; i < mostFreqChangedCount.length ; i += 1)
        {
            if (mostFreqChangedCount[i] > maxChangeCount)
            {
                maxChangeCount = mostFreqChangedCount[i];
                maxChangeIndex = i;
            }
        }
        
        if (!top3MostChanged.includes(mostFreqChangedFiles[maxChangeIndex]))
        {
            top3MostChanged.push(mostFreqChangedFiles[maxChangeIndex]);
            mostFreqChangedFiles.splice(maxChangeIndex,1);
            mostFreqChangedCount.splice(maxChangeIndex,1);
            counter += 1;
        }
      
    }
 
    return top3MostChanged;

}

function getAverageUpdate(top3MostChanged,frequentData)
{
    let allFileChangePerDev = frequentData[1];
    let allFileChangeCountPerDev = frequentData[2];
    let devCountPerFile = [0,0,0];
    let devChangeCountPerFile = [0,0,0];
    let counter = 0;
    while (counter < 3)
    {
        let i,j;
        for (i = 0 ; i < allFileChangePerDev.length ; i += 1)
        {
            for (j = 0 ; j < allFileChangePerDev[i].length ; j += 1)
            {
                if (top3MostChanged[counter] === allFileChangePerDev[i][j])
                {
                    // console.log("hey");
                    devChangeCountPerFile[counter] += allFileChangeCountPerDev[i][j];
                    devCountPerFile[counter] += 1;
                }
            }
        }
        counter += 1;
    }

    let k;
    let top3AverageChangePerDev = [];
    let averageChange;
    for (k = 0 ; k < devCountPerFile.length ; k += 1)
    {
        let averageChangePerDev = devChangeCountPerFile[k]/devCountPerFile[k];
        averageChange = {
            "title":top3MostChanged[k],
            "averageChangePerDeveloper": averageChangePerDev
        }
        wixData.insert("averageChangePerDev",averageChange);
        // top3AverageChangePerDev.push(averageChangePerDev);
    }
    // -----------
    // $w("#dataset7").refresh()
    // .then(() => {
    //     $w("#table7").show();
    // });
    // ---------------------
    console.log(devCountPerFile,devChangeCountPerFile);
    // console.log(top3AverageChangePerDev);

}

async function getAllFilesAndChangesInCommits(commitShaArray,ownerName,repoName)
{ 
    let allCommitFiles = [];
    let allCommitFilesChange = [];

    let i,j,sha,eachCommitFiles,eachCommitFilesChanges;
    for (i = 0 ; i < commitShaArray.length ; i += 1)
    {
        sha = commitShaArray[i];
        eachCommitFiles = [];
        eachCommitFilesChanges = [];
        let commitData = await getCommitURL(sha,ownerName,repoName);
        if (commitData && commitData.commit && commitData.files)
        {
            for(j = 0 ; j < commitData.files.length ; j += 1)
            {
                if (commitData.files[j].filename && commitData.files[j].changes)
                {
                    eachCommitFiles.push(commitData.files[j].filename);
                    eachCommitFilesChanges.push(commitData.files[j].changes);
                }
            }
            allCommitFiles.push(eachCommitFiles);
            allCommitFilesChange.push(eachCommitFilesChanges);
        }
    }
    console.log(allCommitFiles,allCommitFilesChange);
    return [allCommitFiles,allCommitFilesChange];
}

function getAverageLinesOfCodeChangePerCommit(commitData,top3MostChangedFiles)
{
    // console.log(commitData);
    let allCommitFiles = commitData[0];
    console.log(allCommitFiles);
    let allCommitFilesChange = commitData[1];
    let allCommitCount = [0,0,0];
    let allCommitChangesCount = [0,0,0];
    let counter = 0;
    let i,j,k;
    let averageCodeChangePerCommit = [];
    let averageCodeChange;
    while (counter < 3)
    {
        for (i = 0 ; i < allCommitFiles.length ; i += 1)
        {
            for (j = 0 ; j < allCommitFiles[i].length ; j += 1)
            {
                if (top3MostChangedFiles[counter] === allCommitFiles[i][j])
                {
                    allCommitCount[counter] += 1;
                    allCommitChangesCount[counter] += allCommitFilesChange[i][j];
                }
            }
        }
        counter += 1;
    }

    let averageCodeChangeObj;
    for (k = 0 ; k < allCommitCount.length ; k += 1)
    {
        averageCodeChange = allCommitChangesCount[k]/allCommitCount[k];
        averageCodeChangeObj = {
            "title": top3MostChangedFiles[k],
            "averageCodeChangePerCommit":averageCodeChange
        }
        // averageCodeChangePerCommit.push(averageCodeChange);
        wixData.insert("averageCodesChange",averageCodeChangeObj);
    }
    // ------------------------------
    // $w("#dataset8").refresh()
    // .then(() => {
    //     $w("#table8").show();
    // });
    // $w('#text22').show();
    // $w('#saveFrequentlyChangedButton').show();
    // ----------------------------------
    // console.log(averageCodeChangePerCommit);
    console.log(allCommitCount,allCommitChangesCount);
}
// just an example to get the necessary data from json 
function extractDates(timelineArray)
{
    let date = []; // to store the date where the work is checked in
    let title = []; // title of the work being checked in
    let update = [];
    let workDetails;
    let i;
    for (i = 0 ; i < timelineArray.length ; i+= 1)
    {
        workDetails = {
            "title": timelineArray[i].title,
            "startDate":timelineArray[i].created_at,
            "endDate":timelineArray[i].updated_at
        }
        wixData.insert("workTimeline",workDetails);
        // date.push(timelineArray[i].created_at);
        // title.push(timelineArray[i].title);
        // update.push(timelineArray[i].updated_at);
    }
    // -----------------------------
    // $w("#dataset2").refresh()
    // .then(() => {
    //     $w("#table2").show();
    //     $w('#text23').show();
    //     $w('#saveTimelineButton').show();
    // });
    // --------------------------

    // $w("#table2").show();
    // console.log(update);
    // console.log(date);
    // console.log(title);
}

// find the numbers of changes made by a contributor 
function extractLinesChanges(lineStatsArray)
{
    let i;
    let statsObj;
    let allData = [];
    for (i = 0 ; i < lineStatsArray.length ; i += 1)
    {
        statsObj = {
            "title" : lineStatsArray[i].author.login,
            "totalCodeChanged" : lineStatsArray[i].total
        }
        wixData.insert("codeChanged",statsObj);
        allData.push(statsObj);
    }
    console.log(allData);
    // ------------------------------
    // $w("#dataset1").refresh()
    // .then(() => {
    //     $w("#table1").show();
    // });
    // $w('#text16').show();
    // $w('#saveLinesContributed').show();
    // ----------------------------------
    // $w("#dataset1").onReady(()=>
    // {   $w("#dataset1").refresh()
    //     .then(() => {
    //     $w("#table1").show();
    //     });
    // });
    // $w("#table1").show();
    // console.log(allData);
    
}

function extractIssuesPerFile(fileNames, fileNameCounter)
{
    let issuesObj;
    for(let i = 0 ; i < fileNames.length ; i += 1){
        issuesObj = {
            "fileNames" : fileNames[i],
            "fileNameCounter": fileNameCounter[i]
        }
        wixData.insert("issuesPerFile", issuesObj);
    }
    // -----------------------------
    // $w("#dataset4").refresh()
    // .then(() => {
    //     $w("#table4").show();
    //     $w('#text21').show();
    //     $w('#saveNumIssuesPerFile').show();
    // });
    // ---------------------------------
}
async function extractFiles(commitShaArray,ownerName,repoName){
    let sha, commitData;
    let files, filename;
    let fileNamesArray=[];
    for(let i = 0; i < commitShaArray.length; i++ ) {
        sha = commitShaArray[i];
        commitData = await getCommitURL(sha, ownerName, repoName);
        if(commitData.files){
            files = commitData.files;
            for(let j = 0; j < files.length ; j++){
                if(files[j].filename){
                    filename = files[j].filename;
                    if(!fileNamesArray.includes(filename)){   // if filename not in array
                        fileNamesArray.push(filename);
                    }
                }
            }
        }
    }
    return fileNamesArray;
}

function isLetter(c) {
    if (!c) {
        return false;
    }
  return c.toLowerCase() != c.toUpperCase();
}

function comparingTextWithFileName(filenames, issueTitle, fileNamesCounter){
    issueTitle = issueTitle.split(" "); 
    for (let word = 0 ; word < issueTitle.length ; word++){
        let lastLetter =  issueTitle[word][issueTitle[word].length-1]
        if (!isLetter(lastLetter)){
            // remove the last letter if its not a letter
            issueTitle[word] = issueTitle[word].substring(0,(issueTitle[word].length - 1))
        }
        for(let j = 0; j < filenames.length ; j++){
            if(issueTitle[word].localeCompare(filenames[j]) === 0){
                fileNamesCounter[j]++;
            }
        }
    }
}
function checkOpenIssues(fileNames, issues, fileNamesCounter){
    // console.log("inside open issues");
    let issueTitle, issueBody;
    let i;
    for(i = 0; i < issues.length ; i+=1 )
    {
        if (issues[i].title){
           issueTitle = issues[i].title;
        //    console.log(issueTitle);           
           comparingTextWithFileName(fileNames, issueTitle, fileNamesCounter);
        }
        if (issues[i].body){
            issueBody = issues[i].body;
            // console.log(issueBody);
            comparingTextWithFileName(fileNames, issueBody, fileNamesCounter);
        }
    }
}
function checkClosedIssues(fileNames, closedIssues, fileNamesCounter){
    let i;
    let word;
    let issueTitle, issueBody;
    for( i = 0; i < closedIssues.length ; i+=1 )
    {
        if (closedIssues[i].issue){
            if (closedIssues[i].issue.title){
                issueTitle = closedIssues[i].issue.title;
                comparingTextWithFileName(fileNames, issueTitle, fileNamesCounter);
            }
            if (closedIssues[i].issue.body){
                issueBody = closedIssues[i].issue.body;
                comparingTextWithFileName(fileNames, issueBody, fileNamesCounter);
            }
        }        
    }
}

function extractNumberOfFiles(files)
{

}


// using the sha from each commit to find the most frequently changed files*
async function extractFrequentlyChangedFiles(commitShaArray,ownerName,repoName)
{
    let i, j, index, indexName, sha;
    let commitData;
    let namesArray = [], allFilenamesArray = [], allFileCount = [];
    let filenamesArray, fileCount, filename, files, authorName;

    let allTopFilenamesArray = [], allCommittedTimes = [], allFileChanges = [];
    let committedTimes, committerTime, fileChanges;

    // looping through an array of sha (sha from each commit)*
    for(i = 0; i < commitShaArray.length; i++ ) {
        sha = commitShaArray[i];
        // retrieving the commit data using the sha*
        commitData = await getCommitURL(sha, ownerName, repoName);

        if (commitData.commit && commitData.commit.author && commitData.commit.author.name && commitData.files && commitData.commit.committer && commitData.commit.committer.date) {
            files = commitData.files; // get the array of filenames for the files that have been changed in each commit*
            authorName = commitData.commit.author.name;
            committerTime = commitData.commit.committer.date;

            // Old name
            if (namesArray.includes(authorName)) {
                index = namesArray.indexOf(authorName); // finding the index of the dev name in namesArray who made the commit*

                filenamesArray = allFilenamesArray[index]; // array in a array. each array in the array correcponds to a dev*
                fileCount = allFileCount[index]; // an array of number of times the files has been changed corresponding to the dev's index in namesArray
            
                for ( j = 0; j < files.length; j ++ ) {
                    filename = files[j].filename;
                    fileChanges = files[j].changes;
                    if (fileChanges) {
                        if (filenamesArray.includes(filename))
                        {
                            indexName = filenamesArray.indexOf(filename);
                            fileCount[indexName] += fileChanges;
                        }
                        else{
                            filenamesArray.push(filename);
                            fileCount.push(fileChanges);
                        }
                    }
                }
                allFilenamesArray[index] = filenamesArray;
                allFileCount[index] = fileCount;
            }
            // New name 
            else{
                namesArray.push(authorName);

                filenamesArray = [];
                fileCount = [];
            
                // files = commitData.files;
                for ( j = 0; j < files.length; j ++ ) {
                    fileChanges = files[j].changes;
                    filename = files[j].filename;
                    if (fileChanges) {
                        filenamesArray.push(filename);
                        fileCount.push(fileChanges);
                    }

                }
                allFilenamesArray.push(filenamesArray);
                allFileCount.push(fileCount);
            }
            // console.log(namesArray, allFilenamesArray, allFileCount);

            for ( j = 0; j < files.length; j ++ ) {
                filename = files[j].filename;
                fileChanges = files[j].changes;
                if (fileChanges  && filename) {
                    // Old file name
                    if (allTopFilenamesArray.includes(filename)) {
                        index = allTopFilenamesArray.indexOf(filename);

                        committedTimes = allCommittedTimes[index];
                        committedTimes.push(committerTime);

                        allCommittedTimes[index] = committedTimes;
                        allFileChanges[index] = allFileChanges[index] + fileChanges;
                    }
                    else {
                        allTopFilenamesArray.push(filename);
                        committedTimes = [];
                        committedTimes.push(committerTime);

                        allCommittedTimes.push(committedTimes);
                        allFileChanges.push(fileChanges);
                    }

                    // console.log(allTopFilenamesArray, allCommittedTimes, allFileChanges);
                }
            }
        }
    }
    // namesArray: an array of the dev's name who have made changes to the fileCount*
    // allFilenamesArray : an array of array of filenames corresponds to the dev's index in namesArray*
    // allFileCount: an array of array of number of changes made to each file that corresponds to the dev's index in namesArray*
    // console.log(namesArray, allFilenamesArray, allFileCount, allTopFilenamesArray, allCommittedTimes, allFileChanges);
    return [namesArray, allFilenamesArray, allFileCount, allTopFilenamesArray, allCommittedTimes, allFileChanges]
}

function addingMainDevelopersToList(authorNameAndFreqList, authorName){
    if (authorNameAndFreqList.length === 0){
        authorNameAndFreqList.push([authorName, 1]);
    }
    else{
        for(let j = 0 ; j < authorNameAndFreqList.length ; j++){
            if(authorNameAndFreqList[j][0].localeCompare(authorName) === 0){
                authorNameAndFreqList[j][1]++;  // increment the frequency if same author
                break;
            }
            else{
                authorNameAndFreqList.push([authorName, 1]);
                break;
            }
        }   
    }
}
async function extractMainDeveloper(commitShaArray,ownerName,repoName){
    let sha, commitData;
    let authorName;
    let authorNameAndFreqList = [];     // position[0] is Name, [1] is Frequency
    // getting names from open issues
    for(let i = 0; i < commitShaArray.length; i++ ) {
        sha = commitShaArray[i];
        commitData = await getCommitURL(sha, ownerName, repoName);
        if(commitData.commit){
            if (commitData.commit.author) {
                if(commitData.commit.author.name){
                    authorName = commitData.commit.author.name;
                    addingMainDevelopersToList(authorNameAndFreqList, authorName);
                }
            }
        }  
    }
    // getting the names from closed issues
    let closedIssues = await getClosedIssues(ownerName,repoName);
    for(let i = 0 ; i < closedIssues.length ; i++){
        if(closedIssues[i]){
            if(closedIssues[i].user){
                if(closedIssues[i].user.login){
                    authorName = closedIssues[i].user.login;
                    addingMainDevelopersToList(authorNameAndFreqList, authorName);
                }
            }
        }
    }
    return authorNameAndFreqList;
}

function getTopFiveDevelopers(mainDeveloperAndFreqList){
    let topFiveDevelopers = []
    if(mainDeveloperAndFreqList.length < 5){
        for(let i = 0; i < mainDeveloperAndFreqList.length; i++){
            topFiveDevelopers.push(mainDeveloperAndFreqList[i][0]);
        }
    }
    else{
        for(let i = 0;i < 5; i++){
            let positionToDelete;
            let topDeveloper = ["Bob", 0];  // initial min value to find max
            for(let j = 0; j<mainDeveloperAndFreqList.length ; j++){
                if(mainDeveloperAndFreqList[j][1] > topDeveloper[1]){
                    topDeveloper = mainDeveloperAndFreqList[j];
                    positionToDelete = j;
                }
            }
            topFiveDevelopers.push(topDeveloper[0]);
            mainDeveloperAndFreqList.splice(positionToDelete, 1);
        }        
    }

    let developersObj;
    for(let i = 0 ; i < topFiveDevelopers.length ; i += 1){
        developersObj = {
            "topFiveDevelopers" : topFiveDevelopers[i]
        }
        wixData.insert("mainDevelopers", developersObj);
    }
    // --------------------------------
    // $w("#dataset6").refresh()
    // .then(() => {
    //     $w("#table6").show();
    // });
    // $w('#text21').show();
    // $w('#saveNumIssuesPerFile').show();
    // $w('#checkboxGroup1').show();
    // $w('#button1').show();
    // ------------------------------
    return topFiveDevelopers;
}

function getMostFrequentlyChangedFile(frequentlyChangedData) {
    console.log(frequentlyChangedData)
    let allNames = frequentlyChangedData[0];
    let allFilenames = frequentlyChangedData[1];
    let allFileChanges = frequentlyChangedData[2];

    let mostFrequentFilenames =[];
    let mostFrequentCount = [];
    let i, j, highestLineChanges;

    for (i = 0; i < allNames.length; i++) {
        highestLineChanges = allFileChanges[i][0];
        mostFrequentFilenames.push(allFilenames[i][0]);

        for(j = 1; j < allFileChanges.length; j++) {
            if (allFileChanges[i][j] > highestLineChanges) {
                highestLineChanges = allFileChanges[i][j];
                mostFrequentFilenames[i] = allFilenames[i][j];
            }
        }
        mostFrequentCount.push(highestLineChanges);
    }
    // console.log(allNames, mostFrequentFilenames);

    let dataObj;
    for(i = 0; i < allNames.length; i++) {
        dataObj = {
            "title" : allNames[i],
            "filenames" : mostFrequentFilenames[i]
        }
        wixData.insert("frequentlyChangedFile", dataObj);
    }
    // ------------------------
    // $w("#dataset3").refresh()
    // .then(() => {
    //     $w("#table3").show();
    // });
    // ---------------------------
    return [allNames,mostFrequentFilenames,mostFrequentCount];
}

function getFilename(filenamePath) {
    let i;
    for (i = filenamePath.length - 1; i >= 0 ; i--) {
        if (filenamePath[i] === "/")
        {
            return filenamePath.substring(i + 1, filenamePath.length )
        }
    }
}

function getEachCommitSha(commitsArray)
{
    let i;
    let shaArray = [];
    let commitSha;
    for (i = 0 ; i < commitsArray.length ; i ++)
    {
        commitSha = commitsArray[i].sha;
        shaArray.push(commitSha);
    }

    return shaArray
}


function calculateAverageTimeUpdate(averageTimeData) {
    console.log(averageTimeData);
    let allFilenamesArray = averageTimeData[3];
    let allCommittedTimes = averageTimeData[4];
    let allFileChanges = averageTimeData[5];

    let highestChange = allFileChanges[0];
    let mostFreqFilenames = [allFilenamesArray[0]], mostFreqFilesTimes = [allCommittedTimes[0]] ;
    let i = 1, index = 0;

    let highestIndex = 0, mostIndex = 1;
    while (mostIndex < 3){

        if (allFileChanges[i] > highestChange) {

            highestChange = allFileChanges[i];
            mostFreqFilenames[index] = allFilenamesArray[i];
            mostFreqFilesTimes[index] = allCommittedTimes[i];
            highestIndex = i;
        }

        i += 1;

        if (i === allFilenamesArray.length) {

            mostFreqFilenames.push(allFilenamesArray[0]);
            mostFreqFilesTimes.push(allCommittedTimes[0])
            highestChange = allFileChanges[0];

            allFilenamesArray.splice(highestIndex,1);
            allCommittedTimes.splice(highestIndex, 1);
            allFileChanges.splice(highestIndex, 1);

            index += 1;
            highestIndex = 0;
            i = 1;
            mostIndex += 1;
        }        
    }

    // console.log(mostFreqFilenames, mostFreqFilesTimes);

    let averageTime = [];
    let average, freqFileTimes, j;

    for (i =0; i < mostFreqFilenames.length; i++) {
        freqFileTimes = mostFreqFilesTimes[i];
        average = 0;

        if (freqFileTimes.length === 1) {
            averageTime.push(average.toString());
        }
        else {
            for(j = 0; j < freqFileTimes.length; j ++) {
                average += getTimeInSeconds(freqFileTimes[j]);
            }
            average = (average/freqFileTimes.length) - getTimeInSeconds(freqFileTimes[freqFileTimes.length-1]);

            averageTime.push(average.toString());
        }
    }

    // console.log(mostFreqFilenames,averageTime);

    let updateTimeObj;
    for( i = 0 ; i < mostFreqFilenames.length ; i ++){
        updateTimeObj = {
            "title" : mostFreqFilenames[i],
            "averageTimeBetweenUpdate": averageTime[i]
        }
        wixData.insert("averageTimeUpdate", updateTimeObj);
    }
    // ------------------
    // $w("#dataset5").refresh()
    // .then(() => {
    //     $w("#table5").show();
    // });
    // -------------------------
    return [mostFreqFilenames, averageTime]
}

async function extractTimeToFixAndRespond(timeArray,owner,repoName)
{
    let i;
    let count_close = 0;
    let count_responds = 0;
    let timeCreated;
    let timeClosed;
    let total_time_to_close = 0;
    let total_time_to_respond = 0;

    for (i = 0 ; i < timeArray.length ; i += 1)
    {
        timeCreated = getTimeInSeconds(timeArray[i].issue.created_at);

        if (timeArray[i].issue.closed_at === null)
        {
            continue;
        }
        else
        {
            timeClosed = getTimeInSeconds(timeArray[i].issue.closed_at);
            total_time_to_close += timeClosed - timeCreated;
            count_close += 1;
        }

        let respondTime = await getTimeToRespondToIssue(owner,repoName,timeArray[i].issue.number)
        for (let j=0 ; j<respondTime.length  ;j+=1){
            count_responds += 1;
            total_time_to_respond += getTimeInSeconds(respondTime[j].created_at) -  timeCreated;
        }
    }

    let closeIssues,respondDiscussion,toInsert;
    if (count_close > 0){
        closeIssues = Math.floor((total_time_to_close/60)/count_close).toString() + " minutes";        
        $w('#text18').text = Math.floor((total_time_to_close/60)/count_close).toString() + " minutes";
        $w('#text17').expand();
        $w('#text18').expand();
        $w('#saveAveTimeCloseIssueButton').show();
    }
    else{
        closeIssues = "0";
        $w('#text18').text = "0";
        $w('#text17').expand();
        $w('#text18').expand();
        $w('#saveAveTimeCloseIssueButton').show();
    }

    if (count_responds > 0){
        respondDiscussion = Math.floor((total_time_to_respond/60)/count_responds).toString() + " minutes";
        $w('#text20').text = Math.floor((total_time_to_respond/60)/count_responds).toString() + " minutes";
        $w('#text19').expand();
        $w('#text20').expand();
        $w('#saveAveTimeRespondIssueButton').show();
    }
    else{
        respondDiscussion = "0";
        $w('#text20').text = "0";
        $w('#text19').expand();
        $w('#text20').expand();
        $w('#saveAveTimeCloseIssueButton').show();
    }

    let url = $w("#githubLink").value.toString();
    let githubLinkObj = {
        "title": url,
        "otherPage" : "false",
        "closeIssues": closeIssues,
        "respondDiscussion":respondDiscussion
    }
    wixData.insert("storeGithubLink",githubLinkObj);
    // wixData.insert("storeGithubLink",toInsert);
}

function clear1() {
    wixData.query("codeChanged")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems1(results.items);
        // console.log(removeItems);
});
}

async function removeItems1(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("codeChanged", items[i]._id);
    });
}

function clear2() {
    wixData.query("workTimeline")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems2(results.items);
});
}

async function removeItems2(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("workTimeline", items[i]._id);
    });
}

function clear3() {
    wixData.query("frequentlyChangedFile")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems3(results.items);
});
}

async function removeItems3(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("frequentlyChangedFile", items[i]._id);
    });
}

function clear5() {
    wixData.query("averageTimeUpdate")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems5(results.items);
});
}

async function removeItems5(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("averageTimeUpdate", items[i]._id);
    });
}

function clear6() {
    wixData.query("averageChangePerDev")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems6(results.items);
});
}

async function removeItems6(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("averageChangePerDev", items[i]._id);
    });
}

function clear7() {
    wixData.query("averageCodesChange")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems7(results.items);
});
}

async function removeItems7(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("averageCodesChange", items[i]._id);
    });
}

function clear8() {
    wixData.query("storeGithubLink")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems8(results.items);
});
}

async function removeItems8(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("storeGithubLink", items[i]._id);
    });
}

function clear9() {
    wixData.query("issuesPerFile")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems9(results.items);
});
}

async function removeItems9(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("issuesPerFile", items[i]._id);
    });
}

function clear10() {
    wixData.query("mainDevelopers")
    .limit(1000)
    .find()
    .then((results) => {
      removeItems10(results.items);
});
}

async function removeItems10(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("mainDevelopers", items[i]._id);
    });
}

function clear11() {
    wixData.query("saveDetails")
    .find()
    .then((results) => {
      removeItems11(results.items);
});
}

async function removeItems11(items) {
 await items.forEach(async (item, i) => {
 await wixData.remove("saveDetails", items[i]._id);
    });
}

function getTimeInSeconds(timeString){
    let year = Number(timeString.substring(0,4));
    let month = Number(timeString.substring(5,7));
    let date = Number(timeString.substring(8,10));
    let hours = Number(timeString.substring(11,13));
    let minutes = Number(timeString.substring(14,16));
    let seconds = Number(timeString.substring(17,19));

    let total_seconds = ((year-2000)*31556926) + (month)*2629743 + (date)*86400 + (hours)*3600 + (minutes)*60 + seconds;

    return total_seconds;
}
async function saveDataDetails(){
    clear11();  // clear saveDetails database
    // storing all the user and date details into the database
    let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let dateTime = date+' '+time;
	let currentUser = wixUsers.currentUser;    
    currentUser.getEmail()
    .then( (email) => {
        let saveDetailsObj = {
            "title": dateTime,
            "savedUser" : email
        }
        wixData.insert("saveDetails", saveDetailsObj);
    } );
}

async function saveData (database, tableNo) {
    let savedData;
    let savedDataIds = [];
	//Add your code for this event here: 
    // Getting the data
    await wixData.query(database)
    .find()
    .then( (results) =>{
        savedData = results.items;
        console.log(savedData);
    });
    // Finding the all the old saved data ids
    await wixData.query("savedData")
    .limit(1000)
    .find()
    .then( (results) =>{
        results = results.items;
        for(let i =0 ; i < results.length ; i++){
            savedDataIds.push(results[i]._id);
        }
    });

    // Removing all the old saved data
    await wixData.bulkRemove("savedData", savedDataIds)
    .then( (results) => {
        console.log(results)
    } )
    .catch( (err) => {
    let errorMsg = err;
     } );

    // storing which table that was saved
    let tableNoObj = {
            "tableNumber" : "0"+tableNo
        }
    await wixData.insert("savedData", tableNoObj);

    // Add the new saved data
    wixData.bulkInsert("savedData", savedData)
    .then((results) => {
        let item = results; //see item below
        console.log(item);
    } )
    .catch( (err) => {
        let errorMsg = err;
    } );

    saveDataDetails();
}

export async function saveLinesContributed_click(event) {
    saveData("codeChanged", 1);   
}

export function saveTimelineButton_click(event) {
	saveData("workTimeline", 2);
}

export async function saveAveTimeCloseIssueButton_click(event) {
    let savedData = $w('#text18').text;
    let savedDataIds = [];

    // Finding the all the old saved data ids
    await wixData.query("savedData")
    .find()
    .then( (results) =>{
        results = results.items;
        for(let i =0 ; i < results.length ; i++){
            savedDataIds.push(results[i]._id);
        }
    });

    // Removing all the old saved data
    await wixData.bulkRemove("savedData", savedDataIds)
    .then( (results) => {
        console.log(results)
    } )
    .catch( (err) => {
    let errorMsg = err;
     } );

    // storing which table that was saved
    let tableNo = 3;
    let tableNoObj = {
            "tableNumber" : tableNo
        }
    await wixData.insert("savedData", tableNoObj);

    let dataObj;
    dataObj = {
        "title" : savedData
    }
    wixData.insert("savedData", dataObj);
    saveDataDetails();
}

export async function saveAveTimeRespondIssueButton_click(event) {
	let savedData = $w('#text20').text;
    let savedDataIds = [];

    // Finding the all the old saved data ids
    await wixData.query("savedData")
    .find()
    .then( (results) =>{
        results = results.items;
        for(let i =0 ; i < results.length ; i++){
            savedDataIds.push(results[i]._id);
        }
    });

    // Removing all the old saved data
    await wixData.bulkRemove("savedData", savedDataIds)
    .then( (results) => {
        console.log(results)
    } )
    .catch( (err) => {
    let errorMsg = err;
     } );
    // storing which table that was saved
    let tableNo = 4;
    let tableNoObj = {
            "tableNumber" : tableNo
        }
    await wixData.insert("savedData", tableNoObj);

    let dataObj;
    dataObj = {
        "title" : savedData
    }
    wixData.insert("savedData", dataObj);
    saveDataDetails();    
}

export function saveNumIssuesPerFile_click(event) {
	saveData("issuesPerFile", 5);
}

export function saveMainDevelopersButton_click(event) {
    saveData("mainDevelopers", 6);    
}

export function saveFrequentlyChangedButton_click(event) {
	saveData("frequentlyChangedFile", 7);
}

export function saveAverageTimeButton_click(event) {
	saveData("averageTimeUpdate", 8);
}

export function saveAverageNumChange_click(event) {
	saveData("averageChangePerDev", 9);
}

export function saveAverageChangePerCommitutton_click(event) {
	saveData("averageCodesChange", 10);
}

export function codeChanged_click_1(event) {
	//Add your code for this event here: 
    saveData("codeChanged", 11);
}

export function saveAveChangesPerDevPie_click(event) {
	//Add your code for this event here:
    saveData("averageChangePerDev", 12); 
}
export function saveAveChangePerCommitPie_click(event) {
	//Add your code for this event here: 
   	saveData("averageCodesChange", 13);
}
export function saveIssuesPieButton_click(event) {
	//Add your code for this event here: 
	saveData("issuesPerFile", 14);
}
export function saveLinesTPButton_click(event) {
	//Add your code for this event here: 
    saveData("codeChanged", 15);   
}
export function saveIssuesTPButton_click(event) {
	//Add your code for this event here: 
    saveData("issuesPerFile", 16);
}
export function saveAveChangesPerDevTP_click(event) {
	//Add your code for this event here: 
    saveData("averageChangePerDev", 17);
}
export function saveAveChangePerCommitTPButton_click(event) {
	//Add your code for this event here:
    saveData("averageChangePerDev", 18); 
}

let color = [
'rgba(255, 204, 204)', //
'rgba(255, 204, 153)',
'rgba(255, 255, 204)',
'rgba(204, 255, 204)',
'rgba(204, 255, 255)',
'rgba(204, 204, 255)',
'rgba(255, 204, 255)',

'rgba(255, 205, 210 )', //
'rgba(255, 243, 224 )',
'rgba(255, 253, 231 )',
'rgba(232, 245, 233)',
'rgba(227, 242, 253 )',
'rgba(232, 234, 246)',
'rgba(252, 228, 236)',

'rgba(239, 154, 154 )', //
'rgba(255, 204, 128)',
'rgba(255, 245, 157 )',
'rgba(197, 225, 165)',
'rgba(129, 212, 250 )',
'rgba(179, 157, 219)',
'rgba(244, 143, 177 )',

'rgba(239, 83, 80)',//
'rgba(255, 167, 38 )',
'rgba(255, 238, 88)',
'rgba(156, 204, 101 )',
'rgba(66, 165, 245)',
'rgba(126, 87, 194)',
'rgba(236, 64, 122)',

'rgba(183, 28, 28)', //
'rgba(230, 81, 0)',
'rgba(253, 216, 53)',
'rgba(27, 94, 32)',
'rgba(26, 35, 126)',
'rgba(74, 20, 140)',
'rgba(173, 20, 87 )',

'rgba(255,0,0)', // red
'rgba(255,165,0)', // orange
'rgba(255,255,0)', // yellow
'rgba(0,0,255)', // green
'rgba(0,255,0)', // blue
'rgba(128,0,128)', // purple
'rgba(255,20,147)', // deep pink 

'rgba(128,0,0)', //
'rgba(255,69,0)',
'rgba(230, 230, 0)',
'rgba(0,100,0)',
'rgba(25,25,112)',
'rgba(72,61,139)',
'rgba(179, 0, 134)'
];




