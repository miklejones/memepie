var poolData = {
    UserPoolId : 'us-east-2_Bk7BqXn1v', // your user pool id here
    ClientId : '3hklqgfcuo243b802sk4fvv9pb' // your app client id here
};
var userPool = 
new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : 'MLM', // your username here
    Pool : userPool
};




var attributeList = [];
 
var dataEmail = {
    Name : 'email',
    Value : '...' // your email here
};
// var dataPhoneNumber = {
//     Name : 'phone_number',
//     Value : '...' // your phone number here with +country code and no delimiters in front
// };
var attributeEmail = 
new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
// var attributePhoneNumber = 
// new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
 
attributeList.push(attributeEmail);
// attributeList.push(attributePhoneNumber);
 
var cognitoUser;
userPool.signUp('username', 'password', attributeList, null, function(err, result){
    if (err) {
        alert(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
});





var authenticationData = {
    Username : '...', // your username here
    Password : '...', // your password here
};
var authenticationDetails = 
new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

var cognitoUser = 
new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
    },

    onFailure: function(err) {
        alert(err);
    },
    mfaRequired: function(codeDeliveryDetails) {
        var verificationCode = prompt('Please input verification code' ,'');
        cognitoUser.sendMFACode(verificationCode, this);
    }
});



// Forgotten Password flow

cognitoUser.forgotPassword({
    onSuccess: function (result) {
        console.log('call result: ' + result);
    },
    onFailure: function(err) {
        alert(err);
    },
    inputVerificationCode() {
        var verificationCode = prompt('Please input verification code ' ,'');
        var newPassword = prompt('Enter new password ' ,'');
        cognitoUser.confirmPassword(verificationCode, newPassword, this);
    }
});

/////////////////////////////

