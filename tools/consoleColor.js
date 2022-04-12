let consoleBak = {};
consoleBak._warn = console.warn
consoleBak._info = console.info
consoleBak._error = console.error
consoleBak._time = console.time
consoleBak._timeEnd = console.timeEnd
global.console = Object.assign(global.console, consoleBak)

let consoleColour = {
    warn(message) {
        console._warn("\033[43;30m WARN \033[40;33m " + message + "\033[0m")
    },
    info(message) {
        console._info("\033[42;30m INFO \033[40;32m " + message + "\033[0m")
    },
    time(message) {
        console._time("\033[44;30m DONE \033[40;34m " + message + "\033[0m")
    },
    timeEnd(message) {
        console._timeEnd("\033[44;30m DONE \033[40;34m " + message + "\033[0m")
    },
    error(message) {
        console._error("\033[41;30m ERROR \033[40;31m " + message + "\033[0m")
    }
};
global.console = Object.assign(global.console, consoleColour)