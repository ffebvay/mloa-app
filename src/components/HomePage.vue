<template>
    <div class="home">
        <div class="md-layout md-gutter md-alignment-center">

            <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">

                <md-content>
                    <h1>Hola {{account.user.firstName}} !</h1>
                    <p>You're logged in with Vue + Vuex & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                    <em v-if="users.loading">Loading users...</em>
                    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                    <md-list class="md-layout md-alignment-center" v-if="users.items">
                        <md-list-item v-for="user in users.items" :key="user.id">
                            {{user.firstName + ' ' + user.lastName}}
                        </md-list-item>
                    </md-list>
                    <md-content>
                        <router-link to="/login">Déconnexion</router-link>
                    </md-content>
                </md-content>

            </div>

        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "HomePage",
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllUsers()
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll'
            })
        }
    }
</script>

<style scoped>
    .home {
        padding-top: 50px;
        height: 100vh;
        overflow-x: hidden;
    }
</style>