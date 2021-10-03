import { getPokemon, getSpecies } from "./api.js"

const $image = document.querySelector('#image')

function setImage(image) {
    // Seteamos la imagen, de la ruta del APi, donde esta la imagen, igual hacemos para la descripcion
    $image.src = image
}

const $description = document.querySelector('#description')

function setDescription(text) {
    $description.textContent = text
}

const $screen = document.querySelector('#screen')

function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img
}

export async function findPokemon(id) {

    const { data: pokemon, isError } = await getPokemon(id)

    if (!isError) {
        const species = await getSpecies(id)

        //Buscamos en la api  Species, la descripcion del pokemon a buscar,en esta parte es un array de Objetos donde estan separados por language, buscamos el que sea español "es"
        const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
        return {
            sprites: pokemon.sprites.front_default,
            description: description.flavor_text,
            id: pokemon.id
        }
    }
    return {
        sprites: '',
        description: 'Pokémon no fue encontrado, por favor vuelve a intentar',
        id: ''
    }

}

export async function setPokemon(id) {
    // Prender loader
    loader(true)

    const pokemon = await findPokemon(id)

    // Apagar loader
    loader(false)
    setImage(pokemon.sprites)
    setDescription(pokemon.description)
    return pokemon
}