// app/carros/delete/page.tsx
"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function DeleteCarros() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
    const [loading, setLoading] = useState(false);
    const [carroInfo, setCarroInfo] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Buscar informações do carro para mostrar na confirmação
    useEffect(() => {
        if (id) {
            fetchCarroInfo();
        }
    }, [id]);

    async function fetchCarroInfo() {
        try {
            const response = await fetch(`https://692f872b778bbf9e006db5b8.mockapi.io/carros/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCarroInfo(data);
            }
        } catch (error) {
            console.error('Erro ao buscar carro:', error);
        }
    }

    async function deleteCarro() {
        if (!id) {
            setMessage('ID do carro não encontrado');
            setStatus('error');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`https://692f872b778bbf9e006db5b8.mockapi.io/carros/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Carro excluído com sucesso!');
                
                // Redirecionar após 2 segundos
                setTimeout(() => {
                    router.push('/carros');
                }, 2000);
            } else {
                setStatus('error');
                setMessage('Erro ao excluir o carro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            setStatus('error');
            setMessage('Erro de conexão com o servidor');
        } finally {
            setLoading(false);
        }
    }

    function cancelDelete() {
        router.push('/carros');
    }

    return (
        <div className="max-w-lg mx-auto">
            {/* Cabeçalho */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold text-rose-900">
                    Confirmar Exclusão
                </h1>
                <p className="text-amber-700 mt-2">
                    Esta ação não pode ser desfeita
                </p>
            </div>

            {/* Card de confirmação */}
            <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6 mb-6">
                {carroInfo ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg">
                            <div className="w-12 h-12 bg-rose-900/10 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-rose-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-amber-800">{carroInfo.marca}</h3>
                                <p className="text-sm text-amber-600">
                                    {carroInfo.portas} porta{carroInfo.portas !== '1' ? 's' : ''} • ID: {carroInfo.id}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <div>
                                    <p className="text-sm text-red-800 font-medium">Atenção!</p>
                                    <p className="text-sm text-red-700 mt-1">
                                        Você está prestes a excluir permanentemente este veículo do sistema.
                                        Esta ação não pode ser desfeita.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="animate-pulse space-y-3">
                            <div className="h-4 bg-amber-100 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-amber-100 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                )}

                {/* Mensagem de feedback */}
                {message && (
                    <div className={`mt-4 p-4 rounded-lg ${
                        status === 'success' 
                            ? 'bg-green-50 text-green-800 border border-green-100' 
                            : 'bg-red-50 text-red-800 border border-red-100'
                    }`}>
                        <div className="flex items-center">
                            {status === 'success' ? (
                                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            )}
                            {message}
                            {status === 'success' && (
                                <span className="ml-2 text-sm">Redirecionando...</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Botões de ação */}
                <div className="mt-8 pt-6 border-t border-amber-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <button
                            onClick={cancelDelete}
                            disabled={loading}
                            className="px-5 py-2.5 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        
                        <button
                            onClick={deleteCarro}
                            disabled={loading || status === 'success'}
                            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Excluindo...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Confirmar Exclusão
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Informações adicionais */}
            <div className="text-center">
                <a 
                    href="/carros"
                    className="text-sm text-amber-600 hover:text-amber-800 hover:underline inline-flex items-center"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar para a lista de carros
                </a>
            </div>
        </div>
    )
}