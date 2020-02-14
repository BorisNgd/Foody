export const mixin = {
    computed: {
        alert_message() {
            return this.$store.getters.alert_message;
        }
    },
    watch: {
        alert_message(value) {
            this.showToastBottom(value);
            setTimeout(() => {
                this.$store.commit("setAlertMessage", null);
            }, 200);
        }
    },
    methods: {

        showToastBottom(text) {
            const self = this;
            if (!self.toastBottom) {
                self.toastBottom = self.$f7.toast.create({
                    text: text,
                    closeTimeout: 2000
                });
            }
            self.toastBottom.open();
        },
    },
}