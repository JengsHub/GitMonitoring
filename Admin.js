// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixLocation from 'wix-location';
import wixData from 'wix-data';


$w.onReady(function () {
	//TODO: write your page related code here...
	$w('#button5').onClick((handler) =>{
		wixLocation.to("/home-1")
	})
	$w('#button6').onClick((handler) => {
		let email = $w('#input1').value
		$w('#text16').hide()

		let toInsert = {
			"email":email
		}
		wixData.insert("authorisedUsers", toInsert)
		.then((results) =>{
			console.log(results)
			$w('#text16').show()
		})
	})
});