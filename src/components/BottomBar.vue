<template>
    <div class="custom-bar md-layout md-size-100">

        <md-bottom-bar class="md-accent" md-type="shift" id="btm-bar">
            <md-bottom-bar-item id="bottom-bar-item-home" md-label="Tâches" md-icon="home"></md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Jeux" md-icon="games"></md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-posts" md-label="MLOA" md-icon="whatshot"></md-bottom-bar-item>
        </md-bottom-bar>

    </div>
</template>

<script>
    export default {
        name: "BottomBar"
    }
</script>

<style scoped>
    .custom-bar {
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
    }
</style>