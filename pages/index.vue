<template>
  <div class="flex flex-row flex-wrap w-screen">
    <PokeCard
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
      class="m-2 mb-4 w-80"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      pokemons: [],
      isLoading: false,
      limit: 50,
      page: 1,
      total: 0,
    }
  },
  mounted() {
    this.getPokeList()
    this.infiniteScroll()
  },
  methods: {
    async getPokeList() {
      try {
        this.isLoading = true
        const offset = (this.page - 1) * this.limit
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
        this.pokemons = [...this.pokemons, ...result?.data?.data?.species]
        this.total = result?.data?.data?.species_aggregate?.aggregate?.count
        this.isLoading = false
      } catch (e) {
        console.log('error', e)
      } finally {
        this.isLoading = false
      }
    },
    infiniteScroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.page++
          if (this.page * this.limit < this.total) {
            this.getPokeList()
          }
        }
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
