var albumBucketName = 'memepieimages';
var bucketRegion = 'us-east-2';
var IdentityPoolId = 'us-east-2:25744f84-733f-46bb-bc15-7c143d3c89e6';



AWS.config.update({
  region: 'us-east-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

// AWS.config.region = 'us-east-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-2:25744f84-733f-46bb-bc15-7c143d3c89e6',
// });

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});



// $(document).ready(function () {

  console.log("its working");

  function test(){
    console.log("this works too");
  }
  // List all albums in the bucket ???
  function listAlbums() {
    s3.listObjects({ Delimiter: '/' }, function (err, data) {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      } else {
        var albums = data.CommonPrefixes.map(function (commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace('/', ''));
          return getHtml([
            '<li>',
            '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
            '<button onclick="viewAlbum(\'' + albumName + '\')">',
            albumName,
            '</button>',
            '</li>'
          ]);
        });
        var message = albums.length ?
          getHtml([
            '<p>Click on an album name to view it.</p>',
            '<p>Click on the X to delete the album.</p>'
          ]) :
          '<p>You do not have any albums. Please Create album.';
        var htmlTemplate = [
          '<h2>Albums</h2>',
          message,
          '<ul>',
          getHtml(albums),
          '</ul>',
          '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
          'Create New Album',
          '</button>'
        ]
        document.getElementById('app').innerHTML = getHtml(htmlTemplate);
      }
    });
  }


  // create album for bucket??

  function createAlbum(albumName) {
    albumName = albumName.trim();
    if (!albumName) {
      return alert('Album names must contain at least one non-space character.');
    }
    if (albumName.indexOf('/') !== -1) {
      return alert('Album names cannot contain slashes.');
    }
    var albumKey = encodeURIComponent(albumName) + '/';
    s3.headObject({Key: albumKey}, function(err, data) {
      if (!err) {
        return alert('Album already exists.');
      }
      if (err.code !== 'NotFound') {
        return alert('There was an error creating your album: ' + err.message);
      }
      s3.putObject({Key: albumKey}, function(err, data) {
        if (err) {
          return alert('There was an error creating your album: ' + err.message);
        }
        alert('Successfully created album.');
        viewAlbum(albumName);
      });
    });
  }



  // function to view the photos stored in S3 bucket
  function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + '/';
    s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      // `this` references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + albumBucketName + '/';

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          '<span>',
          '<div>',
          '<img class="rounded" style="width: 300px; margin-bottom: 20px; border: 2px solid black;" src="' + photoUrl + '"/>',
          '</div>',
          '<div>',
          // '<span>',
          // photoKey.replace(albumPhotosKey, ''),
          // '</span>',
          '</div>',
          '</span>',
        ]);
      });
      var message = photos.length ?
        '<p></p>' :
        '<p>You do not have any photos in this album. Please add photos.</p>';
      var htmlTemplate = [
        message,
        '<div>',
        getHtml(photos),
        '</div>',
      ]
      document.getElementById('app').innerHTML = getHtml(htmlTemplate);
      console.log('you made it here ass-wipe');
    });
  }

  function runTableQuery() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: currentURL + "/api/tables", method: "GET" })
      .then(function(tableData) {

      // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/api/tables");
        console.log("------------------------------------");

        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(tableData);
        console.log("------------------------------------");

        // Loop through and display each of the customers
        for (var i = 0; i < tableData.length; i++) {

        // Create the HTML Well (Section) and Add the table content for each reserved table
          var tableSection = $("<div>");
          tableSection.addClass("well");
          tableSection.attr("id", "tableWell-" + i + 1);
          $("#tableSection").append(tableSection);

          var tableNumber = i + 1;


          // Then display the remaining fields in the HTML (Section Name, Date, URL)
          $("#tableWell-" + i + 1).append("<h2><span class='label label-primary'>" + tableNumber + "</span> | " + tableData[i].customerID + "</h2>");
        }
      });
  }

  function viewDankMemes() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: currentURL + "/api/memes", method: "GET" })
      .then(function(waitlistData) {

      // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/api/waitlist");
        console.log("------------------------------------");

        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(waitlistData);
        console.log("------------------------------------");

        // Loop through and display each of the customers
        for (var i = 0; i < waitlistData.length; i++) {

        // Create the HTML Well (Section) and Add the table content for each reserved table
          var waitlistSection = $("<div>");
          waitlistSection.addClass("well");
          waitlistSection.attr("id", "waitlistWell-" + i + 1);
          $("#waitlistSection").append(waitlistSection);

          var tableNumber = i + 1;

          // Then display the remaining fields in the HTML (Section Name, Date, URL)
          $("#waitlistWell-" + i + 1).append("<h2><span class='label label-primary'>" + tableNumber + "</span> | " + waitlistData[i].customerID + "</h2>");
        }
      });

  }