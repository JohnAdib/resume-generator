new Vue({
    el: '#app',
    data: {
        resume: {},
        loaded: false
    },
    methods: {
        run() {
            // resume.json schema is based on https://gitconnected.com api
            // you can use gitconnected to fill the json, and adding its url intead of resume.json
            // e.g. https://gitconnected.com/v1/portfolio/saman
            this.$http.get('./resume.json').then(response => {
                this.$http.get('./resume-override.json').then(responseOverride => {
                    this.resume = response.body;
                    Object.deepExtend(this.resume, responseOverride.body);
                    this.resume.work.sort((a, b) => b.start.year - a.start.year);
                    this.resume.education.sort((a, b) => b.start.year - a.start.year);
                    this.resume.volunteer.sort((a, b) => b.start.year - a.start.year);
                    this.resume.awards.sort((a, b) => b.fullDate.year - a.fullDate.year);
                    this.loaded = true;
                });
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
        },
        br(str) {
            str = '<span class="bullet" ></span>' + str;
            return str.replace(/(?:\r\n|\r|\n)/g, '<br> <span class="bullet" ></span>');
        }
    },
    created() {
        this.run();
    }
});


Object.deepExtend = function (destination, source) {
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
editMode = function () {
    document.body.contentEditable = editModeValue = !editModeValue;
}