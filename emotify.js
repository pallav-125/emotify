/*
** author: @pallav
** This is a library to emotify all your emoticon tokens
*/
(function(global){

	var Emotify = function(chatBoxId) {
		return new Emotify.init(chatBoxId);
	}

	var emoticons = [{
	        "code": ":)",
	        "class": "emoticon-smile"
	    },{
	        "code": "<3",
	        "class": "emoticon-heart"
	    }
	];
	var emoticonPatterns = [];
	var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;
	var emojiBox;
	var textarea = document.querySelector('textarea');
	var emoticonsRegEx;

	Emotify.prototype = {
		validate: function() {
			if(!this.chatBoxId) {
				throw "chat box id not defined";
			}
			emojiBox = document.getElementById(this.chatBoxId);
		},
		generateEmoticonPattern: function() {
			emoticons.forEach(function(emoticon) {
				emoticonPatterns.push('(' + emoticon.code.replace(metachars, "\\$&") + ')');
			});
			emoticonsRegEx = new RegExp(emoticonPatterns.join('|'), 'g');
			
		},
		addEmoticon: function(emoticonCode) {
			var emoticonClass;
			emoticons.forEach(function(emoticon) {
				if(emoticonCode === emoticon.code) {
					emoticonClass = emoticon.class;
				}
			});
			return "<span class='emoticon " + emoticonClass + "'></span>";
		}
	};

	Emotify.init = function(chatBoxId) {
		var self = this;
		self.chatBoxId = chatBoxId;
		self.validate();
		self.generateEmoticonPattern();
	}

	Emotify.init.prototype = Emotify.prototype;
	global.Emotify = Emotify;

	textarea.addEventListener('keyup', parseText);
	function parseText(e) {
		if(e.keyCode !== 13) {
			return;
		}
		var text = e.target.value;
		var newText = text.replace(emoticonsRegEx, function(emoticonCode) {
			return Emotify.prototype.addEmoticon(emoticonCode);
		});
		var chatThread = document.createElement("div")
		chatThread.innerHTML = newText;
		emojiBox.appendChild(chatThread);
		textarea.value = '';
	}

}(window));