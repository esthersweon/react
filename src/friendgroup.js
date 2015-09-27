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
  render: function () {
    return (
      <div>
        <h2>Friend Group</h2>
        <FriendGroupList groupsData={this.state.groupsData} friendsData={this.state.friendsData} />
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
        <FriendGroup name={group.name} friendsData={friends} />
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
        <FriendSearch data={this.props.friendsData} />
        <FriendList data={this.props.friendsData} />
      </div>
    );
  }
});

var FriendList = React.createClass({
  render: function () {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <Friend name={friend.name} />
      );
    });

    return (
      <ul>
        {friendNodes}
      </ul>
    );
  }
});

var Friend = React.createClass({
  render: function () {
    return (
      <li>
        {this.props.name}
      </li>
    );
  }
});

var FriendSearch = React.createClass({
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
      <div>
        <input
          type="text"
          placeholder="Search for friends"
          value={this.state.searchTerm}
          onChange={this.handleTextChange}
        />
        <FriendList data={this.props.data} />
      </div>
    );
  }
});

React.render(
  <FriendGroupBox groupsUrl={"/groups"} friendsUrl={"/friends"} />,
  document.getElementById('friend-group')
);
