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
  handleAddFriendToGroup: function (groupId, friendId) {
    console.log(this.props.groupsUrl + "/" + groupId + this.props.friendsUrl + "/" + friendId);
  },
  handleRemoveFriendFromGroup: function (groupId, friendId) {
    console.log(this.props.groupsUrl + "/" + groupId + this.props.friendsUrl + "/" + friendId);
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Friend Group"), 
        React.createElement(FriendGroupList, {
          groupsData: this.state.groupsData, 
          friendsData: this.state.friendsData, 
          handleAddFriendToGroup: this.handleAddFriendToGroup, 
          handleRemoveFriendFromGroup: this.handleRemoveFriendFromGroup})
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
        React.createElement(FriendGroup, {
          id: group.id, 
          name: group.name, 
          friendsData: this.props.friendsData, 
          groupFriendsData: friends, 
          handleAddFriendToGroup: this.props.handleAddFriendToGroup, 
          handleRemoveFriendFromGroup: this.props.handleRemoveFriendFromGroup})
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
        React.createElement(FriendSearch, {
          groupId: this.props.id, 
          data: this.props.friendsData, 
          handleAddFriendToGroup: this.props.handleAddFriendToGroup}), 
        React.createElement(FriendList, {
          groupId: this.props.id, 
          data: this.props.groupFriendsData, 
          friendActionName: "Remove", 
          handleAction: this.props.handleRemoveFriendFromGroup})
      )
    );
  }
});

var FriendList = React.createClass({displayName: "FriendList",
  render: function () {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        React.createElement(Friend, {
          id: friend.id, 
          groupId: this.props.groupId, 
          name: friend.name, 
          actionName: this.props.friendActionName, 
          handleAction: this.props.handleAction})
      );
    }.bind(this));

    return (
      React.createElement("ul", null, 
        friendNodes
      )
    );
  }
});

var Friend = React.createClass({displayName: "Friend",
  handleAction: function (event) {
    event.preventDefault();
    this.props.handleAction(this.props.groupId, this.props.id);
  },
  render: function () {
    return (
      React.createElement("li", null, 
        React.createElement("form", {onSubmit: this.handleAction}, 
          this.props.name, 
          React.createElement("button", null, this.props.actionName)
        )
      )
    );
  }
});

var FriendSearch = React.createClass({displayName: "FriendSearch",
  getInitialState: function () {
    return {
      searchTerm: "",
      filteredFriends: []
    }
  },
  handleTextChange: function (event) {
    var searchTerm = event.target.value,
      filteredFriends;

    filteredFriends = this.props.data.filter(function (friend) {
      return searchTerm && friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.setState({
      searchTerm: searchTerm,
      filteredFriends: filteredFriends
    });
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search for friends", 
          value: this.state.searchTerm, 
          onChange: this.handleTextChange}), 
        React.createElement(FriendList, {
          groupId: this.props.groupId, 
          data: this.state.filteredFriends, 
          friendActionName: "Add", 
          handleAction: this.props.handleAddFriendToGroup})
      )
    );
  }
});

React.render(
  React.createElement(FriendGroupBox, {groupsUrl: "/groups", friendsUrl: "/friends"}),
  document.getElementById('friend-group')
);
