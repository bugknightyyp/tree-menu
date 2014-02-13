;(function ($, window, document, undefined) {

  var pluginName = 'treeMenu',
    defaults = {
        toggle: true,
        arrawControlClose: 'fa fa-angle-left',
        arrawControlOpen: 'fa fa-angle-down',
        arrawControlOn: 'fa  fa-caret-left'
    };
      
  function TreeMenuFactory(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  TreeMenuFactory.prototype = {
      init: function () {

        var _this = this,
            _element = $(this.element);
            
        _element.find('li').each(function(index, item){
          var self = $(item);
          if (self.has('> ul').length) {
            self.find('> a')
              .append('<i class="'+ _this.settings.arrawControlClose +'"></i>')
              .end().find('> ul').hide();
          }
        });
                
        
        function switchState (elA, elUl) {
          if (elUl.is(":visible")) {
            elA.find("> i").attr('class', _this.settings.arrawControlClose);
          } else {
            elA.find("> i").attr('class', _this.settings.arrawControlOpen);
          }
          
          elUl.animate({
              height: "toggle"
            }, 'fast', function() {
          });
          
          
        }
        
        var currenItem = null;
        
        _element.on('click', 'li > a', function(e){
          var self = $(this);
          var elUl = self.next();
          
          if (_this.settings.toggle) {
            var openLi = self.parent().siblings().has('ul:visible');
            if (openLi.length) {
              openLi.each(function(index, item){
                switchState($(item).children('a'), $(item).children('ul'));
              });
            }
            
          }
          
          if (elUl.length) {
            e.preventDefault();
            switchState(self, elUl);
          } else {
            currenItem && currenItem.children('i').remove();
            self.append('<i class="'+ _this.settings.arrawControlOn +'"></i>');
            currenItem  = self;
          }
          
        });
      }
  };

  $.fn[ pluginName ] = function (options) {
      return this.each(function () {
          if (!$.data(this, 'plugin_' + pluginName)) {
              $.data(this, 'plugin_' + pluginName, new TreeMenuFactory(this, options));
          }
      });
  };

})(jQuery, window, document);