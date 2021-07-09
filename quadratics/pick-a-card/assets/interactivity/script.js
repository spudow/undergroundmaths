(function(){

  var cmDispatchEvent = function(element, event){
    try{
      element.dispatchEvent(new Event(event));
    }catch(ex){
      try{
        element.dispatchEvent(document.createEvent('Event').initEvent(event));
      }finally{}
    }
  };

  function gcd(a, b){
    if(Array.isArray(a)){
      if(a.length == 0){
        return 1;
      }
      var res = a[0];
      for(var i=1;i<a.length;i++){
        res = gcd(a[i], res);
      }
      return res;
    }
    if((a && Math.abs(a) < 1) || (b && Math.abs(b) < 1)){
      return 1;
    }
    if(b){
      return gcd(b, a % b);
    }else{
      return Math.abs(a);
    }
  };

  var tolerance = 0.000001;

  var numToString = function(num) {
    var whole = Math.floor(Math.abs(num));
    var frac = Math.abs(num) - whole;
    if(Math.abs(frac) < tolerance){
      return (num < 0 ? '-' : '') + whole.toFixed(0);
    }
    var max = 1000;
    var n = 2;
    var remainder = frac;
    var factor = 1;
    while(n <= max){
      if(Math.abs(Math.floor(remainder) - remainder) < tolerance || Math.abs(Math.ceil(remainder) - remainder) < tolerance){
        break;
      }
      remainder = frac * n;
      factor = n;
      n++;
    }
    remainder = Math.round(remainder);
    var gcdfrac = gcd(factor, remainder);
    var numerator = remainder/gcdfrac;
    var denominator = factor/gcdfrac;
    if(Math.abs(numerator - denominator) < tolerance){
      return (num < 0 ? '-' : '') + whole.toFixed(0);
    }
    return (num < 0 ? '-' : '') + (whole == 0 ? '' : whole.toFixed(0)) + '\\frac{'+numerator.toFixed(0)+'}{'+denominator.toFixed(0)+'}';
  };

  var isInt = function(value) {
    return !isNaN(value) && parseInt(value, 10) == value;
  };

  var app = angular.module('App', ['ngSanitize']);

  app.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider){
    $locationProvider.html5Mode({enabled: true, requireBase:false, rewriteLinks: false});
  }]);

  app.controller('MainController', ['$scope', '$timeout', '$sce', function($scope, $timeout, $sce) {
    $scope.viewModel = $scope.viewModel || {};
    $scope.viewModel.cards = [];
    $scope.viewModel.maxRootSize = 8;
    $scope.viewModel.maxInterceptSize = 10;
    $scope.viewModel.aFixed = false;
    $scope.viewModel.specifyingNewNumbers = false;
    $scope.viewModel.bracket1xText = null;
    $scope.viewModel.bracket1cText = null;
    $scope.viewModel.bracket2xText = null;
    $scope.viewModel.bracket2cText = null;
    $scope.viewModel.bracket1xTextValid = function(){
      return $scope.viewModel.bracket1xText && isInt($scope.viewModel.bracket1xText);
    };
    $scope.viewModel.bracket1cTextValid = function(){
      return $scope.viewModel.bracket1cText != null && isInt($scope.viewModel.bracket1cText);
    };
    $scope.viewModel.bracket2xTextValid = function(){
      return $scope.viewModel.bracket2xText && isInt($scope.viewModel.bracket2xText);
    };
    $scope.viewModel.bracket2cTextValid = function(){
      return $scope.viewModel.bracket2cText != null && isInt($scope.viewModel.bracket2cText);
    };
    $scope.generateDataFromSpecified = function(bracket1x, bracket1c, bracket2x, bracket2c){
      if(!bracket1x || !bracket2x){
        return;
      }
      $scope.viewModel.bracket1x = bracket1x;
      $scope.viewModel.bracket1c = bracket1c;
      $scope.viewModel.bracket2x = bracket2x;
      $scope.viewModel.bracket2c = bracket2c;
      $scope.computeData();
      $scope.updateSpecifyNumbersText();
    };
    $scope.cancelSpecifyNumbers = function(){
      $scope.updateSpecifyNumbersText();
      $scope.viewModel.specifyingNewNumbers = false;
    };
    $scope.areSpecifiedNumbersValid = function(){
      return $scope.viewModel.bracket1xTextValid() && $scope.viewModel.bracket1cTextValid() && $scope.viewModel.bracket2xTextValid() && $scope.viewModel.bracket2cTextValid();
    }
    $scope.useSpecifiedNumbers = function(){
      if(!$scope.areSpecifiedNumbersValid()){
        return;
      }
      $scope.generateDataFromSpecified(Number($scope.viewModel.bracket1xText), Number($scope.viewModel.bracket1cText), Number($scope.viewModel.bracket2xText), Number($scope.viewModel.bracket2cText));
      $scope.viewModel.specifyingNewNumbers = false;
      $scope.processContent();
    };
    $scope.generateRandomData = function(){
      $scope.viewModel.bracket1x = $scope.viewModel.aFixed ? 1 : $scope.generateRandomInteger([[-2,-1], [1,2]]);
      $scope.viewModel.bracket2x = $scope.viewModel.aFixed ? 1 : $scope.generateRandomInteger([[-2,-1], [1,2]]);
      var bracketxgcd = gcd($scope.viewModel.bracket1x, $scope.viewModel.bracket2x);
      var max1 = Math.max(1, Math.floor(bracketxgcd * $scope.viewModel.maxRootSize))
      $scope.viewModel.bracket1c = $scope.viewModel.bracket1x/bracketxgcd * $scope.generateRandomInteger([[-max1, max1]]);
      var max2 = Math.max(1, Math.floor(bracketxgcd * Math.min($scope.viewModel.maxRootSize, Math.floor($scope.viewModel.maxInterceptSize/Math.max(1, Math.abs($scope.viewModel.bracket1c * $scope.viewModel.bracket2x))))));
      $scope.viewModel.bracket2c = $scope.viewModel.bracket2x/bracketxgcd * $scope.generateRandomInteger([[-max2, -1], [1, max2]]);
      $scope.computeData();
      $scope.updateSpecifyNumbersText();
    };
    $scope.computeData = function(){
      $scope.viewModel.a = $scope.viewModel.bracket1x * $scope.viewModel.bracket2x;
      $scope.viewModel.root1 = -$scope.viewModel.bracket1c / $scope.viewModel.bracket1x;
      $scope.viewModel.root2 = -$scope.viewModel.bracket2c / $scope.viewModel.bracket2x;
      $scope.viewModel.b = -$scope.viewModel.a * ($scope.viewModel.root1 + $scope.viewModel.root2);
      $scope.viewModel.c = $scope.viewModel.a * $scope.viewModel.root1 * $scope.viewModel.root2;
      $scope.viewModel.turnPoint = {x: -$scope.viewModel.b/($scope.viewModel.a * 2), y: $scope.viewModel.c - $scope.viewModel.b * $scope.viewModel.b/($scope.viewModel.a * 4)};
      $scope.viewModel.maxComputedRootSize = Math.max(Math.abs($scope.viewModel.root1), Math.abs($scope.viewModel.root2));
      $scope.viewModel.leftPoint = {};
      $scope.viewModel.leftPoint.x = -($scope.viewModel.maxComputedRootSize + 2);
      $scope.viewModel.leftPoint.y = $scope.getFunctionValue($scope.viewModel.leftPoint.x);
      $scope.viewModel.rightPoint = {};
      $scope.viewModel.rightPoint.x = $scope.viewModel.maxComputedRootSize + 2;
      $scope.viewModel.rightPoint.y = $scope.getFunctionValue($scope.viewModel.rightPoint.x);
      $scope.viewModel.maxValue = Math.max($scope.viewModel.leftPoint.y, $scope.viewModel.turnPoint.y, $scope.viewModel.rightPoint.y);
      $scope.viewModel.minValue = Math.min($scope.viewModel.leftPoint.y, $scope.viewModel.turnPoint.y, $scope.viewModel.rightPoint.y);
    };
    $scope.updateSpecifyNumbersText = function(){
      $scope.viewModel.bracket1xText = $scope.viewModel.bracket1x;
      $scope.viewModel.bracket1cText = $scope.viewModel.bracket1c;
      $scope.viewModel.bracket2xText = $scope.viewModel.bracket2x;
      $scope.viewModel.bracket2cText = $scope.viewModel.bracket2c;
    };
    $scope.generateRandomInteger = function(ranges){
      var totalNums = 0;
      var lastNum = null;
      for(var i=0;i<ranges.length;i++){
        if(ranges[i].length > 0){
          totalNums += ranges[i][ranges[i].length - 1] - ranges[i][0] + 1;
          lastNum = ranges[i][ranges[i].length - 1];
        }
      }
      if(totalNums <= 0){
        return null;
      }
      var rnd = Math.random();
      var width = 1/totalNums;
      var pos = 0;
      for(var i=0;i<ranges.length;i++){
        if(ranges[i].length > 0){
          for(var j = ranges[i][0]; j<= ranges[i][ranges[i].length - 1]; j++){
            pos += width;
            if(rnd < pos){
              return j;
            }
          }
        }
      }
      return lastNum;
    };
    $scope.termToStringWithSign = function(coefficient, str, isFirst, isOnly){
      var sign = (coefficient < 0) ? '-' : (isFirst ? '' : '+');
      if(coefficient == 0){
        if(isOnly){
          return '0';
        }else{
          return '';
        }
      }
      if(Math.abs(coefficient) == 1){
        if(str == null || str == ''){
          return sign + numToString(Math.abs(coefficient));
        }else{
          return sign + str;
        }
      }
      return sign + numToString(Math.abs(coefficient)) + (str || '');
    };
    $scope.coefficientToStringWithSign = function(coefficient, isFirst, isOnly){
      var sign = (coefficient < 0) ? '-' : (isFirst ? '' : '+');
      if(coefficient == 0){
        if(isOnly){
          return '0';
        }else{
          return '';
        }
      }
      if(Math.abs(coefficient) == 1){
        return sign;
      }
      return sign + numToString(Math.abs(coefficient));
    };
    $scope.processContent = function(){
      $timeout(function(){
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        $scope.createCanvas();
      });
    };
    $scope.toggleCard = function(card){
      card.shown = !card.shown;
      $scope.processContent();
    };
    $scope.getFunctionValue = function(x){
      return $scope.viewModel.a * x * x + $scope.viewModel.b * x + $scope.viewModel.c;
    };
    $scope.createCanvas = function(){
      var canvas = document.getElementById('quadratic-graph-canvas');
      if(!canvas){
        return;
      }
      var ctx = canvas.getContext('2d');
      var width = canvas.width;
      var height = canvas.height;
      var max = Math.max(Math.abs($scope.viewModel.c) + 2, Math.abs($scope.viewModel.turnPoint.y), 6);
      var xScale = ($scope.viewModel.rightPoint.x)/(width/2);
      var yScale = max/(height/2);
      var graphToScreenX = function(num){
        return num / xScale + width/2;
      };
      var graphToScreenY = function(num){
        return height/2 - num / yScale;
      };
      var screenToGraphX = function(num){
        return (num - width / 2)*xScale;
      };
      var screenToGraphY = function(num){
        return (height/2 - num)*yScale;
      };
      ctx.clearRect(0, 0, width, height);
      var minX = Math.ceil($scope.viewModel.leftPoint.x);
      var maxX = -minX;
      for(var i=minX;i<=maxX;i++){
        ctx.font = "10px 'Open Sans'";
        var text = i;
        if(i != 0){
          ctx.beginPath();
          ctx.moveTo(graphToScreenX(i), height/2);
          ctx.lineTo(graphToScreenX(i), height/2 + 5);
          ctx.strokeStyle = '#777777';
          ctx.stroke();
          ctx.fillText(i, graphToScreenX(i) - ctx.measureText(text).width/2, height/2 + 16);
        }else{
          ctx.fillText(i, graphToScreenX(i) - ctx.measureText(text).width/2, height/2 + 6);
        }
      }
      var numYLines = 6;
      var yInterval = Math.ceil(max/(numYLines*2))*2;
      for(var i=-numYLines;i<=numYLines;i++){
        if(i != 0){
          ctx.beginPath();
          ctx.moveTo(0, graphToScreenY(i *yInterval));
          ctx.lineTo(width, graphToScreenY(i * yInterval));
          ctx.strokeStyle = '#777777';
          ctx.stroke();
          ctx.font = "10px 'Open Sans'";
          var text = (i * yInterval).toFixed(0);
          ctx.fillText(text, width/2 - ctx.measureText(text).width - 6, graphToScreenY(i * yInterval) + 4);
        }
      }
      ctx.beginPath();
      ctx.moveTo(0, height/2);
      ctx.lineTo(width,height/2);
      ctx.strokeStyle = '#000000';
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width/2,0);
      ctx.lineTo(width/2,height);
      ctx.stroke();
      var rightEnd = {x: width};
      rightEnd.y = graphToScreenY($scope.getFunctionValue(screenToGraphX(rightEnd.x)));
      var leftEnd = {x: 0};
      leftEnd.y = graphToScreenY($scope.getFunctionValue(screenToGraphX(leftEnd.x)));
      var mid = {x: width/2};
      mid.y = graphToScreenY($scope.getFunctionValue(screenToGraphX(mid.x)));
      control = {};
      control.x = 2 * mid.x - 0.5*leftEnd.x - 0.5*rightEnd.x;
      control.y = 2 * mid.y - 0.5*leftEnd.y - 0.5*rightEnd.y;
      ctx.beginPath();
      ctx.moveTo(leftEnd.x, leftEnd.y);
      ctx.quadraticCurveTo(control.x, control.y, rightEnd.x, rightEnd.y);
      ctx.stroke();
    };
    $scope.generateRandomData();
    $scope.generateNewNumbers = function(){
      $scope.generateRandomData();
      $scope.processContent();
    };
    $scope.resetCards = function(){
      $scope.viewModel.cards.forEach(function(card){
        card.shown = false;
      });
      $scope.processContent();
    };
    $scope.canResetCards = function(){
      return $scope.viewModel.cards.some(function(card){
        return card.shown;
      })
    };
    $scope.toggleAFixed = function(){
      $scope.viewModel.aFixed = !$scope.viewModel.aFixed;
      $scope.generateRandomData();
      $scope.resetCards();
    };
    $scope.printCards = function() {
      window.print();
    };
    var card;
    card = {shown: false, cardNumber: 1};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        html = '$f(x) = ' + $scope.termToStringWithSign($scope.viewModel.a, 'x^{2}', true) + $scope.termToStringWithSign($scope.viewModel.b, 'x') + $scope.termToStringWithSign($scope.viewModel.c) + '$';
      }else{
        html = '$f(x) = \\ldots$<br/><br/>(Function in form $' + ($scope.viewModel.aFixed ? '' : 'a') + 'x^2+bx+c$)';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 2};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        html = '<canvas id="quadratic-graph-canvas"></canvas>';
      }else{
        html = 'Graph of $y = f(x)$';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 3};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        html = 'The graph crosses the axes at<br/>$x = ' + numToString($scope.viewModel.root1) + '$, $x = '  + numToString($scope.viewModel.root2) + '$ and $y = ' + $scope.viewModel.c + '$.';
      }else{
        html = 'The graph crosses the axes at<br/>$x = \\ldots\\!\\ldots$, $x = \\ldots\\!\\ldots$ and $y = \\ldots\\!\\ldots$.';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 4};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        html = '$f(0) = ' + $scope.getFunctionValue(0) + '$<br/><br/> $f(1) = '  + $scope.getFunctionValue(1) + '$<br/><br/> $f(2) = ' + $scope.getFunctionValue(2) + '$';
      }else{
        html = '$f(0) = \\ldots$<br/><br/> $f(1) = \\ldots$<br/><br/> $f(2) = \\ldots$';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 5};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        html = '$f(x) = ' + $scope.termToStringWithSign($scope.viewModel.a, ($scope.viewModel.b == 0 ? '' : '(') + 'x ', true) + $scope.termToStringWithSign(-$scope.viewModel.turnPoint.x) + ($scope.viewModel.b == 0 ? '' : ')') + '^{2}' + $scope.termToStringWithSign($scope.viewModel.turnPoint.y) + '$';
      }else{
        html = '$f(x) = ' + ($scope.viewModel.aFixed ? '' : '\\ldots') + '(x\\ldots\\!\\ldots\\!\\ldots)^2 \\ldots\\!\\ldots\\!\\ldots$<br/><br/>(Function in completed square form)';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 6};
    card.getCardHtml = function(){
      var html = '';
      var maxword = $scope.viewModel.a < 0 ? 'highest' : 'lowest';

      if(this.shown){
        html = 'The ' + maxword + ' point on the graph is $(' + numToString($scope.viewModel.turnPoint.x) + ',' + numToString($scope.viewModel.turnPoint.y) + ')$.' + ($scope.viewModel.aFixed ? '' : '<br/><br/> The intercept on the $y$-axis is $' + $scope.viewModel.c + '$.');
      }else{
        html = 'The ' + ($scope.viewModel.aFixed ? 'lowest' : 'highest/lowest') + ' point on the graph is $(\\ldots\\!\\ldots,\\ldots\\!\\ldots)$.' + ($scope.viewModel.aFixed ? '' : '<br/><br/> The intercept on the $y$-axis is $\\ldots\\!\\ldots$.');
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 7};
    card.getCardHtml = function(){
      var html = '';
      var lower = -3;
      var upper = 3;
      var table = $('<table></table>');
      var row1 = $('<tr></tr>').appendTo(table).append($('<td></td>').text('$x$'));
      var row2 = $('<tr></tr>').appendTo(table).append($('<td></td>').text('$y$'));
      if(this.shown){
        for(var i=lower;i<=upper;i++){
          row1.append($('<td></td>').text('$' + i + '$'));
          row2.append($('<td></td>').text('$' + $scope.getFunctionValue(i) + '$'));
        }
      }else{
        for(var i=lower;i<=upper;i++){
          row1.append($('<td></td>').text('$' + i + '$'));
          row2.append($('<td></td>').text(''));
        }
      }
      return $sce.trustAsHtml(table[0].outerHTML);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 8};
    card.getCardHtml = function(){
      var html = '';
      if(this.shown){
        var solutionsString;
        if($scope.viewModel.root1 == $scope.viewModel.root2){
          solutionsString = 'The solution of $f(x) = 0$ is $x = ' + numToString($scope.viewModel.root1) + '$ only.'
        }else{
          solutionsString = 'The solutions of $f(x) = 0$ are $x = ' + numToString($scope.viewModel.root1) + '$ and ' + '$x = ' + numToString($scope.viewModel.root2) + '$.'
        }
        html = solutionsString + ($scope.viewModel.aFixed ? '' : '<br/><br/> $f(-2) = ' + $scope.getFunctionValue(-2) + '$');
      }else{
        html = 'The solution(s) of $f(x) = 0$ is/are $\\ldots$' + ($scope.viewModel.aFixed ? '' : '<br/><br/><br/> $f(-2) = \\ldots$');
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    card = {shown: false, cardNumber: 9};
    card.getCardHtml = function(){
      var html = '';
      var gcd1 = Math.abs(gcd($scope.viewModel.bracket1x, $scope.viewModel.bracket1c));
      var gcd2 = Math.abs(gcd($scope.viewModel.bracket2x, $scope.viewModel.bracket2c));
      var k = gcd1 * gcd2;
      if($scope.viewModel.a < 0){
        k = -k;
      }
      var newBracket1x = Math.abs($scope.viewModel.bracket1x)/gcd1;
      var newBracket1c = ($scope.viewModel.bracket1x < 0 ? -1 : 1) * $scope.viewModel.bracket1c/gcd1;
      var newBracket2x = Math.abs($scope.viewModel.bracket2x)/gcd2;
      var newBracket2c = ($scope.viewModel.bracket2x < 0 ? -1 : 1) * $scope.viewModel.bracket2c/gcd2;
      if(this.shown){
        var bracket1 = '(' + $scope.termToStringWithSign(newBracket1x, 'x', true) + $scope.termToStringWithSign(newBracket1c) + ')';
        if(newBracket1c == 0){
          bracket1 = $scope.termToStringWithSign(newBracket1x, 'x', true);
        }
        var bracket2 = '(' + $scope.termToStringWithSign(newBracket2x, 'x', true) + $scope.termToStringWithSign(newBracket2c) + ')';
        if(newBracket2c == 0){
          bracket2 = $scope.termToStringWithSign(newBracket2x, 'x', true);
          var temp = bracket1;
          bracket1 = bracket2;
          bracket2 = temp;
        }
        if(bracket1 == bracket2){
          bracket1 = bracket1 + '^{2}';
          bracket2 = '';
        }
        html = '$f(x) = ' + $scope.coefficientToStringWithSign(k, true) + bracket1 + bracket2 + '$';
      }else{
        html = '$f(x) = ' + ($scope.viewModel.aFixed ? '' : '\\quad') + '(\\ldots\\!\\ldots\\!\\ldots)(\\ldots\\!\\ldots\\!\\ldots)$<br/><br/>(Function in fully factorised form)';
      }
      return $sce.trustAsHtml(html);
    };
    $scope.viewModel.cards.push(card);
    $timeout(function(){
      cmDispatchEvent(window, 'cmLayoutChanged');
    });
  }]);

})();
