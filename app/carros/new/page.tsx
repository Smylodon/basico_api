"use client"
export default function NewCarros(){

    async function saveCarros(){
        console.log("Acessou")
        const marca = document.getElementById("marca") as HTMLInputElement;
        const portas = document.getElementById("portas") as HTMLInputElement;

        const carros = {
            marca: marca.value,
            portas: portas.value
        }

        await fetch(`https://692f872b778bbf9e006db5b8.mockapi.io/carros`,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carros)

            }
        )

    }
    return(
        <div>
            <br />
            <h1>Cadastrar Carros</h1>
            <br />

            <input type="text" id="marca" placeholder="Digite o nome da Marca" />
            <br />
            <input type="text" id="portas" placeholder="Digite a quantidade de portas"/>
            <br />

            <button onClick={saveCarros}>Salvar</button>
        </div>
    )
}