import { getPokemon, getSpecies } from "./api.js"

const $form = document.querySelector('#form')

const $image = document.querySelector('#image')
const $description = document.querySelector('#description')

$form.addEventListener('submit', async(event) => {
    // Para evitar que se recargue el navegador usamos
    event.preventDefault()
        // Con la WebAPI, FormData(), nos permite obtener los datos del formulario que enviemos
    const form = new FormData($form)
    const id = form.get('id')
        // console.log(id)
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)

    //Buscamos en la api  Species, la descripcion del pokemon a buscar,en esta parte es un array de Objetos donde estan separados por language, buscamos el que sea español "es"
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
        // Seteamos la imagen, de la ruta del APi, donde esta la imagen, igual hacemos para la descripcion
    $image.src = pokemon.sprites.front_default
    $description.textContent = description.flavor_text
    console.log(description)
})