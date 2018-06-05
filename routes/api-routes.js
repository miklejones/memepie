const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const express = require("express");
const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
const aws_secret_access_key = process.env.AWS_SECRET_access_KEY;


// Import the AWS SDK
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// Set credentials and region
// This can also be done directly on the service client
AWS.config.update({ region: 'us-east-2', credentials: { aws_access_key_id } });


// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:25744f84-733f-46bb-bc15-7c143d3c89e6',
});


// Create a bucket and upload something into it
var bucketName = 'memepieimages' + uuid.v4();
// var keyName = 'hello_world.txt';

var s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucketName } });

