<template>

    <md-snackbar md-position="center"
                 :md-duration="4000"
                 :md-active.sync="showSnackbar"
                 md-persistent>

        <span>{{ message }}</span>

        <md-button class="md-icon-button md-primary" @click="showSnackbar = false">
            <md-icon>close</md-icon>
        </md-button>

    </md-snackbar>

</template>

<script>
    export default {
        name: "Snackbar",
        data () {
            return {
                message: '',
                showSnackbar: false
            }
        },
        created () {
            this.$store.watch(state => state.snackbar.message, () => {
                const snack = this.$store.state.snackbar.message

                if (snack !== '') {
                    this.showSnackbar = true
                    this.message = this.$store.state.snackbar.message
                    //this.$store.commit('snackbar/setSnack', '')
                }
            })
        }
    }
</script>

<style scoped>
    .md-snackbar {
        top: 0;
    }
</style>