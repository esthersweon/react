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
        React.createElement("h2", null, "Friend Group Component"), 
        "// Group List"
      )
    );
  }
});