# Welcome to the AWS CodeStar - Lamda API with node.js and express
==============================================

This sample code aims to test how API call work with node.js & express

I built a simple API to manipulate notes, title and description.
Technologies used:
  * AWS Codestar for pipeline integration
  * AWS Lambda
  * AWS API gateway
  * Mongodb Atlas cloud database  


# What's Here
-----------

This sample includes:

* README.md - this file
* buildspec.yml - this file is used by AWS CodeBuild to package services for deployment to AWS Lambda
* app.js - this file contains the Node.js code for the API logique
* db.js - this file contaons the logique to connect to Mongodb database
* index.js - this file contains the AWS Lambda handler code
* template.yml - this file contains the AWS Serverless Application Model (AWS SAM) used
  by AWS CloudFormation to deploy services to AWS Lambda and Amazon API Gateway.
* tests/ - this directory contains unit tests for your application - not yet implemented

# How to use it
------------------
## Change **host** by the AWS endpoint and **note_id** with a note id.
### To list all notes
```
curl http://host/notes
```

### To list a single note
```
curl http://host/note/note_id
```

### To create a note
```
curl -d '{"title":"Les misérables", "description":"Good book"}' -H "Content-Type: application/json" -X POST http://host/note
```

### To update a note
```
curl -d '{"title":"Les misérables", "description":"Not so good of a book"}' -H "Content-Type: application/json" -X PATCH http://host/note/note_id
```

### To delete a note
```
curl -X DELETE http://host/note/note_id
```
