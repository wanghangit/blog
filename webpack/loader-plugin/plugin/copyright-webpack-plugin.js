class CopyRightWebpackPlugin {
  constructor() {}
  apply(compiler) {
    // 生成目录之前
    compiler.hooks.emit.tapAsync("CopyRightWebpackPlugin", (complition, cb) => {
      complition.assets["copyright.txt"] = {
        source: function() {
          return "copy";
        },
        size: function() {
          return 4;
        }
      };
      cb();
    });
  }
}

module.exports = CopyRightWebpackPlugin;
