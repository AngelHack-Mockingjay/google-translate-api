var bpdyParser = require('body-parser')
var express = require('express');
var app = express();

/////////////////////////
////////////////////////

const messageList = []
let userObject = {}

app.use(bpdyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('connect.');
});

// POST method route
app.post('/message', function (req, res) {
  const data = req.body
  if (data) {
  	const userID = data.userID,
  		  userName = data.userName,
  		  userMessage = data.userMessage,
  		  userPlatform = data.userPlateform,
  			createdOn = new Date().getTime()
  	let userOldTime
    if (!userObject[userID]) {
    	userObject = Object.assign({}, userObject, {
    		[userID]: {
    			userUpdatedAt: createdOn
    		}
    	})
    	messageList.push({
    		userName: userName,
    		userMessage: userMessage,
    		userPlatform: userPlatform,
    		createdOn: createdOn
    	})
    } else {
    	userOldTime = userObject[userID].userUpdatedAt
			userObject = Object.assign({}, userObject, {
    		[userID]: {
    			userUpdatedAt: createdOn
    		}
    	})
    	messageList.push({
    		userName: userName,
    		userMessage: userMessage,
    		userPlatform: userPlatform,
    		createdOn: createdOn
    	})
    }
    const currentMessageList = messageList.filter(list => {
    	return list.createdOn >= userOldTime
    })
    console.log(currentMessageList)
    res.send(currentMessageList)
	}
});

	
///////////////////////////
const translate = require('google-translate-api');

app.get('/translate', function(req, res) {
	var text = req.query.text;
	var tolang = req.query.tolang;
	translate(text, {to: tolang}).then(r => {
			console.log(r.text)
	    res.send(JSON.stringify({
	    	result: r.text
	    }));
	    //=> I speak English
	    //console.log(r.from.language.iso);
	    //=> nl
	}).catch(err => {
	    console.error(err);
	});
    // res.send('translations.');
});


//////////////////////////

app.listen(14433, (req, res) => {
	console.log('Server listen on port 14433')
})