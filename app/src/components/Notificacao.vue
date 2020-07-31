<template>
   <div
    class="alert alert-dismissible fade show shadow"
    :class="[`alert-${options.type}`]"
    role="alert"
    v-if="visivel">
    {{ options.text }}

    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  created () {
    this.$root.notify = this.notify

    window.notify = this.notify
  },

  data () {
    return {
      visivel: false,
      options: {}
    }
  },

  methods: {
    notify (options = {}) {
      this.visivel = true

      this.options = options
      const { time = 5 } = options

      setTimeout(() => {
        this.visivel = false
      }, time * 1000);
    }
  }
}
</script>

<style scoped>
.alert {
  width: 30%;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  margin: 5px;
}

@media screen and (max-width: 720px) {
  .alert {
    width: 100%;
  }
}
</style>