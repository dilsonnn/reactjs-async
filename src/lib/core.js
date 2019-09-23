
export function registerInternal(container){
   return function() {
    return {
      set: function(path, callback) {
        var isFunction = callback && typeof callback === 'function';
        if (!isFunction) {
          throw new Error('Trying to set invalid bundle callback. Must be an function or React object.');
        }
        if (isFunction) {
          container[path] = callback;
        } else {
          if (!React.isValidElement(callback)) {
            throw new Error('Trying to set invalid bundle callback. Must be an function or React object.');
          }
          container[path] = function() {
            return callback;
          };
        }
      },
      get: function(path) {
        return container[path];
      }
    };
  };
}

export function loadAsyncFile(fileName){
      return new Promise(function(success, reject){
        var script = document.createElement('script');
        script.src = fileName;
        script.type = 'text/javascript';
        script.async = true;
        script.id = fileName;
        script.onload = success;
        script.onerror = reject;
        document.body.appendChild(script);
      });
}


export function loadAsyncCssFile(file){
   return new Promise(function(success, reject){
     var css = document.createElement('link');  
     css.rel = 'stylesheet';
     css.type = 'text/css';
     css.href = file;
     css.id = file;
     css.onerror = reject;
     css.onload = success;
     document.body.appendChild(css);
   });
}

export function FileLoader(config) {
  var loadingQueue = [];
  this.getIfLoading = function(file) {
    return loadingQueue.find(function(e) {
      return e.file == file;
    });
  };
  
  this.removeFromQueue = function(file){
    this.loadingQueue = loadingQueue.filter(function(e) {
      return e.file == file;
    });
  };
  
  this.addToQueue = function(file, promise){
    loadingQueue.push({
      file: file,
      promise: promise
    });
  };

  this.dynamicLoad = function(file) {
    var found = this.getIfLoading(file);
    if (found) {
      return found.promise;
    }
    var _this = this;
    var promise = new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = config.jsPath + '/' + file;
      script.async = true;
      script.type = 'text/javascript';
      script.id = file;
      script.onload = function() {
        setTimeout(function() {
         _this.removeFromQueue(file);
         resolve(true);
        }, 1000);
      };
      script.onerror = function() {
        _this.removeFromQueue(file);
        reject(false);
      };
      document.body.appendChild(script);
    });
    _this.addToQueue(file, promise);
    return promise;
  };
  this.dynamicLoadCss = function(file) {
    var found = this.getIfLoading(file);
    if (found) {
      return found.promise;
    }
    var _this = this;
    var promise = new Promise(function(resolve, reject) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.type = 'text/css';
      css.id = file;
      css.href = config.cssPath + '/' + file;
      css.onload = function() {
        _this.removeFromQueue(file);
        resolve(true);
      };
      css.onerror = function() {
        _this.removeFromQueue(file);
        reject(false);
      };
      document.body.appendChild(css);
    });
    _this.addToQueue(file, promise);
    return promise;
  };
}