<template>
    <li class="nav-item">
            <router-link :to="{name: to}" class="nav-link">
              <i class="nav-icon fas" :class="icon"></i>
              <p>
                {{text}}
              </p>
            </router-link>
          </li>
</template>

<script>
    export default {
        name: 'NavItem',
        props: ['to', 'text', 'icon']
    }
</script>

<style lang="scss" scoped>

</style>