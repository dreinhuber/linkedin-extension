module.exports = {
    dir: (obj) => {
        props = [];
        for (prop in obj) {
            props.push(`${prop}:${typeof(obj[prop])}`);
        }
        props.sort();
        console.log(props)
        return props;
    },
    identifyError: (err) => {
        if (err instanceof TypeError) {
            return "REGEX issue in the DOM parser module:: ";
        } else if (err instanceof SyntaxError) {
            return "JSON format issue when parsing script content:: ";
        }
    }
}