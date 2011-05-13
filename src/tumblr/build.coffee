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
		@posts or= new @constructor.Posts
		console.log "handleGetRecent", data
class @Tumblr.Tag extends Backbone.Model
	defaults: {
		name: null
	}
class @Tumblr.Tags extends Backbone.Collection
class @Tumblr.Post extends Backbone.Model
	defaults: {
		id: null
		url: null
		urlWithSlug: null
		type: null
		dateGMT: null
		date: null
		bookmarklet: null
		mobile: null
		unixTimestamp: null
		slug: null
		tags: null
	}
class @Tumblr.TextPost extends @Tumblr.Post
	initialize: (opts) ->
		true
