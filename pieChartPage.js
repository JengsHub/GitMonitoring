// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixUsers from 'wix-users';

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


$w.onReady(() =>{
	displayCodeChanged();
	displayAverageChangePerDev();
	displayAverageCodesChange();
	displayIssuePerFile()

	$w('#button1').onClick((handler) => {
		wixData.query("storeGithubLink")
        .find()
        .then((results) =>{
            if (results.items.length > 0)
			{
				let linkID = results.items[0]._id;
				let url = results.items[0].title;
				let closeIssues = results.items[0].closeIssues;
				let respondDiscussion = results.items[0].respondDiscussion;
				let toUpdate = {
					"_id" : linkID,
					"title": url,
					"otherPage" : "true",
					"closeIssues" : closeIssues,
					"respondDiscussion" : respondDiscussion
				}
				wixData.update("storeGithubLink",toUpdate)
				.then(()=>{
					wixLocation.to("/home-1");
				});
			}
        });
		// wixLocation.to("/home-1");
	})
	// $w('#button2').onClick((handler) => {
	// 	saveData("codeChanged", 11);
	// })


	$w('#checkboxGroup1').onChange(() => {
		$w('#html1').hide();
		$w('#html2').hide();
		$w('#html3').hide();
		$w('#html4').hide();
		$w('#text16').hide();
		$w('#text17').hide();
		$w('#text18').hide();
		$w('#text19').hide();

		let selected_indices = $w('#checkboxGroup1').selectedIndices;

		for(let i = 0 ; i<selected_indices.length;i++){
			if(selected_indices[i]===0){
				$w('#html1').show();
				$w('#text16').show();
			}
			if(selected_indices[i]===1){
				$w('#html2').show();
				$w('#text17').show();
			}
			if(selected_indices[i]===2){
				$w('#html3').show();
				$w('#text18').show();
			}
			if(selected_indices[i]===3){
				$w('#html4').show();
				$w('#text19').show();
			}
		}

	})
	
});

async function displayCodeChanged() {
	let codeChangedData = await getCodeChangedData();
	// console.log(codeChangedData);
	$w("#html1").postMessage(codeChangedData);
}

async function getCodeChangedData() {
	let codeChangedData;
	await wixData.query("codeChanged")
	.find()
	.then( (results) => {
	let codeChangedObj = results.items;
	let i;
	let developerName = [];
	let totalCodeChanged = [];
	let colours = [];
	for (i = 0; i < codeChangedObj.length; i++) {
		developerName.push(codeChangedObj[i].title);
		totalCodeChanged.push(codeChangedObj[i].totalCodeChanged);
		colours.push(color[i]);
	}
	codeChangedData= [developerName, totalCodeChanged, colours];
	console.log(codeChangedData);
  	} );

	return codeChangedData
}


async function displayAverageChangePerDev() {
	let averageChangePerDevData = await getAverageChangePerDevData();
	// console.log(codeChangedData);
	$w("#html2").postMessage(averageChangePerDevData);
}

async function getAverageChangePerDevData() {
	let averageChangedPerDevloperData;
	await wixData.query("averageChangePerDev")
	.find()
	.then( (results) => {
	let averageChangedPerDevObj = results.items;
	let i;
	let mostFrequentFile = [];
	let averageChangedPerDevloper = [];
	let colours = [];
	for (i = 0; i < averageChangedPerDevObj.length; i++) {
		mostFrequentFile.push(averageChangedPerDevObj[i].title);
		averageChangedPerDevloper.push(averageChangedPerDevObj[i].averageChangePerDeveloper);
		colours.push(color[i]);
	}
	averageChangedPerDevloperData= [mostFrequentFile, averageChangedPerDevloper, colours];
	console.log(averageChangedPerDevloperData);
  	} );

	return averageChangedPerDevloperData
}

async function displayAverageCodesChange() {
	let averageCodesChangeData = await getAverageCodesChangeData();
	// console.log(codeChangedData);
	$w("#html3").postMessage(averageCodesChangeData);
}

async function getAverageCodesChangeData() {
	let averageCodesChangeData;
	await wixData.query("averageCodesChange")
	.find()
	.then( (results) => {
	let averageChangedPerDevObj = results.items;
	let i;
	let mostFrequentFiles = [];
	let averageCodeChangePerCommit = [];
	let colours = [];
	for (i = 0; i < averageChangedPerDevObj.length; i++) {
		mostFrequentFiles.push(averageChangedPerDevObj[i].title);
		averageCodeChangePerCommit.push(averageChangedPerDevObj[i].averageCodeChangePerCommit);
		colours.push(color[i]);
	}
	averageCodesChangeData= [mostFrequentFiles, averageCodeChangePerCommit,colours];
	console.log(averageCodesChangeData);
  	} );

	return averageCodesChangeData
}

async function displayIssuePerFile() {
	let issuePerFileData = await getIssuePerFileData();
	// console.log(codeChangedData);
	$w("#html4").postMessage(issuePerFileData);
}

async function getIssuePerFileData() {
	let issuePerFileData;
	await wixData.query("issuesPerFile")
	.find()
	.then( (results) => {
	let issuePerFileObj = results.items;
	let i;
	let fileNames = [];
	let fileNamesCounter = [];
	let colours = [];
	for (i = 0; i < issuePerFileObj.length; i++) {
		fileNames.push(issuePerFileObj[i].fileNames);
		fileNamesCounter.push(issuePerFileObj[i].fileNamesCounter);
		colours.push(color[i]);
	}
	issuePerFileData= [fileNames, fileNamesCounter, colours];
	console.log(issuePerFileData);
  	} );

	return issuePerFileData
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
            "currentUser" : email
        }
        wixData.insert("saveDetails", saveDetailsObj);
    } );
}

async function saveData (database, tableNo) {
	// console.log("meow");
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





export function codeChanged_click(event) {
	//Add your code for this event here: 
	saveData("codeChanged", 11);
}

export function averageChangePerDev_click(event) {
	//Add your code for this event here: 
	saveData("averageChangePerDev", 12);
}



export function averageCodesChanged_click(event) {
	//Add your code for this event here: 
	saveData("averageCodesChange", 13);
}

export function issuesPerFile_click(event) {
	//Add your code for this event here: 
	saveData("issuesPerFile", 14);
}