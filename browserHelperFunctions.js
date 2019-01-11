'use strict';
/**
 * Browser Helper Functions
 *
 * Author:  Dee Reddy
 * License: BSD-2
 * Repo:    https://github.com/Deesus/js-helper-functions
 */


/**
 * Adds CSS a property directly to <style> tag
 * This is useful when you need to dynamically compute a CSS value (e.g. branding color) and modify a CSS class accordingly.
 *
 * @param selector {string}: CSS selector name
 * @param cssAttributes {object}: an object literal of attributes and values
 *
 * @returns {undefined} (side-effect): Modifies browser's DOM; adds `<style>` tag
 *
 * Example:
 *      addStylesToDOM('#main', {color: 'blue', 'border-left': '1px solid gray'});
 */
const addStylesToDOM =  (selector, cssAttributes)  => {
    let outputString = '';
    let headElement  = document.getElementsByTagName('head')[0];

    // loop through CSS properties:
    for (let attribute in cssAttributes) {
        if (cssAttributes.hasOwnProperty(attribute)) {
            outputString += `${attribute}:${cssAttributes[attribute]};`;
        }
    }

    // append the string before the end of the <head> tag:
    headElement.insertAdjacentHTML('beforeend',
                                   `<style>${selector}{${outputString}}</style>`);
};


/**
 * Discerns if the current device is a mobile device.
 *
 * @returns {boolean}: true/false if user device is a mobile device (but not a tablet)
 */
const deviceIsMobile = () => {
    let isMobile = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    return isMobile;
};


/**
 * Discerns if the current device is a tablet device.
 *
 * @returns {boolean}: true/false if user device is a tablet device (but not a phone)
 */
const deviceIsTablet = () => {
    let isTablet = false;
    let userAgent = navigator.userAgent.toLowerCase();

    if (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(userAgent)) {
        // if it's an Android device, we must do an additional check:
        if (userAgent.search("android") >= 0) {
            // is Android so check to see if the user agent contains "mobile" which
            // doesn't exist for an Android tablet
            if (userAgent.search("mobile") === -1) {
                // does not contain "mobile" so should be a tablet:
                isTablet = true;
            }
        }
        // non-Android; thus, it's a tablet:
        else {
            isTablet = true;
        }
    }

    return isTablet;
};


/**
 * Validates email addresses (simple)
 * Note: Trims string before validating. Doesn't allow empty strings.
 *
 * @param emailString {string}: email address to test
 *
 * @returns {boolean}: true/false if string is a valid email address
 */
const isEmailValid = (emailString) => {
    let isEmailValid;
    let regexValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // checks for valid email

    emailString     = emailString.trim();
    isEmailValid    = regexValidEmail.test(emailString);

    return isEmailValid;
};


/**
 * Discerns if the user is using a Mac device/OS.
 *
 * @returns {boolean}: true/false if user device is a Mac device
 */
const isMacDevice = () => {
    let isMac = false;

    // TODO: do we want to replace falsey statements with `navigator !== undefined`, `navigator !== null`, etc.?
    if ((navigator) &&
        (navigator.platform) &&
        (navigator.platform.match(/(Mac|iPhone|iPad)/) !== null)) {
        isMac = true;
    }

    return isMac;
};


/**
 * Navigates to the passed url.
 *
 * @param url {string}: url to navigate to
 * @param shouldNavigateToNewTab {boolean}: true/false if navigation should appear in a new tab (rather than a new window).
 * N.b. this browsers may respond by interpreting this as a popup and blocking it.
 *
 * @returns {undefined} (side-effect): the browser navigates to a new page
 */
const navigateToUrl = (url, shouldNavigateToNewTab) => {

    if (shouldNavigateToNewTab === true) {
        window.open(url, '_blank');
    }
    else {
        window.location.href = url;
    }
};


/**
 * Initializes custom event w/ IE11 polyfill.
 *
 * Usage:
 *      // create new event:
 *      let myEvent = initCustomEvent('NAME_OF_CUSTOM_EVENT');
 *
 *      // dispatch event:
 *      document.dispatchEvent(myEvent);
 *
 *      // listen to event:
 *      document.addEventListener(CUSTOM_EVENT_NAME, CALLBACK_FUNCTION);
 *
 * @param customEventName {string}: the name of your custom event
 *
 * @returns {Event}: the event interface <https://developer.mozilla.org/en-US/docs/Web/API/Event>
 */
// TODO: perhaps combine the separate custom event functions into a single interface?
const initCustomEvent = (customEventName) => {
    let event;

    // initialize new custom event:
    // IE11 (& below) is unable to use the `Event()` constructor,
    // so we use a polyfill (n.b. dispatching events is the same in both cases):
    try {
        event = new Event(customEventName);
    }
    // IE utilizes the deprecated `initEvent()` function:
    catch (error) {
        event = document.createEvent("Event");

        event.initEvent(customEventName,  // emitted event name
                false,            // doesn't bubble
              false);           // isn't cancelable
    }

    return event;
};


/**
 * Introspects a DOM element's style attribute.
 *
 * @param el: node/element that is being inspected
 * @param property: CSS property to calculate (N.b. shorthand properties are not valid. E.g `border-bottom`
 *                  is valid while `border` is not.)
 *
 * @returns {string}: calculated value.
 */
const computedStyle = (el, property) => {
    return window.getComputedStyle(el, null).getPropertyValue(property);
};


/**
 * Set inline-styles of an element by passing in an object of key-value pairs.
 *
 * N.b. that the styles are appended inline; however, it DOES NOT override the entire `style` property;
 * thus, allowing existing inline styles to remain on the element.
 *
 * @param el: element/node object
 * @param stylesObject {object}: key-value pairs of CSS property and values, respectively
 *
 * @returns {undefined} (side-effect): inline styles added to element
 */
// TODO: add 'overloads' to function signature: 1. getter if no args passed; 2. accept string if passed as arg
const css = (el, stylesObject) => {

    for (let key in stylesObject) {
        if(stylesObject.hasOwnProperty(key)) {
            el.style[key] = stylesObject[key];
        }
    }
};


// ==================================================
// module exports:
// ==================================================
export {
    addStylesToDOM,
    deviceIsMobile,
    deviceIsTablet,
    isEmailValid,
    isMacDevice,
    navigateToUrl,
    initCustomEvent,
    computedStyle,
    css
};
