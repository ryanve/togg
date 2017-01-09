!function(angular) {
  angular.module('togg', []).directive('toggEvent', function() {

    function related(id) {
      return angular.element('[togg-scope="' + id + '"]')
    }

    function pool(stack) {
      stack = stack.closest('[togg-scope]')
      if (!stack.length) throw new Error('Missing scope')
      var id = stack.attr('togg-scope')
      stack = id ? related(id) : stack
      return stack.add(stack.find('*'))
    }

    function read(scope, value) {
      return value && '{' === value[0] ? scope.$eval(value) : value
    }

    return {
      restrict: 'A',
      link: function (scope, element, atts) {
        var event = atts.toggEvent
        if (!event) throw new Error('Missing event')

        element.on(event, function() {
          pool(element).each(function() {
            var it = angular.element(this)
            var classes = read(scope, it.attr('togg-class'))
            var prop = read(scope, it.attr('togg-prop'))
            var attr = read(scope, it.attr('togg-attr'))
            var method = read(scope, it.attr('togg-method'))
            var trigger = read(scope, it.attr('togg-trigger'))

            if (classes) it.toggleClass(classes)
            if (attr) it.attr(attr, null == it.attr(attr) ? '' : null)
            if (prop) it.prop(prop, !it.prop(prop))
            if (method) it[method]()
            if (trigger) it.trigger(trigger)
          })
        })
      }
    }
  })
}(window.angular || require('angular'));
