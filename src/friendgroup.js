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

var FriendGroupBox = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Friend Group</h2>

        <FriendGroupList groupsData={this.props.groupsData} friendsData={this.props.friendsData} />
      </div>
    );
  }
});

var FriendGroupList = React.createClass({
  render: function () {
    var friendGroupNodes = this.props.groupsData.map(function (group) {
      console.log("friendIds:");
      console.log(group.friendIds);
      console.log("this.props.friendsData:");
      console.log(this.props.friendsData);

      var friends = this.props.friendsData.filter(function (friend) {
        return group.friendIds.indexOf(friend.id) > -1;
      });

      console.log("Friends");
      console.log(friends);

      return (
        <FriendGroup name={group.name} />
      )
    }.bind(this));

    return (
      <div>
        <h3>FriendGroups</h3>
        {friendGroupNodes}
      </div>
    );
  }
});

var FriendGroup = React.createClass({
  render: function () {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <FriendList />
      </div>
    );
  }
});

var FriendList = React.createClass({
  render: function () {
    return (
      <ul>
        <Friend />
        <Friend />
      </ul>
    );
  }
});

var Friend = React.createClass({
  render: function () {
    return (
      <li>
        Friend
      </li>
    );
  }
});

React.render(
  <FriendGroupBox groupsData={groups} friendsData={friends} />,
  document.getElementById('friend-group')
);
