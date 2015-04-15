# Honours Project

This framework/CMS is my honours project. It was designed to let developers create a website or a mobile application in a matter of minutes

**Examples can be found at:**

[Website](http://honours.alexjohnporter.co.uk)

[Google Play Store](https://play.google.com/store/apps/details?id=com.HonoursApp&hl=en_GB)

* * *

## Installation

1.  Download as a zip file and unzip to your chosen directory
2.  Go to the installation folder and import the SQL found there to your MySQL database
3.  Edit the database configuration under /php/core/dbinfo.php
4.  Run your server and open edit.html to create your website

## Recommendations

I didn't create an authentication service for this project, so either delete the edit.html file or use the .htaccess file to password protect it - you will have to create an appropriate .htpasswd file.

## Updates I'd like to make in the future

1.  Implement OOPHP for database connection and queries
2.  Authentication service to login via email or using oAuth
3.  Use AngularJS for the front-end
4.  Create a system where users can define the features they would like for their website