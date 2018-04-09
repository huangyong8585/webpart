(function() {
	(function() {
		(function() {
			if (window.Motion) {
				return
			}
			var Motion = {
				version: "1.1",
				add: function(name, obj) {
					var target = window;
					var me = arguments.callee;
					var parent = null;
					var isMatch = /^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(name);
					var objNS = RegExp.$1.split(".");
					var parentNS = RegExp.$2.split(".");
					var name = objNS.pop();
					var isClass = /[A-Z]/.test(name.substr(0, 1));
					var constructor = function() {
						var mainFn = arguments.callee.prototype.init;
						if (typeof(mainFn) == "function" && arguments.callee.caller != me) {
							mainFn && mainFn.apply(this, arguments)
						}
					};
					for (var i = 0; i < objNS.length; i++) {
						var p = objNS[i];
						target = target[p] || (target[p] = {})
					}
					if (parentNS[0] != "") {
						parent = window;
						for (var i = 0; i < parentNS.length; i++) {
							parent = parent[parentNS[i]];
							if (!parent) {
								parent = null;
								break
							}
						}
					}
					if (isClass && typeof(obj) == "function") {
						if (parent) {
							constructor.prototype = new parent();
							constructor.prototype.superClass = parent
						}
						target[name] = constructor;
						constructor.prototype.constructor = constructor;
						obj.call(target[name].prototype)
					} else {
						target[name] = obj
					}
				}
			};
			window.Motion = window.mo = Motion
		})()
	})();
	(function() {
		Motion.add("mo.Base", function() {
			var _public = this;
			var _static = this.constructor;
			var _self = {};
			_public.constructor = function() {
				var _private = {}
			};
			_public.on = function(name, fn) {
				box = $(this);
				return box.on.apply(box, arguments)
			};
			_public.off = function(name, fn) {
				box = $(this);
				return box.off.apply(box, arguments)
			};
			_public.trigger = function(name, data) {
				var box = $(this);
				return box.triggerHandler.apply(box, arguments)
			}
		})
	})();
	(function() {
		Motion.add("mo.ImageEditor:mo.Base", function() {
			var _public = this;
			var _private = {};
			var _static = this.constructor;
			_static.set = {
				width: 320,
				height: 320,
				fps: 60,
				bg: "#fff",
				onClose: function() {}
			};
			_public.init = function(set) {
				this.set = $.extend(true, {}, _static.set, set);
				var self = this;
				var set = self.set;
				self.effect && self.on(self.effect);
				set.event && self.on(set.event);
				if (self.trigger("beforeinit") === false) {
					return
				}
				var canvas = Quark.createDOM("canvas", {
					width: set.width,
					height: set.height,
					style: {
						backgroundColor: "#fff"
					}
				});
				canvas = $(canvas).appendTo(set.container)[0];
				var context = new Quark.CanvasContext({
					canvas: canvas
				});
				self.stage = new Quark.Stage({
					width: set.width,
					height: set.height,
					context: context
				});
				self.canvas = canvas;
				self.context = context;
				var em = this.em = new Quark.EventManager();
				em.registerStage(self.stage, ["touchstart", "touchmove", "touchend"], true, true);
				self.stage.stageX = set.stageX !== window.undefined ? set.stageX : self.stage.stageX;
				self.stage.stageY = set.stageY !== window.undefined ? set.stageY : self.stage.stageY;
				var timer = new Quark.Timer(1000 / set.fps);
				timer.addListener(self.stage);
				timer.addListener(Quark.Tween);
				timer.start();
				var bg = new Q.Graphics({
					width: set.width,
					height: set.height
				});
				bg.beginFill(set.bg).drawRect(0, 0, set.width, set.height).endFill().cache();
				self.stage.addChild(bg);
				_private.attach.call(self)
			};
			_private.attach = function() {
				var self = this;
				var set = self.set;
				set.trigger.on("change", function(e) {
					self.trigger("beforechange");
					var file = this.files[0];
					if (file.type && !/image\/\w+/.test(file.type)) {
						alert("请上传图片文件");
						return false
					}
					var fr = new FileReader();
					fr.readAsDataURL(file);
					fr.onload = function(fe) {
						var result = this.result;
						var img = new Image();
						var exif;
						img.onload = function() {
							self.addImage({
								img: img,
								exif: exif
							});
							self.trigger("change")
						};
						var base64 = result.replace(/^.*?,/, "");
						var binary = atob(base64);
						var binaryData = new BinaryFile(binary);
						exif = EXIF.readFromBinaryFile(binaryData);
						img.src = result
					}
				});
				self.stage.addEventListener("touchstart", function(e) {
					if (self.imgs) {
						for (var i = 0; i < self.imgs.length; i++) {
							self.imgs[i].disable()
						}
					}
					if (e.eventTarget && e.eventTarget.parent.enEditable) {
						e.eventTarget.parent.enEditable();
						self.activeTarget = e.eventTarget.parent
					}
				});
				self.stage.addEventListener("touchmove", function(e) {});
				self.stage.addEventListener("touchend", function(e) {
					if (self.activeTarget && self.activeTarget.mcScale) {
						delete self.activeTarget.mcScale.touchDis
					}
				})
			};
			_private.addEvent = function(img) {

			};
			_public.addImage = function(info) {
				var self = this;
				var set = self.set;
				var img = info.img;
				var exif = info.exif;
				var imgContainer;
				var mcScale;
				var mcClose;
				var imgWidth = img.width;
				var imgHeight = img.height;
				var imgRotation = 0;
				var imgRegX = 0;
				var imgRegY = 0;
				var imgX = 0;
				var imgY = 0;
				var posX = info.pos ? info.pos[0] : 0;
				var posY = info.pos ? info.pos[1] : 0;
				var imgScale = 1;
				var orientation = exif ? exif.Orientation : 1;
				var getRatio = function(img) {
					if (/png$/i.test(img.src)) {
						return 1
					}
					var iw = img.naturalWidth,
						ih = img.naturalHeight;
					var canvas = document.createElement("canvas");
					canvas.width = 1;
					canvas.height = ih;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);
					var data = ctx.getImageData(0, 0, 1, ih).data;
					var sy = 0;
					var ey = ih;
					var py = ih;
					while (py > sy) {
						var alpha = data[(py - 1) * 4 + 3];
						if (alpha === 0) {
							ey = py
						} else {
							sy = py
						}
						py = (ey + sy) >> 1
					}
					var ratio = (py / ih);
					return (ratio === 0) ? 1 : ratio
				};
				var ratio = getRatio(img);
				if (typeof img == "string") {
					var url = img;
					img = new Image();
					img.src = url
				}
				switch (orientation) {
					case 3:
						imgRotation = 180;
						imgRegX = imgWidth;
						imgRegY = imgHeight * ratio;
						break;
					case 6:
						imgRotation = 90;
						imgWidth = img.height;
						imgHeight = img.width;
						imgRegY = imgWidth * ratio;
						break;
					case 8:
						imgRotation = 270;
						imgWidth = img.height;
						imgHeight = img.width;
						imgRegX = imgHeight * ratio;
						if (/iphone|ipod|ipad/i.test(navigator.userAgent)) {
							return
						}
						break
				}
				imgWidth *= ratio;
				imgHeight *= ratio;
				if (imgWidth > self.stage.width) {
					imgScale = self.stage.width / imgWidth
				}
				imgWidth = imgWidth * imgScale;
				imgHeight = imgHeight * imgScale;
				imgContainer = new Quark.DisplayObjectContainer({
					width: imgWidth,
					height: imgHeight
				});
				imgContainer.x = posX;
				imgContainer.y = posY;
				imgContainer.id = info.id || set.id;
				img = new Quark.Bitmap({
					image: img,
					regX: imgRegX,
					regY: imgRegY
				});
				img.rotation = imgRotation;
				img.x = imgX;
				img.y = 0;
				img.scaleX = imgScale * ratio;
				img.scaleY = imgScale;
				var border = new Q.Graphics({
					width: imgWidth + 10,
					height: imgHeight + 10,
					x: -5,
					y: -5
				});
				border.lineStyle(5, "#aaa").beginFill("#fff").drawRect(5, 5, imgWidth, imgHeight).endFill().cache();
				border.alpha = 0.5;
				border.visible = false;
				imgContainer.addChild(border);
				if (set.iconClose) {
					var iconCloseImg = new Image();
					iconCloseImg.onload = function() {
						var rect = set.iconClose.rect;
						mcClose = new Quark.MovieClip({
							image: iconCloseImg
						});
						mcClose.addFrame([{
							rect: rect
						}]);
						mcClose.x = 0;
						mcClose.y = 0;
						mcClose.alpha = 0.5;
						mcClose.visible = false;
						mcClose.addEventListener("touchstart", function(e) {
							mcClose.alpha = 0.8
						});
						mcClose.addEventListener("touchend", function(e) {
							self.stage.removeChild(imgContainer);
							set.onClose()
						});
						self.stage.addEventListener("touchend", function(e) {
							mcClose.alpha = 0.5
						});
						imgContainer.addChild(mcClose)
					};
					iconCloseImg.src = set.iconClose.url
				}
				if (!info.disable) {
					img.fnStart = function(e) {
						var isMultiTouch = e.rawEvent && e.rawEvent.touches[1];
						if (!isMultiTouch) {
							img.curW = imgContainer.getCurrentWidth();
							img.curH = imgContainer.getCurrentHeight();
							img.moveabled = true;
							img.touchStart = [{
								"x": e.eventX,
								"y": e.eventY
							}];
							delete img.startScaleDistance
						} else {
							var touch1 = e.rawEvent.touches[0];
							var touch2 = e.rawEvent.touches[1];
							img.startScaleDistance = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
							img.touchStart = [{
								"x": touch1.pageX,
								"y": touch1.pageY
							}, {
								"x": touch2.pageX,
								"y": touch2.pageY
							}];
							img.touchStartScale = [{
								"x": touch1.pageX,
								"y": touch1.pageY
							}, {
								"x": touch2.pageX,
								"y": touch2.pageY
							}];
							img.imgContainerStartRotation = imgContainer.rotation;
							var touches = img.touchStart;
							var nCenterPoint = {
								"x": 0,
								"y": 0
							};
							for (var i = 0; i < touches.length; i++) {
								nCenterPoint.x += touches[i].x;
								nCenterPoint.y += touches[i].y
							}
							nCenterPoint.x /= touches.length;
							nCenterPoint.y /= touches.length;
							nCenterPoint.x -= self.canvas.offsetLeft;
							nCenterPoint.y -= self.canvas.offsetTop;
							var leftUpPiont = {
								"x": 0,
								"y": 0
							};
							var dc = Math.sqrt(Math.pow(imgContainer.regX * imgContainer.scaleX, 2) + Math.pow(imgContainer.regY * imgContainer.scaleY, 2));
							var r = Math.atan2(imgContainer.regY, imgContainer.regX);
							r = 180 / Math.PI * r;
							leftUpPiont.x = imgContainer.x - Math.cos(Math.PI * (imgContainer.rotation + r) / 180) * dc;
							leftUpPiont.y = imgContainer.y - Math.sin(Math.PI * (imgContainer.rotation + r) / 180) * dc;
							nCenterPoint.x -= leftUpPiont.x;
							nCenterPoint.y -= leftUpPiont.y;
							var dc = Math.sqrt(Math.pow(nCenterPoint.x, 2) + Math.pow(nCenterPoint.y, 2));
							var r = Math.atan2(nCenterPoint.y, nCenterPoint.x);
							r = 180 / Math.PI * r;
							var newRegX = dc * Math.cos(Math.PI * (r - imgContainer.rotation) / 180) / imgContainer.scaleX;
							var newRegY = dc * Math.sin(Math.PI * (r - imgContainer.rotation) / 180) / imgContainer.scaleY;
							var dx = newRegX - imgContainer.regX;
							var dy = newRegY - imgContainer.regY;
							imgContainer.regX += dx;
							imgContainer.regY += dy;
							var dc = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
							var r = Math.atan2(dy, dx);
							r = 180 / Math.PI * r;
							imgContainer.x += dc * Math.cos(Math.PI * (imgContainer.rotation + r) / 180) * imgContainer.scaleX;
							imgContainer.y += dc * Math.sin(Math.PI * (imgContainer.rotation + r) / 180) * imgContainer.scaleY
						}
					};
					img.fnMove = function(e) {
						var touches = [];
						var isMultiTouch = img.touchStart.length > 1 ? true : false;
						if (!isMultiTouch) {
							touches = [{
								"x": e.eventX,
								"y": e.eventY
							}]
						} else {
							touches = [{
								"x": e.rawEvent.touches[0].pageX,
								"y": e.rawEvent.touches[0].pageY
							}, {
								"x": e.rawEvent.touches[1].pageX,
								"y": e.rawEvent.touches[1].pageY
							}]
						}
						if (!info.disScale && isMultiTouch && !e.eventTarget.parent.locked) {
							var dis = Math.sqrt(Math.pow(touches[1].x - touches[0].x, 2) + Math.pow(touches[1].y - touches[0].y, 2));
							if (img.startScaleDistance) {
								var newScale = dis * imgContainer.scaleX / img.startScaleDistance;
								imgContainer.scaleX = newScale;
								imgContainer.scaleY = newScale
							}
							img.startScaleDistance = dis
						}
						if (!info.disMove && img.moveabled&& !e.eventTarget.parent.locked) {
							var disX = 0,
								disY = 0;
							for (var i = 0; i < touches.length; i++) {
								disX += touches[i].x - img.touchStart[i].x;
								disY += touches[i].y - img.touchStart[i].y
							}
							disX = disX / touches.length;
							disY = disY / touches.length;
							imgContainer.x += disX;
							imgContainer.y += disY;
							img.touchStart = touches
						}
						if (isMultiTouch) {
							var dx = img.touchStartScale[1].x - img.touchStartScale[0].x;
							var dy = img.touchStartScale[1].y - img.touchStartScale[0].y;
							var r1 = Math.atan2(dy, dx);
							r1 = 180 / Math.PI * r1;
							var dx = touches[1].x - touches[0].x;
							var dy = touches[1].y - touches[0].y;
							var r2 = Math.atan2(dy, dx);
							r2 = 180 / Math.PI * r2;
							imgContainer.rotation = img.imgContainerStartRotation + r2 - r1
						}
					};
					img.fnEnd = function(e) {
						img.moveabled = false;
						var isMultiTouch = e.rawEvent && e.rawEvent.touches[1];
						if (!isMultiTouch) {
							img.curW = imgContainer.getCurrentWidth();
							img.curH = imgContainer.getCurrentHeight();
							img.moveabled = true;
							img.touchStart = [{
								"x": e.eventX,
								"y": e.eventY
							}];
							delete img.startScaleDistance
						} else {
							var touch1 = e.rawEvent.touches[0];
							var touch2 = e.rawEvent.touches[1];
							img.startScaleDistance = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
							img.touchStart = [{
								"x": touch1.pageX,
								"y": touch1.pageY
							}, {
								"x": touch2.pageX,
								"y": touch2.pageY
							}]
						}
					};
					img.addEventListener("touchstart", function(e) {
						if (this.locked) {
							return false;
						};
						img.fnStart(e)
					});
					img.addEventListener("touchmove", function(e) {
						if (self.activeTarget.locked) {
							return false;
						};
						img.fnMove(e)
					});
					img.addEventListener("touchend", function(e) {
						if (self.activeTarget.locked) {
							return false;
						};
						img.fnEnd(e)
					})
				}
				imgContainer.enEditable = function() {
					if (info.disable || this.locked) {
						return
					}
					border.visible = true;
					if (mcClose) {
						mcClose.visible = true
					}
				};
				imgContainer.disable = function() {
					border.visible = false;
					if (mcClose) {
						mcClose.visible = false
					}
				};
				img.update = function() {
					if (imgContainer && imgContainer.scaleX) {
						if (mcClose && mcClose.scaleX) {
							mcClose.scaleX = 1 / imgContainer.scaleX;
							mcClose.scaleY = 1 / imgContainer.scaleY;
							mcClose.x = 0
						}
					}
				};
				imgContainer.addChild(img);
				self.stage.update = function() {};
				imgContainer.update = function() {};
				self.stage.addChild(imgContainer);
				if (self.imgs) {
					self.imgs.push(imgContainer)
				} else {
					self.imgs = [imgContainer]
				}
				return imgContainer
			};
			_public.clear = function() {
				if (this.imgs) {
					for (var i = 0; i < this.imgs.length; i++) {
						this.stage.removeChild(this.imgs[i])
					}
				}
			};
			_public.unSelect = function() {
				var imgs = this.imgs;
				if (imgs) {
					for (var i = 0; i < imgs.length; i++) {
						imgs[i].disable()
					}
				}
			};
			_public.toDataURL = function(callback) {
				var self = this;
				self.unSelect();
				window.setTimeout(function() {
					var encoder = new JPEGEncoder();
					var data = encoder.encode(self.canvas.getContext("2d").getImageData(0, 0, self.stage.width, self.stage.height), 90);
					callback.call(self, data)
				}, 1000 / self.set.fps)
			};
			_public.update = function() {
				this.stage.updatePosition()
			};
			_public.remove = function(id) {
				this.stage.removeChildById(id);
			};
			_public.lock = function(id) {
				this.stage.getChildById(id).disable();
				this.stage.getChildById(id).locked = true;
				this.stage.getChildById(id).removeEventListener('touchstart');
				this.stage.getChildById(id).removeEventListener('touchmove');
				this.stage.getChildById(id).removeEventListener('touchend');
			};
			_public.unlock = function(id) {
				this.stage.getChildById(id).locked = false;
			};
		})
	})()
})();