// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(async function () {
	//TODO: write your page related code here...
	displayCodeChanged();	
	displayAverageChangePerDev();
	displayAverageCodesChange();
	displayIssuePerFile();
	await wixData.query("saveDetails")
    .find()
    .then( (results) =>{
        results = results.items;
		console.log(results);
		$w("#text23").text = results[0].title;
		$w("#text24").text = results[0].currentUser;
    });

	$w("#table1").hide();
	$w("#table2").hide();
	$w("#table5").hide();
	$w("#table6").hide();
	$w("#table7").hide();
	$w("#table8").hide();
	$w("#table9").hide();
	$w("#table10").hide();
	$w("#text1").hide();
	$w("#text2").hide();
	$w("#text3").hide();
	$w("#text4").hide();
	$w("#table11").hide();
	$w("#table12").hide();
	$w("#table13").hide();
	$w("#table14").hide();
	$w("#viewPieChart").hide();
	$w("#viewTableButton").hide();

	let savedTableNo;

	await wixData.query("savedData")
    .startsWith("tableNumber", "0")
    .find()
    .then( (results) =>{
        results = results.items;
		savedTableNo = results[0].tableNumber;
		savedTableNo = savedTableNo.substring(1);
		console.log(savedTableNo);
    });
	
	if (savedTableNo === "3"){
		$w("#text1").show();
		$w("#text2").show();
	}
	else if(savedTableNo === "4"){
		$w("#text3").show();
		$w("#text4").show();
	}
	else{
		if (savedTableNo === "1" || savedTableNo === "5" || savedTableNo === "9" || savedTableNo === "10")
		{
			$w("#viewPieChart").show();
		}
		else if (savedTableNo === "11" || savedTableNo === "12" || savedTableNo === "13" || savedTableNo === "14")
		{
			$w("#viewTableButton").show();
		}
		$w("#table"+savedTableNo).show();
	}
	
});

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
'rgba(0,0,255)' , // green
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

async function displayCodeChanged() {
	let codeChangedData = await getCodeChangedData();
	// console.log(codeChangedData);
	$w("#table11").postMessage(codeChangedData);
}

async function getCodeChangedData() {
	let codeChangedData;
	await wixData.query("savedData")
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
	$w("#table12").postMessage(averageChangePerDevData);
}

async function getAverageChangePerDevData() {
	let averageChangedPerDevloperData;
	await wixData.query("savedData")
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
	$w("#table13").postMessage(averageCodesChangeData);
}

async function getAverageCodesChangeData() {
	let averageCodesChangeData;
	await wixData.query("savedData")
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
	$w("#table14").postMessage(issuePerFileData);
}

async function getIssuePerFileData() {
	let issuePerFileData;
	await wixData.query("savedData")
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



export async function viewTableButton_click(event) {
	//Add your code for this event here: 
	let savedTableNo;
	let id;
	await wixData.query("savedData")
    .startsWith("tableNumber", "0")
    .find()
    .then( (results) =>{
        results = results.items;
		savedTableNo = results[0].tableNumber;
		id = results[0]._id;
		savedTableNo = savedTableNo.substring(1);
		console.log("The saved table no is: " + savedTableNo);
    });
	
	let newTableNumber;

	if (savedTableNo === "11")
	{
		newTableNumber = "1";
	}
	else if (savedTableNo === "12")
	{
		newTableNumber = "9";
	}
	else if (savedTableNo === "13")
	{
		newTableNumber = "10";
	}
	else if (savedTableNo === "14")
	{
		newTableNumber = "5";
	}

	// newTableNumber = "0" + newTableNumber;
	let toUpdate = {
		"_id" : id,
		"tableNumber" : "0" + newTableNumber
	}
	wixData.update("savedData",toUpdate)
	.then(()=>{
		console.log("to show is:" + newTableNumber);
		$w("#table"+savedTableNo).hide();
		$w("#table"+newTableNumber).show();
		$w("#viewPieChart").show();
		$w("#viewTableButton").hide();
	});
}

export async function viewPieChart_click(event) {
	//Add your code for this event here: 
	let savedTableNo;
	let id;
	await wixData.query("savedData")
    .startsWith("tableNumber", "0")
    .find()
    .then( (results) =>{
        results = results.items;
		savedTableNo = results[0].tableNumber;
		id = results[0]._id;
		savedTableNo = savedTableNo.substring(1);
		console.log("The saved table no is: " + savedTableNo);
    });

	let newTableNumber;

	if (savedTableNo === "1")
	{
		newTableNumber = "11";
	}
	else if (savedTableNo === "9")
	{
		newTableNumber = "12";
	}
	else if (savedTableNo === "10")
	{
		newTableNumber = "13";
	}
	else if (savedTableNo === "5")
	{
		newTableNumber = "14";
	}

	// newTableNumber = "0" + newTableNumber;
	let toUpdate = {
		"_id" : id,
		"tableNumber" : "0" + newTableNumber
	}
	wixData.update("savedData",toUpdate)
	.then(()=>{
		console.log("to show is:" + newTableNumber);
		$w("#table"+savedTableNo).hide();
		$w("#table"+newTableNumber).show();
		$w("#viewPieChart").hide();
		$w("#viewTableButton").show();
	});

}