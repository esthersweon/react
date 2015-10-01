var FriendGroupBox = React.createClass({
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
    var url = this.props.groupsUrl + "/" + groupId + this.props.friendsUrl + "/" + friendId;

    $.ajax({
      method: 'post',
      url: url,
      success: function (data) {
        this.setState({
          groupsData: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  handleRemoveFriendFromGroup: function (groupId, friendId) {
    var url = this.props.groupsUrl + "/" + groupId + this.props.friendsUrl + "/" + friendId;

    $.ajax({
      method: 'delete',
      url: url,
      success: function (data) {
        this.setState({
          groupsData: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div>
        <h2>Friend Groups</h2>
        <FriendGroupList
          groupsData={this.state.groupsData}
          friendsData={this.state.friendsData}
          handleAddFriendToGroup={this.handleAddFriendToGroup}
          handleRemoveFriendFromGroup={this.handleRemoveFriendFromGroup} />
      </div>
    );
  }
});

var FriendGroupList = React.createClass({
  render: function () {
    var friendGroupNodes = this.props.groupsData.map(function (group) {
      var friends = this.props.friendsData.filter(function (friend) {
        return group.friendIds.indexOf(friend.id) > -1;
      });

      return (
        <FriendGroup
          id={group.id}
          name={group.name}
          friendsData={this.props.friendsData}
          groupFriendsData={friends}
          handleAddFriendToGroup={this.props.handleAddFriendToGroup}
          handleRemoveFriendFromGroup={this.props.handleRemoveFriendFromGroup} />
      )
    }.bind(this));

    return (
      <div>
        {friendGroupNodes}
      </div>
    );
  }
});

var FriendGroup = React.createClass({
  render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.name}</div>
        <FriendSearch
          groupId={this.props.id}
          data={this.props.friendsData}
          handleAddFriendToGroup={this.props.handleAddFriendToGroup} />
        <FriendList
          groupId={this.props.id}
          data={this.props.groupFriendsData}
          friendActionName="Remove"
          handleAction={this.props.handleRemoveFriendFromGroup} />
      </div>
    );
  }
});

var FriendList = React.createClass({
  render: function () {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <Friend
          id={friend.id}
          groupId={this.props.groupId}
          name={friend.name}
          actionName={this.props.friendActionName}
          handleAction={this.props.handleAction} />
      );
    }.bind(this));

    return (
      <ul className="list-group">
        {friendNodes}
      </ul>
    );
  }
});

var Friend = React.createClass({
  handleAction: function (event) {
    event.preventDefault();
    this.props.handleAction(this.props.groupId, this.props.id);
  },
  render: function () {
    return (
      <li className="list-group-item">
        <form className="clearfix" onSubmit={this.handleAction}>
          {this.props.name}
          <button className="btn btn-default pull-right">{this.props.actionName}</button>
        </form>
      </li>
    );
  }
});

var FriendSearch = React.createClass({
  getInitialState: function () {
    return {
      searchTerm: '',
      filteredFriends: []
    }
  },
  handleAddFriendToGroup: function (groupId, friendId) {
    this.props.handleAddFriendToGroup(groupId, friendId);

    this.setState({
      searchTerm: '',
      filteredFriends: []
    })
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
      <div className="panel-body">
        <input
          className="form-control"
          type="text"
          placeholder="Search for friends"
          value={this.state.searchTerm}
          onChange={this.handleTextChange} />
        <FriendList
          groupId={this.props.groupId}
          data={this.state.filteredFriends}
          friendActionName="Add"
          handleAction={this.handleAddFriendToGroup} />
      </div>
    );
  }
});

React.render(
  <FriendGroupBox groupsUrl={"/groups"} friendsUrl={"/friends"} />,
  document.getElementById('friend-group')
);
