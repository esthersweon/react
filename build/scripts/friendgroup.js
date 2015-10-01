var FriendGroupContainer = React.createClass({displayName: "FriendGroupContainer",
  getInitialState: function () {
    return {
      groups: [],
      friends: []
    };
  },
  componentDidMount: function () {
    // Set this.state.groups to most recent groups data from database
    this.loadGroupData();

    // Set this.state.friends to most recent friends data from database
    this.loadFriendData();
  },
  loadGroupData: function () {
    // GET updated groups from database
    $.ajax({
      method: 'GET',
      url: '/groups',
      success: function (data) {
        this.setState({
          groups: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  loadFriendData: function () {
    // GET updated friends from database
    $.ajax({
      method: 'GET',
      url: '/friends',
      success: function (data) {
        this.setState({
          friends: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  handleAddFriend: function (groupId, friendId) {
    var url = '/groups/' + groupId + '/friends/' + friendId;

    // POST new friend to a group
    $.ajax({
      method: 'POST',
      url: url,
      success: function (response) {
        this.setState({
          groups: response
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  handleRemoveFriend: function (groupId, friendId) {
    var url = '/groups/' + groupId + '/friends/' + friendId;

    // DELETE friend from group
    $.ajax({
      method: 'DELETE',
      url: url,
      success: function (response) {
        this.setState({
          groups: response
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getFriendGroupNodes: function() {
    return this.state.groups.map(function (group, idx) {
      var friends = this.state.friends.filter(function (friend) {
        return group.friendIds.indexOf(friend.id) > -1;
      });

      return (
        React.createElement(FriendGroup, {
          key:  idx, 
          id:  group.id, 
          name:  group.name, 
          friends:  this.state.friends, 
          groupFriends:  friends, 
          handleAddFriend:  this.handleAddFriend, 
          handleRemoveFriend:  this.handleRemoveFriend})
      )
    }.bind(this));
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Friend Groups"), 
         this.getFriendGroupNodes() 
      )
    );
  }
});

var FriendGroup = React.createClass({displayName: "FriendGroup",
  render: function () {
    return (
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"}, this.props.name), 
        React.createElement(FriendSearch, {
          groupId:  this.props.id, 
          friends:  this.props.friends, 
          handleAddFriend:  this.props.handleAddFriend}), 
        React.createElement(FriendsList, {
          groupId:  this.props.id, 
          friends:  this.props.groupFriends, 
          actionType: "Remove", 
          handleAction:  this.props.handleRemoveFriend})
      )
    );
  }
});

var FriendSearch = React.createClass({displayName: "FriendSearch",
  getInitialState: function () {
    return {
      searchTerm: '',
      filteredFriends: []
    }
  },
  handleAddFriend: function (groupId, friendId) {
    this.props.handleAddFriend(groupId, friendId);

    this.setState({
      searchTerm: '',
      filteredFriends: []
    })
  },
  handleTextChange: function (e) {
    var searchTerm = e.target.value;

    var filteredFriends = this.props.friends.filter(function (friend) {
      return searchTerm && friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.setState({
      searchTerm: searchTerm,
      filteredFriends: filteredFriends
    });
  },
  render: function () {
    return (
      React.createElement("div", {className: "panel-body"}, 
        React.createElement("input", {className: "form-control", 
          type: "text", 
          placeholder: "Search for friends", 
          value:  this.state.searchTerm, 
          onChange:  this.handleTextChange}), 
        React.createElement(FriendsList, {
          groupId:  this.props.groupId, 
          friends:  this.state.filteredFriends, 
          actionType: "Add", 
          handleAction:  this.handleAddFriend})
      )
    );
  }
});

var FriendsList = React.createClass({displayName: "FriendsList",
  handleAction: function (friend_id, e) {
    e.preventDefault();
    this.props.handleAction(this.props.groupId, friend_id);
  },
  getFriendNodes: function() {
    return this.props.friends.map(function (friend, idx) {
      return (
        React.createElement("li", {key:  idx, className: "list-group-item"}, 
          React.createElement("form", {className: "clearfix", onSubmit:  this.handleAction.bind(this, friend.id) }, 
             friend.name, 
            React.createElement("button", {className: "btn btn-default pull-right"},  this.props.actionType)
          )
        )
      );
    }.bind(this));
  },
  render: function () {
    return (
      React.createElement("ul", {className: "list-group"}, 
         this.getFriendNodes() 
      )
    );
  }
});

React.render(
  React.createElement(FriendGroupContainer, null),
  document.getElementById('friend-group')
);
