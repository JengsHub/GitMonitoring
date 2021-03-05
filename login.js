// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users'
import wixData from 'wix-data'
import wixLocation from 'wix-location'

// wixUsers.register("jengyue96@gmail.com", "abcd1234")
// let userID = wixUsers.currentUser.id
// let toInsert = {
// 	"email":	"jengyue96@gmail.com",
// 	"id":		userID
// }
// wixData.insert("WixLogin", toInsert)
// .then ((results) => {
// 		let item = results; //see item below
// 		console.log(item)
// 	} )
	
$w.onReady(function () {
	
	$w('#button2').onClick((handler) => {
		let username = $w('#input1').value
		let password = $w('#input2').value
		wixUsers.login(username, password)
		.then(() =>{
			wixLocation.to("/home-1")
		})
		.catch((err) => {
			$w('#text16').expand()
            $w('#button3').expand()
		})
	})

    $w('#button3').onClick((handler) => {
        wixUsers.promptForgotPassword();

    })
});