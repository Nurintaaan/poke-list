<template>
  <div
    class="drop-shadow-md shadow-md rounded-md flex flex-col justify-center items-center p-4"
  >
    <img :src="imageUrl" :alt="pokemon.name" />
    <p class="text-xl font-medium">
      {{ pokemon.name }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png`
    },
  },
}
</script>
