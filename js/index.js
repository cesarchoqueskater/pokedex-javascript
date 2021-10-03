import { setPokemon } from "./pokedex.js"

const $form = document.querySelector('#form')

$form.addEventListener('submit', handleSumbit)

async function handleSumbit(event) {

    // Para evitar que se recargue el navegador usamos
    event.preventDefault()
        // Con la WebAPI, FormData(), nos permite obtener los datos del formulario que enviemos
    const form = new FormData($form)
    const id = form.get('id')
    setPokemon(id)
}