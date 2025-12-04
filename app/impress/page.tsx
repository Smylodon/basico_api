// app/impress/page.tsx - VERSÃO PARA IMPRESSORAS
export default async function Impressoras() {

    const response = await fetch("https://69320c7711a8738467d15c0a.mockapi.io/impress")
    const listImpressoras = await response.json();
    console.log(listImpressoras)

    const rows = [];
    for (const impressora of listImpressoras) {
        rows.push(
            <tr key={impressora.id} className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-4 border-b border-amber-100">{impressora.id}</td>
                <td className="py-3 px-4 border-b border-amber-100 font-medium">{impressora.fabricante}</td>
                <td className="py-3 px-4 border-b border-amber-100">{impressora.qtpag}</td>
                <td className="py-3 px-4 border-b border-amber-100">
                    <a 
                        href={`/impress/delete/?id=${impressora.id}`}
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
                    Lista de Impressoras
                </h1>
                <a 
                    href="/impress/new"
                    className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-950 text-sm transition-colors"
                >
                    + Nova Impressora
                </a>
            </div>

            {listImpressoras.length === 0 ? (
                <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-amber-700 mb-4">
                        Nenhuma impressora cadastrada ainda.
                    </p>
                    <a 
                        href="/impress/new"
                        className="text-rose-900 hover:text-rose-950 font-medium hover:underline"
                    >
                        Cadastrar primeira impressora →
                    </a>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-amber-100">
                    <table className="w-full">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">ID</th>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">Fabricante</th>
                                <th className="py-3 px-4 text-left text-amber-800 font-medium border-b border-amber-100">Páginas</th>
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
                Total de impressoras: {listImpressoras.length}
            </div>
        </div>
    )
}