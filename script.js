new Vue({
    el: '#app',
    data: {
        resume: {},
        loaded: false
    },
    methods: {
        run() {
            this.$http.get('./data.json').then(response => {
                this.resume = response.body;
                this.loaded = true;
            })
        }
    },
    watch: {
        loaded(val) {
            if (val) {
                document.title = `${this.resume.basics.name.toLowerCase().replace(' ', '')}-resume`;
            }
        }
    },
    filters: {
        link(str) {
            return str.replace('https://', '').replace('http://', '');
        },
        phone(str) {
            return str.replace('+49', '0');
        },
        sup(str) {
            return str.replace('th', '<sup>th</sup>')
        },
        editMode() {
            editMode();
        }
    },
    created() {
        this.run();
    }
});


Object.deepExtend = function(destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object" &&
            source[property] !== null) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
};

editModeValue = false;
editMode = function() {
    document.body.contentEditable = editModeValue = !editModeValue;
}