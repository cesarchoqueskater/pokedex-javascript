import { setPokemon } from "./pokedex.js"

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $pokedex = document.querySelector('#pokedex')

$form.addEventListener('submit', handleSumbit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)

let activePokemon = null
async function handleSumbit(event) {
    // Para evitar que se recargue el navegador usamos
    event.preventDefault()
    $pokedex.classList.add('is-open')
        // Con la WebAPI, FormData(), nos permite obtener los datos del formulario que enviemos
    const form = new FormData($form)
    const id = form.get('id')
    activePokemon = await setPokemon(id)
}

async function handleNextPokemon() {
    const id = (activePokemon === null || activePokemon.id === 893) ? 1 : activePokemon.id + 1
    activePokemon = await setPokemon(id)
}

async function handlePrevPokemon() {
    const id = (activePokemon === null || activePokemon.id === 1) ? 893 : activePokemon.id - 1
    activePokemon = await setPokemon(id)
}