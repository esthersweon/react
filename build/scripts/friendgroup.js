var FriendGroupBox = React.createClass({displayName: "FriendGroupBox",
  getInitialState: function () {
    return {
      groupsData: [],
      friendsData: []
    };
  },
  componentDidMount: function () {
    this.loadGroupData();
    this.loadFriendData();
  },
  loadGroupData: function () {
    $.ajax({
      method: 'get',
      url: this.props.groupsUrl,
      success: function (data) {
        this.setState({
          groupsData: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadFriendData: function () {
    $.ajax({
      method: 'get',
      url: this.props.friendsUrl,
      success: function (data) {
        this.setState({
          friendsData: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Friend Group"), 
        React.createElement(FriendGroupList, {groupsData: this.state.groupsData, friendsData: this.state.friendsData})
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
    return (
      React.createElement("div", null, 
        React.createElement("h4", null, this.props.name), 
        React.createElement(FriendSearch, {data: this.props.friendsData}), 
        React.createElement(FriendList, {data: this.props.friendsData})
      )
    );
  }
});

var FriendList = React.createClass({displayName: "FriendList",
  render: function () {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        React.createElement(Friend, {name: friend.name})
      );
    });

    return (
      React.createElement("ul", null, 
        friendNodes
      )
    );
  }
});

var Friend = React.createClass({displayName: "Friend",
  render: function () {
    return (
      React.createElement("li", null, 
        this.props.name
      )
    );
  }
});

var FriendSearch = React.createClass({displayName: "FriendSearch",
  getInitialState: function () {
    return {
      searchTerm: ""
    }
  },
  handleTextChange: function (event) {
    this.setState({
      searchTerm: event.target.value
    });
  },
  render: function () {
    console.log(this.state.searchTerm);
    
    return (
      React.createElement("div", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search for friends", 
          value: this.state.searchTerm, 
          onChange: this.handleTextChange}
        )
      )
    );
  }
});

React.render(
  React.createElement(FriendGroupBox, {groupsUrl: "/groups", friendsUrl: "/friends"}),
  document.getElementById('friend-group')
);
