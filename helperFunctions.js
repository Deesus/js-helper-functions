'use strict';

  /// -----------------------------------------------------------------------
  /// Adds CSS a property directly to <style> tag
  /// This is useful when you need to dynamically compute a CSS value (e.g. branding color) and modify a CSS class accordingly.
  /// 
  /// Args:
  ///   - selector {string}: CSS selector name
  ///   - cssAttributes {object}: an object literal of attributes and values
  ///
  /// Example:
  ///   addStylesToDOM('#main', {color: 'blue', 'border-left': '1px solid gray'});
  function addStylesToDOM (selector,
                           cssAttributes)
  {
    var outputString = '';
    var headElement  = document.getElementsByTagName('head')[0];

    // loop through css properties and 
    for (var attribute in cssAttributes)
    {
      if (cssAttributes.hasOwnProperty(attribute))
      {
        outputString += attribute + ':' + cssAttributes[attribute] + ';';
      }
    }

    // append the string before the end of the <head> tag:
    headElement.insertAdjacentHTML('beforeend',
                                   '<style>' + selector + '{' + output + '}' + '</style>');
  }
