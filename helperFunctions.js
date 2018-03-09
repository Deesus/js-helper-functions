'use strict';

// Adds CSS property directly to <style> tag:
function addStylesToDOM (selectorName, attributes) {
    var output = '';

    for(var x in attributes) {
        if (attributes.hasOwnProperty(x)) {
            output += x + ':' + attributes[x] + ';';
        }
    }
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', '<style>' + selectorName + '{' + output + '}' + '</style>');
}
