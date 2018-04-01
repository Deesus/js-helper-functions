'use strict';


// -----------------------------------------------------------------------
// Adds CSS a property directly to <style> tag
// This is useful when you need to dynamically compute a CSS value (e.g. branding color) and modify a CSS class accordingly.
// 
// Args:
//   - selector {string}: CSS selector name
//   - cssAttributes {object}: an object literal of attributes and values
//
// Example:
//   addStylesToDOM('#main', {color: 'blue', 'border-left': '1px solid gray'});
//
function addStylesToDOM (selector,
                         cssAttributes) {
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
}


// -----------------------------------------------------------------------
// Discerns if the current device is a mobile device.
function deviceIsMobile() {
    let isMobile = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    return isMobile;
}


// -----------------------------------------------------------------------
// Discerns if the current device is a tablet device.
function deviceIsTablet() {
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
}


// -----------------------------------------------------------------------
// Validates email addresses.
// Note: Trims string before validating. Doesn't allow empty strings.
function isEmailValid(emailString) {
    let isEmailValid;
    let regexValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // checks for valid email

    emailString     = emailString.trim();
    isEmailValid    = regexValidEmail.test(emailString);

    return isEmailValid;
}


// -----------------------------------------------------------------------
// Discerns if the user is using a Mac device/OS.
function isMacDevice() {
    let isMac = false;

    // TODO: do we want to replace falsey statements with `navigator !== undefined`, `navigator !== null`, etc.?
    if ((navigator) &&
        (navigator.platform) &&
        (navigator.platform.match(/(Mac|iPhone|iPad)/) !== null)) {
        isMac = true;
    }

    return isMac;
}


// -----------------------------------------------------------------------
// Navigates to the passed url.
function navigateToUrl (url) {
    window.location.href = url;
}


// -----------------------------------------------------------------------
// Opens a URL in a new tab.
function navigateToUrlInNewTab(url,
                               persistTab) {
    let newTab;

    // if the tab is only opened temporarily to download a file
    if (persistTab === false) {
        window.open(url, '_blank');
    }
    else {
        // otherwise, open the tab
        newTab = window.open('', '_blank');

        // and post the URL to the new tab, keeping it open
        // TODO: replace jQuery methods with pure JS:
        // see <https://stackoverflow.com/questions/6396101/pure-javascript-send-post-data-without-a-form>
        $.post(url, null)
            .always(function (response) {
                newTab.location = url;
            });
    }
}


// -----------------------------------------------------------------------
// Initializes custom event w/ IE11 polyfill.
// Usage:
// ```
// // create new event:
// let myEvent = initCustomEvent('NAME_OF_CUSTOM_EVENT');
// // dispatch event:
// document.dispatchEvent(myEvent);
// // listen to event:
// document.addEventListener(CUSTOM_EVENT_NAME,
//                           CALLBACK_FUNCTION);
// ```
// TODO: perhaps combine the separate custom event functions into a single interface?
function initCustomEvent(customEventName) {
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

        event.initEvent(customEventName,    // emitted event name
                        false,              // doesn't bubble
                        false);             // isn't cancelable
    }

    return event;
}
