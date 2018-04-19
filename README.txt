How to run the Web App:

1) Unzip
2) goto corresponding folder
3) npm install
4) npm start # Starts the server
5) Goto localhost:3000 to access the app 

Front end files can be accessed from the public folder (index.html, style.css)

Data on Mlab:
Instead of using local database we stored data on cloud using MLAB.
Credentials of MLAB are -

username: ogkranthi
password: kranthi1


Search Bar:

In search bar, we search documents using Battle name. 
Partial word search is done on the battle name. 
After fetching respective documents, select one of the documents to get details of the document.
The details of any battle document consists of data fields from battle collection.
From character collection we are fetching associated data along with battle details.
Image associated with the documents are retrieved on respective selection of documents.
User can add comments when a particular document is selected, which gets stored on the cloud database and can be retrieved on successful selection of the document.