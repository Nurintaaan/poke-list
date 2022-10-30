import { shallowMount } from '@vue/test-utils'
import PokemonList from '@/pages/index.vue'

describe('Pokemon page', () => {
  test('should show data correctly', () => {
    const wrapper = shallowMount(PokemonList)
    expect(wrapper.element).toMatchSnapshot()
  })
})
