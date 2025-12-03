// app/carros/page.tsx
export default async function Carros() {

    const response = await fetch("https://692f872b778bbf9e006db5b8.mockapi.io/carros")
    const listCarros = await response.json();
    console.log(listCarros)

    const rows = [];
    for (const carro of listCarros) {
        rows.push(
            <tr key={carro.id} className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-4 border-b border-amber-100">{carro.id}</td>
                <td className="py-3 px-4 border-b border-amber-100 font-medium">{carro.marca}</td>
                <td className="py-3 px-4 border-b border-amber-100">{carro.portas}</td>
                <td className="py-3 px-4 border-b border-amber-100">
                    <a 
                        href={`/carros/delete/?id=${carro.id}`}
                        className="text-rose-900 hover:text-rose-950 hover:underline text-sm"
                    >
                        Excluir
                    </a>
                </td>
            </tr>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-rose-900">
                    Lista de Carros
                </h1>
                <a 
                    href="/carros/new"
                    className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-950 text-sm transition-colors"
                >
                    + Novo Carro
                </a>
            </div>

            {listCarros.length === 0 ? (
                <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-amber-700 mb-4">
                        Nenhum carro cadastrado ainda.
                    </p>
                    <a 
                        href="/carros/new"
                        className="text-rose-900 hover:text-rose-950 font-medium hover:underline"
                    >
                        Cadastrar primeiro carro →
                    </a>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-amber-100">
                    <table className="w-full">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">ID</th>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">Marca</th>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">Portas</th>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="text-sm text-amber-600 mt-4">
                Total de carros: {listCarros.length}
            </div>
        </div>
    )
}