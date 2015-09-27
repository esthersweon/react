var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//tweets
app.get('/tweets.json', function(req, res) {
  fs.readFile('tweets.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/tweets.json', function(req, res) {
  fs.readFile('tweets.json', function(err, data) {
    var tweets = JSON.parse(data);
    tweets.push(req.body);
    fs.writeFile('tweets.json', JSON.stringify(tweets, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(tweets);
    });
  });
});

//friends
app.get('/friends', function(req, res) {
  fs.readFile('friends.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/friends', function(req, res) {
  fs.readFile('friends.json', function(err, data) {
    var friends = JSON.parse(data),
      ids,
      maxId,
      newFriend;

    ids = friends.map(function (friend) {
      return friend.id;
    });

    maxId = ids.length ? Math.max.apply(this, ids) : 0;
    newFriend = {
      id: (maxId + 1).toString(),
      name: req.body.name
    };

    friends.push(newFriend);

    fs.writeFile('friends.json', JSON.stringify(friends, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(friends);
    });
  });
});

app.delete('/friends/:id', function(req, res) {
  fs.readFile('friends.json', function(err, data) {
    var friends = JSON.parse(data);

    friends = friends.filter(function (friend) {
      return req.params.id != friend.id;
    });

    fs.writeFile('friends.json', JSON.stringify(friends, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(friends);
    });
  });
});

app.patch('/friends/:id', function(req, res) {
  fs.readFile('friends.json', function(err, data) {
    var friends = JSON.parse(data);

    friends.forEach(function (friend) {
      if (friend.id == req.params.id) {
        friend.name = req.body.name;
      }
    });

    fs.writeFile('friends.json', JSON.stringify(friends, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(friends);
    });
  });
});


//groups
app.get('/groups', function(req, res) {
  fs.readFile('groups.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/groups', function(req, res) {
  fs.readFile('groups.json', function(err, data) {
    var groups = JSON.parse(data),
      maxId,
      newGroup;

    ids = groups.map(function (group) {
      return group.id;
    });

    maxId = ids.length ? Math.max.apply(this, ids) : 0;
    newGroup = {
      id: (maxId + 1).toString(),
      name: req.body.name,
      friendIds: []
    };

    groups.push(newGroup);

    fs.writeFile('groups.json', JSON.stringify(groups, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(groups);
    });
  });
});

app.delete('/groups/:id', function(req, res) {
  fs.readFile('groups.json', function(err, data) {
    var groups = JSON.parse(data);

    groups = groups.filter(function (group) {
      return req.params.id != group.id;
    });

    fs.writeFile('groups.json', JSON.stringify(groups, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(groups);
    });
  });
});


app.post('/groups/:id/friends/:friendId', function(req, res) {
  fs.readFile('groups.json', function(err, data) {
    var groups = JSON.parse(data),
      groupToEdit = null,
      maxId;

    ids = groups.map(function (friend) {
      return friend.id;
    });

    groups.forEach(function (group) {
      if (group.id == req.params.id) {
        groupToEdit = group;
      }
    });

    if (groupToEdit !== null) {
      if (groupToEdit.friendIds.indexOf(req.params.friendId) === -1) {
        groupToEdit.friendIds.push(req.params.friendId);
      }
    } else {
      var newGroup = {
        id: req.params.id,
        friendIds: [req.params.friendId],
      };

      groups.push(newGroup);
    }

    fs.writeFile('groups.json', JSON.stringify(groups, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(groups);
    });
  });
});

app.delete('/groups/:id/friends/:friendId', function(req, res) {
  fs.readFile('groups.json', function(err, data) {
    var groups = JSON.parse(data);

    newGroups = [];

    groups.forEach(function (group) {
      if (req.params.id == group.id) {
        group.friendIds = group.friendIds.filter(function (friendId) {
          return req.params.friendId !== friendId;
        });
      }

      newGroups.push(group);
    });

    fs.writeFile('groups.json', JSON.stringify(newGroups, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(newGroups);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
