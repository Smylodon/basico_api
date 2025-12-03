"use client"

import { useSearchParams } from "next/navigation"

export default function DeleteCarros() {

    const id= useSearchParams().get('id');

    async function deleteCarros() {
        console.log("Acessou")
        await fetch(`https://692f872b778bbf9e006db5b8.mockapi.io/carros/${id}`,
            {
                method: "DELETE"
            }
        )
    }
    return (
        <div>
            <h1>Confirmar Exclusão?</h1>
            <button onClick={deleteCarros}>Confirmar</button>
        </div>
    )
}