class @Tumblr
	@handlers = {}

	constructor: (@account) ->
		@endpoint = "http://#{@account}.tumblr.com/api/read/json?"
		@posts = null

	request: (params, cb) =>
		reqID = 'h' + new Date().getTime().toString(36)

		handler = (data) ->
			cb(data)

		@constructor.handlers[reqID] = handler
		paramStr = _(params).map((v, k) -> "&#{k}=#{v}").join('')
		script = document.createElement 'script'
		script.setAttribute 'src', "#{@endpoint}callback=Tumblr.handlers.#{reqID}#{paramStr}"
		document.head.appendChild script

	getRecent: ->
		@request {}, @handleGetRecent

	handleGetRecent: (data) =>
		@posts or= new @constructor.Posts model: @constructor.Post
		for post in data.posts
			@posts.add post
