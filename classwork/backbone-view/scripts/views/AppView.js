var AppView = Backbone.View.extend({
  el: '#app-view',
  initialize: function() {


    _.bindAll(
      this,
      'onSendButtonClick',
      'getMessages',
      'messagesReceived',
      'displayMessages',
      'timeStamp'
    );

    this.getMessagesInterval();
    // this.promptName();
    // this.getMessages();

    // $('.send-button').click(function() {
    // $('.message-box').val('');
    // });

  },

  promptName: function() {
    var userName = prompt('Please enter your name.');
  },

  getMessagesInterval: function() {
    setInterval(this.getMessages, 1000);

  },

  getMessages: function() {
    $.get(
      'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
        // console.log($(self)),
        this.messagesReceived,
        // function(messages) {
        //   this.displayMessages(messages);
        // },

      'json'
    );
  },

  messagesReceived: function(messages) {
    // console.log('messagesReceived funciton just ran');
    // console.log(messages);
    this.displayMessages(messages);


  },

  displayMessages: function(messages) {
    var messageRow = _.template('<div class="well well-lg user1"><dl class="dl-horizontal"><dt><%= name %><%= time %></dt><dd><%= message %></dd></dl></div>');
    this.$('.message-room').html('');
      for( var i = 0; i < messages.length; i++) {
        // if(messages[i].id > lastID) {
        // console.log(messages);
        this.$('.message-room').append(messageRow(messages[i]));
        // $('.message-room').emoticonize();
        // $('.well').emoticonize();
        // lastID = messages[i].id;
        // var audio = new Audio('http://myinstants.com/media/sounds/dun_dun_1.mp3');
        // audio.play();
      }
  },

  onSendButtonClick: function() {
    var now = timeStamp();
    $.post(
      'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
      {
        name: userName,
        message: $('.message-box').val(),
        time: now,
      },
      function(messages) {
        console.log('test');
      },
      'json'
    );
  },

  timeStamp: function() {
    var now = new Date();
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }
    return " " + date.join("/") + " " + time.join(":") + " " + suffix + " ";
  }


});


