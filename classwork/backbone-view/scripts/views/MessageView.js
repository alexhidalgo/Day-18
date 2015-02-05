var MessageView = Backbone.View.extend({
	// template: _.template('<div><%= message %></div>'),
	el: '.message-room',
	// el: '#app-view'
	initialize: function(options) {

		console.log(options);

		_.bindAll(
			this,
			''
		);

		var template = _.template($('#my-message').html());

		this.$el.html(template(options));

		// this.$el.on('click', this.onMessageClick);
	},

	// onMessageClick: function(e) {
	// 	this.$el.css('color', 'red');
	// }
});
