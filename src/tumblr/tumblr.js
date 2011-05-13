(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.Tumblr = (function() {
    Tumblr.handlers = {};
    function Tumblr(account) {
      this.account = account;
      this.handleGetRecent = __bind(this.handleGetRecent, this);
      this.request = __bind(this.request, this);
      this.endpoint = "http://" + this.account + ".tumblr.com/api/read/json?";
      this.posts = null;
    }
    Tumblr.prototype.request = function(params, cb) {
      var handler, paramStr, reqID, script;
      reqID = 'h' + new Date().getTime().toString(36);
      handler = function(data) {
        return cb(data);
      };
      this.constructor.handlers[reqID] = handler;
      paramStr = _(params).map(function(v, k) {
        return "&" + k + "=" + v;
      }).join('');
      script = document.createElement('script');
      script.setAttribute('src', "" + this.endpoint + "callback=Tumblr.handlers." + reqID + paramStr);
      return document.head.appendChild(script);
    };
    Tumblr.prototype.getRecent = function() {
      return this.request({}, this.handleGetRecent);
    };
    Tumblr.prototype.handleGetRecent = function(data) {
      var post, _i, _len, _ref, _results;
      this.posts || (this.posts = new this.constructor.Posts({
        model: this.constructor.Post
      }));
      _ref = data.posts;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        _results.push(this.posts.add(post));
      }
      return _results;
    };
    return Tumblr;
  })();
  this.Tumblr.Tag = (function() {
    __extends(Tag, Backbone.Model);
    function Tag() {
      Tag.__super__.constructor.apply(this, arguments);
    }
    Tag.prototype.defaults = {
      name: null
    };
    return Tag;
  })();
  this.Tumblr.Tags = (function() {
    __extends(Tags, Backbone.Collection);
    function Tags() {
      Tags.__super__.constructor.apply(this, arguments);
    }
    return Tags;
  })();
  this.Tumblr.Post = (function() {
    __extends(Post, Backbone.Model);
    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }
    Post.prototype.defaults = {
      id: null,
      url: null,
      urlWithSlug: null,
      type: null,
      dateGMT: null,
      date: null,
      bookmarklet: null,
      mobile: null,
      unixTimestamp: null,
      slug: null,
      tags: null
    };
    return Post;
  })();
  this.Tumblr.TextPost = (function() {
    __extends(TextPost, this.Tumblr.Post);
    function TextPost() {
      TextPost.__super__.constructor.apply(this, arguments);
    }
    TextPost.prototype.initialize = function(opts) {
      return true;
    };
    return TextPost;
  }).call(this);
  this.Tumblr.Posts = (function() {
    __extends(Posts, Backbone.Collection);
    function Posts() {
      Posts.__super__.constructor.apply(this, arguments);
    }
    Posts.model = Posts.constructor.Post;
    return Posts;
  })();
}).call(this);
