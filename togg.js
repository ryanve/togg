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

    function has(element, attr) {
      return element.attr(attr) != null
    }

    var value = {'true': '', 'false': null}
    var force = {'true': true, 'false': false}

    return {
      restrict: 'A',
      link: function (scope, element, atts) {
        var event = atts.toggEvent
        if (!event) throw new Error('Missing event')

        element.on(event, function() {
          var state = read(scope, element.attr('togg-state'))
          var useForce = null == state ? state : force.hasOwnProperty(state)

          pool(element).each(function() {
            var it = angular.element(this)
            var classes = read(scope, it.attr('togg-class'))
            var prop = read(scope, it.attr('togg-prop'))
            var attr = read(scope, it.attr('togg-attr'))
            var method = read(scope, it.attr('togg-method'))
            var trigger = read(scope, it.attr('togg-trigger'))

            if (classes) useForce ? it.toggleClass(classes, force[state]) : it.toggleClass(classes)
            if (attr) it.attr(attr, value[useForce ? force[state] : !has(it, attr)])
            if (prop) it.prop(prop, useForce ? force[state] : !it.prop(prop))
            if (method) it[method]()
            if (trigger) it.trigger(trigger)
          })
        })
      }
    }
  })
}(window.angular || require('angular'));
