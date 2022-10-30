<template>
  <div class="flex flex-row">
    <PokeCard
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
      class="m-4"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      pokemons: [],
      isLoading: false,
      limit: 100,
    }
  },
  mounted() {
    this.getPokeList(1)
  },
  methods: {
    async getPokeList(page: number) {
      try {
        this.isLoading = true
        const offset = (page - 1) * this.limit
        const query = `query getPokemons {
          species: pokemon_v2_pokemonspecies(
            limit:  ${this.limit}
            offset: ${offset}
            order_by: {id: asc}  
          ) {
            id
            name
            pokemons: pokemon_v2_pokemons {
              id
              types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  name
                }
              }
            }
          }
          species_aggregate: pokemon_v2_pokemonspecies_aggregate {
            aggregate {
              count
            }
          }
        }`

        const result = await this.$axios.post(
          'https://beta.pokeapi.co/graphql/v1beta',
          { query }
        )
        this.pokemons = result?.data?.data?.species
        this.isLoading = false
      } catch (e) {
        console.log('error', e)
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
<style scoped>
body {
  background-color: rgb(241 245 249);
}
</style>
