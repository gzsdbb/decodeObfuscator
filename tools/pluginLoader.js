let pluginBasePath = "../plugins/";

function load(pluginPath) {
    pluginPath ? require(`${pluginBasePath}${pluginPath}`) : loadDefault()
}
function loadDefault() {
    load('commonPlugin')
}

exports.default=load
