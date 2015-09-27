var groups = [
    {
        "id": "1",
        "name": "Superheros",
        "friendIds": [
            "1",
            "2",
            "3",
            "10",
            "15",
            "21",
            "4"
        ]
    },
    {
        "id": "3",
        "name": "People",
        "friendIds": [
            "9",
            "21",
            "1"
        ]
    },
    {
        "id": "4",
        "name": "Fictional Characters",
        "friendIds": [
            "10",
            "11",
            "1"
        ]
    }
];

var friends = [
    {
        "id": "1",
        "name": "Ken"
    },
    {
        "id": "2",
        "name": "Esther"
    },
    {
        "id": "3",
        "name": "Michael Scott"
    },
    {
        "id": "4",
        "name": "Jim Halpert"
    },
    {
        "id": "5",
        "name": "Pam Beesly"
    },
    {
        "id": "6",
        "name": "Batman"
    },
    {
        "id": "7",
        "name": "Superman"
    },
    {
        "id": "8",
        "name": "Iron Man"
    },
    {
        "id": "9",
        "name": "The Hulk"
    },
    {
        "id": "10",
        "name": "Arya Stark"
    },
    {
        "id": "11",
        "name": "Daenerys Targaryen"
    },
    {
        "id": "12",
        "name": "Jaime Lannister"
    },
    {
        "id": "13",
        "name": "Goku"
    },
    {
        "id": "14",
        "name": "Mario"
    }
];

var FriendGroupBox = React.createClass({displayName: "FriendGroupBox",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Friend Group"), 

        React.createElement(FriendGroupList, {groupsData: this.props.groupsData, friendsData: this.props.friendsData})
      )
    );
  }
});

var FriendGroupList = React.createClass({displayName: "FriendGroupList",
  render: function () {
    var friendGroupNodes = this.props.groupsData.map(function (group) {
      var friends = this.props.friendsData.filter(function (friend) {
        return group.friendIds.indexOf(friend.id) > -1;
      });

      return (
        React.createElement(FriendGroup, {name: group.name, friendsData: friends})
      )
    }.bind(this));

    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "FriendGroups"), 
        friendGroupNodes
      )
    );
  }
});

var FriendGroup = React.createClass({displayName: "FriendGroup",
  render: function () {
    // console.log(this.props.friendsData);

    return (
      React.createElement("div", null, 
        React.createElement("h4", null, this.props.name), 
        React.createElement(FriendList, {data: this.props.friendsData})
      )
    );
  }
});

var FriendList = React.createClass({displayName: "FriendList",
  render: function () {
    console.log(this.props.data);

    return (
      React.createElement("ul", null, 
        React.createElement(Friend, null), 
        React.createElement(Friend, null)
      )
    );
  }
});

var Friend = React.createClass({displayName: "Friend",
  render: function () {
    return (
      React.createElement("li", null, 
        "Friend"
      )
    );
  }
});

React.render(
  React.createElement(FriendGroupBox, {groupsData: groups, friendsData: friends}),
  document.getElementById('friend-group')
);
