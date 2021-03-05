// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(function () {
	$w('#button6').onClick((handler) => {
		$w('#text16').hide()
		$w('#text17').hide()
		$w('#text18').hide()
		$w('#text19').hide()
		let email = $w('#input1').value
		let pass1 = $w('#input2').value
		let pass2 = $w('#input3').value
		wixData.query("WixLogin")
			.eq("email", email)
			.find()
			.then((result) => {
				if(result.items.length>0){
					$w('#text19').show()
				}
				else {
					wixData.query("authorisedUsers")
					.eq("email", email)
					.find()
					.then((results) => {
						if(results.items.length > 0) {
							if (pass1 === pass2){
								wixUsers.register(email, pass1)
								.then(() =>{
									let userID = wixUsers.currentUser.id
									let toInsert = {
										"email":	email ,
										"id":		userID
									}
									wixData.insert("WixLogin", toInsert)
									.then(()=>{
										$w('#text18').show()
									})
								})
							}
							else {
								$w('#text17').show()
							}
						} 
						else {
							$w('#text16').show()
						}
					})
				}
			})
	})

	$w('#button5').onClick((handler) =>{
		wixLocation.to("https://teamfloatingnumber.wixsite.com/website")
	})
	//TODO: write your page related code here...

});