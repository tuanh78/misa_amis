<template>
  <div class="home">
    <input type="text" v-mask="'99/99/9999'" />
    <input type="text" v-mask="{mask: '99/99/9999', greedy: true}" v-on:change="maskCheck"/>
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
