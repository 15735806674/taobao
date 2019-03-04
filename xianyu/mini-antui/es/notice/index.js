var noop = function noop() {};

var canIUseTransitionEnd = my.canIUse('view.onTransitionEnd');
Component({
  props: {
    className: '',
    mode: '',
    // closable,link
    action: '',
    // 文本按钮
    show: true,
    // 是否显示
    enableMarquee: false,
    // 是否开启marquee
    onClick: function onClick() {},
    marqueeProps: {
      loop: false,
      leading: 500,
      trailing: 800,
      fps: 40
    }
  },
  data: {
    animatedWidth: 0,
    overflowWidth: 0,
    duration: 0,
    marqueeStyle: '',
    canIUseTransitionEnd: canIUseTransitionEnd
  },
  didMount: function didMount() {
    if (this.props.enableMarquee) {
      if (!canIUseTransitionEnd) {
        this._measureText();

        this._startAnimation();
      } else {
        this._measureText(this.startMarquee.bind(this));
      }
    }
  },
  didUpdate: function didUpdate() {
    // 这里更新处理的原因是防止notice内容在动画过程中发生改变。
    if (!canIUseTransitionEnd) {
      this._measureText();
    }

    if (this.props.enableMarquee && !this._marqueeTimer && !canIUseTransitionEnd) {
      this._measureText();

      this._startAnimation();
    }
  },
  didUnmount: function didUnmount() {
    if (this._marqueeTimer) {
      clearTimeout(this._marqueeTimer);
      this._marqueeTimer = null;
    }
  },
  methods: {
    resetMarquee: function resetMarquee() {
      var marqueeStyle = 'transform: translateX(0px); transition: 0s all linear;';
      this.setData({
        marqueeStyle: marqueeStyle
      });
    },
    startMarquee: function startMarquee() {
      var marqueeProps = this.props.marqueeProps;
      var _this$data = this.data,
          duration = _this$data.duration,
          overflowWidth = _this$data.overflowWidth;
      var marqueeStyle = "transform: translateX(" + -overflowWidth + "px); transition: " + duration + "s all linear " + (typeof marqueeProps.leading === 'number' ? marqueeProps.leading / 1000 + "s" : '0s') + ";";
      this.setData({
        marqueeStyle: marqueeStyle
      });
    },
    onTransitionEnd: function onTransitionEnd() {
      var _this = this;

      var marqueeProps = this.props.marqueeProps;

      if (marqueeProps.loop) {
        setTimeout(function () {
          _this.resetMarquee();

          _this._measureText(_this.startMarquee.bind(_this));
        }, typeof marqueeProps.trailing === 'number' ? marqueeProps.trailing : 0);
      }
    },
    _measureText: function _measureText(callback) {
      var _this2 = this;

      if (callback === void 0) {
        callback = noop;
      }

      var fps = this.props.marqueeProps.fps; // 计算文本所占据的宽度，计算需要滚动的宽度

      my.createSelectorQuery().select(".am-notice-marquee-" + this.$id).boundingClientRect().select(".am-notice-content-" + this.$id).boundingClientRect().exec(function (ret) {
        var overflowWidth = ret && ret[0] && ret[1] && ret[0].width - ret[1].width || 0;

        _this2.setData({
          overflowWidth: overflowWidth,
          duration: overflowWidth / fps
        });

        callback();
      });
    },
    _startAnimation: function _startAnimation() {
      var _this3 = this;

      if (this._marqueeTimer) {
        clearTimeout(this._marqueeTimer);
      }

      var _this$props$marqueePr = this.props.marqueeProps,
          loop = _this$props$marqueePr.loop,
          fps = _this$props$marqueePr.fps,
          trailing = _this$props$marqueePr.trailing,
          leading = _this$props$marqueePr.leading;
      var TIMEOUT = 1 / fps * 1000;
      var isLeading = this.data.animatedWidth === 0;
      var timeout = isLeading ? leading : TIMEOUT;

      var animate = function animate() {
        var overflowWidth = _this3.data.overflowWidth;
        var animatedWidth = _this3.data.animatedWidth + 1;
        var isRoundOver = animatedWidth > overflowWidth;

        if (isRoundOver) {
          if (loop) {
            animatedWidth = 0;
          } else {
            return;
          }
        }

        if (isRoundOver && trailing) {
          _this3._marqueeTimer = setTimeout(function () {
            _this3.setData({
              animatedWidth: animatedWidth
            });

            _this3._marqueeTimer = setTimeout(animate, TIMEOUT);
          }, trailing);
        } else {
          _this3.setData({
            animatedWidth: animatedWidth
          });

          _this3._marqueeTimer = setTimeout(animate, TIMEOUT);
        }
      };

      if (this.data.overflowWidth !== 0) {
        this._marqueeTimer = setTimeout(animate, timeout);
      }
    },
    onNoticeTap: function onNoticeTap() {
      var _this$props = this.props,
          mode = _this$props.mode,
          onClick = _this$props.onClick;

      if (mode === 'link' && typeof onClick === 'function') {
        onClick();
      }
    },
    onOperationTap: function onOperationTap() {
      var _this$props2 = this.props,
          mode = _this$props2.mode,
          onClick = _this$props2.onClick;

      if (mode === 'closable' && typeof onClick === 'function') {
        onClick();
      }
    }
  }
});