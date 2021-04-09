let myModule = {
  myProperty: 200,

  myConfig: {
    useCaching: true,
    lang: "en",
  },

  myMethod: function () {
    console.log(this);
  },

  reportConfig: function () {
    console.log(
      `Caching is ${this.myConfig.useCaching ? "enabled" : "disabled"}`
    );
  },

  updateConfig: function (newConfig) {
    if (typeof newConfig === "object") {
      this.myConfig = newConfig;
      console.log(`Updated to ${this.myConfig.lang}`);
    }
  },
};

//one can use also JSON for storing config data (simpler storage to send to backend), it is a subset of object literal notation
let myObjectLiteralApp = {
  //function
  getInfo: function () {
    console.log("getInfo");
  },
  //populate with more object namespaces
  models: {},
  views: {
    pages: {},
  },
  collections: {},

  myConfig: {
    language: "en-US",
    defaults: {
      enableSharing: false,
      maxNum: 20,
    },
    theme: {
      color: "red",
      toolbars: {
        index: "ui-nav-toolbar",
        pages: "ui-custom-toolbar",
      },
    },
  },
};

///

myModule.myMethod();
myModule.reportConfig();
myModule.updateConfig({
  useCaching: false,
  lang: "fr",
});
myModule.reportConfig();
var global = "global";
