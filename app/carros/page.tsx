export default async function carros() {

    const response = await fetch("https://692f872b778bbf9e006db5b8.mockapi.io/carros")

    const listCarros = await response.json();

    console.log(listCarros)

    const rows = [];
    for (const carros of listCarros) {
        rows.push(<tr key={carros.id}>
            <td>{carros.id}</td>
            <td>{carros.marca}</td>
            <td>{carros.portas}</td>
            <td><a href={`/carros/delete/?id=${carros.id}`}>Excluir</a></td>
        </tr>
        )
    }

    return (
        <div>
            <br></br>
            <h1>Lista de carros</h1>

            <table border={3}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marca</th>
                        <th>Quantidade de portas</th>
                    </tr>

                </thead>

                <tbody>
                    {rows}
                </tbody>

            </table>

        </div>

    )
}