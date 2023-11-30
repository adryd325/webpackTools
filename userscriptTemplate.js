// ==UserScript==
// @name         webpackTools
// @namespace    https://adryd.com
// @version      0.1
// @description  meow meow emwo
// @author       adryd
// @include      http://*
// @include      https://*
// @grant        GM_addElement
// @run-at       document-start
// ==/UserScript==

(() => {
  // Example config
  const config = {
    wpToolsEverywhere: true, // not yet implemented
    siteConfigs: [
      {
        name: "twitter", // Not parsed, for documentation purposes
        matchSites: ["twitter.com"], // String or Array of strings of sites to inject on. Matches globs (eg. *.discord.com)
        chunkObject: "webpackChunk_twitter_responsive_web", // Name of webpack chunk object to intercept
        webpackVersion: "5", // Version of webpack used to compile. TODO: Document this. Supported are 4 and 5
        inspectAll: true, // Whether to isolate every module. Allows for viewing an individual module in devtools without the whole rest of the chunk, but has a huge performance impact
        patches: [
          {
            name: "patchingDemo", // Used for debugging purposes, logging if a patch fails (TODO) and a comment of which patches affected a module
            find: "(window.__INITIAL_STATE__", // String, regexp or an array of them to match a module we're patching. Best to keep this a single string if possible for performance reasons
            replace: {
              // match and replace are literally passed to `String.prototype.replace(match, replacement)`
              match: /(const|var) .{1,3}=.\..\(window\.__INITIAL_STATE__/,
              replacement: (orig) => `console.log('Patches work!!!');${orig}`,
            },
          },
        ],
        modules: [
          {
            name: "modulesDemo", // Id of the module being injected (required)
            needs: new Set(), // set of strings, or regexes of modules that need to be loaded before injecting this one. can also be `{moduleId: <moduleId>}` if depending on other injected or named modules
            entry: true, // if true, the module will evaluate immediately uppon injection. otherwise it will not evaluate until it's require()'d by another module
            run: function (module, exports, webpackRequire) {
              // the actual webpack module.
              console.log("Module injection works!!!");
            },
          },
        ],
      },
    ],
  };

  unsafeWindow.__webpackTools_config = config;

  const runtime = "{{ REPLACE_ME RUNTIME }}";

  GM_addElement("script", {
    textContent: runtime,
  });
})();
