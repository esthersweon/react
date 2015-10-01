var FriendGroupContainer = React.createClass({
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
        <FriendGroup
          key={ idx }
          id={ group.id }
          name={ group.name }
          friends={ this.state.friends }
          groupFriends={ friends }
          handleAddFriend={ this.handleAddFriend }
          handleRemoveFriend={ this.handleRemoveFriend } />
      )
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <h2>Friend Groups</h2>
        { this.getFriendGroupNodes() }
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
          groupId={ this.props.id }
          friends={ this.props.friends }
          handleAddFriend={ this.props.handleAddFriend } />
        <FriendsList
          groupId={ this.props.id }
          friends={ this.props.groupFriends }
          actionType="Remove"
          handleAction={ this.props.handleRemoveFriend } />
      </div>
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
      <div className="panel-body">
        <input className="form-control"
          type="text"
          placeholder="Search for friends"
          value={ this.state.searchTerm }
          onChange={ this.handleTextChange } />
        <FriendsList
          groupId={ this.props.groupId }
          friends={ this.state.filteredFriends }
          actionType="Add"
          handleAction={ this.handleAddFriend } />
      </div>
    );
  }
});

var FriendsList = React.createClass({
  handleAction: function (friend_id, e) {
    e.preventDefault();
    this.props.handleAction(this.props.groupId, friend_id);
  },
  getFriendNodes: function() {
    return this.props.friends.map(function (friend, idx) {
      return (
        <li key={ idx } className="list-group-item">
          <form className="clearfix" onSubmit={ this.handleAction.bind(this, friend.id) }>
            { friend.name }
            <button className="btn btn-default pull-right">{ this.props.actionType }</button>
          </form>
        </li>
      );
    }.bind(this));
  },
  render: function () {
    return (
      <ul className="list-group">
        { this.getFriendNodes() }
      </ul>
    );
  }
});

React.render(
  <FriendGroupContainer/>,
  document.getElementById('friend-group')
);
