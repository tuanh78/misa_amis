<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    maskCheck: function (field) {
      if (field.target.inputmask.isComplete()) {
        console.log('is Complete')
      } else {
        console.log('is Incomplete')
      }
    }
  }
}
</script>
