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

export async function findPokemon(id) {

    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)

    //Buscamos en la api  Species, la descripcion del pokemon a buscar,en esta parte es un array de Objetos donde estan separados por language, buscamos el que sea español "es"
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
    return {
        sprites: pokemon.sprites.front_default,
        description: description.flavor_text
    }
}

export async function setPokemon(id) {
    const pokemon = await findPokemon(id)
    setImage(pokemon.sprites)
    setDescription(pokemon.description)
}