(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{ptlx:function(e,r,n){"use strict";n.r(r),n.d(r,"URTCarouselScrollerV2",(function(){return f}));n("M+/F"),n("z84I");var t=n("ERkP"),o=n("fs1G"),a=n("BKvV"),i=n("b1wW"),c=n("IRWI"),u=n("Irs7"),s=n("MWbm"),l=n("6iuV"),d=n("rHpw"),f=t.forwardRef((function(e,r){e.assumedItemHeight;var n=e.anchoring,d=(void 0===n&&c.a,e.identityFunction),f=e.items,b=(e.minimumOffscreenToViewportRatio,e.nearEndProximityRatio,e.nearStartProximityRatio,e.noItemsRenderer),R=void 0===b?p:b,g=(e.preferredOffscreenToViewportRatio,e.onAtEnd),w=(void 0===g&&o.a,e.onAtStart),h=(void 0===w&&o.a,e.onNearEnd),y=(void 0===h&&o.a,e.onNearStart),k=(void 0===y&&o.a,e.onPositionRestored),C=(void 0===k&&o.a,e.renderer),E=t.useContext(a.a),I=E.numRowsFromMetadata,T=E.scrollerDisplayType,V=void 0===T?i.a.Carousel:T,x=I||m(f.length,V),A=t.useRef(0),F=Object(u.b)();t.useImperativeHandle(r,(function(){return{isAtTop:function(){return!0},scrollToTop:function(){return Object(o.a)()},adjustFocusBy:function(e){return Object(o.a)()}}}));var O=t.useMemo((function(){for(var e=[],r=0,n=0;r<f.length;r+=x,n++){var o=f.slice(r,r+x),a=t.createElement(s.a,{key:n},o.map((function(e){return t.createElement(t.Fragment,{key:d(e)},C(e))})));e.push(a)}return A.current=e.length,e}),[d,f,x,C]),S=t.useCallback((function(e){var r=e.index,n=e.intersectionRatio;r===A.current-1&&1===n&&F.scribeAction("reached_end")}),[F,A]),j=t.useCallback((function(e){var r=e.previous,n=e.next;r>n?F.scribeAction("scroll_left"):r<n&&F.scribeAction("scroll_right")}),[F]);return f.length?t.createElement(l.a,{onScroll:j,onVisibleRangeChange:S,style:v.root},O):R()})),p=function(){return null},m=function(e,r){return r===i.a.GridCarousel&&e>=8?e<12?2:3:1},v=d.a.create((function(e){return{root:{marginHorizontal:e.spaces.space4,marginVertical:e.spaces.space4}}}));r.default=f}}]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/client-web-legacy/ondemand.CarouselScrollerV2.9f3c5de5.js.map