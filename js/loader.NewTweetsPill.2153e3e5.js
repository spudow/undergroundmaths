(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{o52z:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("VPAj"),i=Object(n.a)([]);Object(n.a)({})},xAHt:function(e,t,r){"use strict";r.r(t),r.d(t,"NewTweetsPill",(function(){return Z}));r("OZaJ"),r("+KXO"),r("1t7P"),r("LW0h"),r("daRM"),r("jwue"),r("+oxZ"),r("FtHn");var n=r("VrFO"),i=r.n(n),o=r("Y9Ll"),a=r.n(o),s=r("1Pcy"),c=r.n(s),l=r("5Yy7"),u=r.n(l),p=r("N+ot"),h=r.n(p),m=r("AuHH"),f=r.n(m),d=r("KEM+"),w=r.n(d),y=(r("2G9S"),r("uFXj"),r("ERkP")),b=(r("z84I"),r("lnti")),v=r("rxPX"),g=r("hqKg"),O=r("o52z"),_=r("G6rE"),j=function(e,t){return t.alert&&t.alert.userIds||Object(O.a)()},D=Object(v.a)().propsFromState((function(){return{userImageUrls:Object(g.createSelector)(_.e.selectAll,j,(function(e,t){return t?Object(b.a)(t.map((function(t){var r=e[t];return r?r.profile_image_url_https:void 0}))):[]}))}})).withAnalytics(),S=r("3XMw"),P=r.n(S),I=r("Lsrn"),T=r("k/Ka");function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){w()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(T.a)("svg",A(A({},e),{},{accessibilityHidden:void 0===e.accessibilityLabel,style:[I.a.root,e.style],viewBox:"0 0 24 24"}),y.createElement("g",null,y.createElement("path",{d:"M18.707 10.293l-6-6c-.39-.39-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L11 7.414V20c0 .553.447 1 1 1s1-.447 1-1V7.414l4.293 4.293c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"})))};E.metadata={width:24,height:24};var L=E,R=r("IbOt"),x=r("fs1G"),C=r("rcen"),M=r("MWbm"),H=r("I4+6"),V=r("rHpw"),z=r("cm6r"),F=r("MAI/"),U=r("t62R");function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function X(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach((function(t){w()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=f()(e);if(t){var i=f()(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return h()(this,r)}}var G=P.a.gdb8bdcc,J=P.a.ac0f6491,N={component:"new_tweet_prompt"},W={},Y={},Z=function(e){u()(r,e);var t=B(r);function r(){var e;i()(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return e=t.call.apply(t,[this].concat(o)),w()(c()(e),"state",{show:!1}),w()(c()(e),"_getLastShownTime",(function(){return Y[e.props.timelineId]})),w()(c()(e),"_attemptShow",(function(){var t=e.props,r=t.alert,n=t.timelineId,i=t.unreadCount;if(e._timeoutID&&(clearTimeout(e._timeoutID),e._timeoutID=null),e._mounted&&(r||i>0)){var o=e._getDelayRemaining();o<=0?(e.setState({show:!0}),W[n]=Date.now(),e._scribeAction("show")):e._timeoutID=setTimeout(e._attemptShow,o)}})),w()(c()(e),"_handleScrollDown",(function(){var t=e.props,r=t.remainVisibleInterval,n=t.alert,i=t.timelineId,o=r;n&&n.displayDurationMs&&n.displayDurationMs>-1&&(o=n.displayDurationMs),e.state.show&&Date.now()>=W[i]+o&&(e._scribeAction("dismiss"),e._hide())})),w()(c()(e),"_handleClick",(function(){e._scribeAction("click"),window.scrollTo(0,0),e._hide()})),e}return a()(r,[{key:"componentDidMount",value:function(){this._mounted=!0,this._getLastShownTime()||this._updateLastShownTime(this.props.timelineId),this._attemptShow(),this._cancelMomentum=Object(R.a)({onUp:x.a,onDown:this._handleScrollDown})}},{key:"componentDidUpdate",value:function(e,t){var r=this.props,n=r.unreadCount,i=r.alert,o=r.timelineId,a=e.timelineId!==o,s=a&&!this._getLastShownTime();a?(s&&this._updateLastShownTime(o),t.show&&this._updateLastShownTime(e.timelineId),e.removeAlert&&e.removeAlert(),this.setState({show:!1}),this._attemptShow()):((i&&!t.show||n>e.unreadCount)&&this._attemptShow(),!e.alert&&0!==n||i||this._hide())}},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.timelineId,r=e.removeAlert;this._mounted=!1,this._timeoutID&&clearTimeout(this._timeoutID),this.state.show&&(this._updateLastShownTime(t),r&&r()),this._cancelMomentum()}},{key:"render",value:function(){var e,t=this.props,r=t.alert,n=t.userImageUrls,i=this.state.show;e=r?r.richText&&y.createElement(C.c,{entities:r.richText.entities,text:r.richText.text}):G;var o=H.a.generate({backgroundColor:V.a.theme.colors.primary,color:V.a.theme.colors.whiteOnColor});return y.createElement(M.a,{accessibilityRole:"status"},y.createElement(z.a,{accessibilityHidden:!i,accessibilityLabel:J,accessibilityRole:"button",interactiveStyles:o,onClick:this._handleClick,style:[q.pill,i&&q.show]},y.createElement(M.a,{style:q.innerPill},y.createElement(L,{style:q.icon}),n&&n.length>0?y.createElement(M.a,{style:q.facepile},y.createElement(F.a,{borderColor:"primary",userAvatarSize:"large",userAvatarUrls:n})):null,y.createElement(U.c,{color:"whiteOnColor",numberOfLines:1,style:q.pillText},e))))}},{key:"_getDelayRemaining",value:function(){var e=this.props,t=e.triggerDelay,r=e.alert,n=r&&r.triggerDelayMs||t;return this._getLastShownTime()+n-Date.now()}},{key:"_updateLastShownTime",value:function(e){e&&(Y[e]=Date.now())}},{key:"_hide",value:function(){var e=this.props,t=e.alert,r=e.removeAlert,n=e.timelineId;this._mounted&&(this._updateLastShownTime(n),this.setState({show:!1})),t&&setTimeout((function(){return r()}),500)}},{key:"_scribeAction",value:function(e){var t=this.props,r=t.analytics,n=X(X(X({},t.scribeNamespace),N),{},{action:e});r.scribe(n)}}]),r}(y.PureComponent);w()(Z,"defaultProps",{remainVisibleInterval:3e3,triggerDelay:24e4,unreadCount:0});var q=V.a.create((function(e){return{pill:{boxShadow:e.boxShadows.small,backgroundColor:e.colors.primary,borderRadius:e.borderRadii.infinite,paddingHorizontal:e.spaces.space16,opacity:0,justifyContent:"center",transform:[{translate3d:"0, 0, 0"}],transitionProperty:"transform, opacity",transitionDuration:"0.15s",transitionTimingFunction:"ease, ease, step-end"},innerPill:{flexDirection:"row",paddingVertical:e.spaces.space4},icon:{width:e.spaces.space20,marginRight:e.spaces.space4,alignSelf:"center",color:e.colors.whiteOnColor},facepile:{marginRight:e.spaces.space8},pillText:{alignSelf:"center"},show:{opacity:1,transitionTimingFunction:"ease, ease, step-start",transform:[{translate3d:"0, 3.5em, 0"}]}}})),Q=D(Z);t.default=Q}}]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/client-web-legacy/loader.NewTweetsPill.2153e3e5.js.map