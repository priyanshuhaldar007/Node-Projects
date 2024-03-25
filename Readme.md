# Node Server
This is a dummy node project used for making APIs to perform CRUD operation on an SQL DB filled with Dummy data. The credentials to the DB are stored in a secret github gist. 

## Resources used
- [Mockaroo](mockaroo.com) for creating dummy data
- [FreeSQLDB](https://www.freesqldatabase.com/) to create a free sql db on php my admin

## Steps to replicate
- Create Dummy data from mockaroo. Download it in CSV format.
- Get a free SQL DB from freeSQLDB. Upload the downloaded dummy data to the SQL database.
- Download the zip of this project.
- Create an env file with the following contents
```env
PORT = ****
DB_USER = ****
DB_PASS = ****
```
- Run `npm install`
- For starting the server run `nodemon`. 