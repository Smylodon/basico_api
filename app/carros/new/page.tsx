// app/carros/new/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCarros() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
    const [formData, setFormData] = useState({
        marca: '',
        portas: ''
    });

    async function saveCarros(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Validação simples
            if (!formData.marca.trim()) {
                setMessage({text: 'Por favor, informe a marca', type: 'error'});
                setLoading(false);
                return;
            }

            if (!formData.portas.trim() || isNaN(Number(formData.portas))) {
                setMessage({text: 'Por favor, informe um número válido de portas', type: 'error'});
                setLoading(false);
                return;
            }

            const carro = {
                marca: formData.marca.trim(),
                portas: formData.portas.trim()
            }

            const response = await fetch(`https://692f872b778bbf9e006db5b8.mockapi.io/carros`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carro)
            });

            if (response.ok) {
                setMessage({text: 'Carro cadastrado com sucesso!', type: 'success'});
                
                // Limpa o formulário
                setFormData({ marca: '', portas: '' });
                
                // Redireciona após 2 segundos
                setTimeout(() => {
                    router.push('/carros');
                }, 2000);
            } else {
                setMessage({text: 'Erro ao cadastrar carro', type: 'error'});
            }
        } catch (error) {
            setMessage({text: 'Erro de conexão com o servidor', type: 'error'});
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-rose-900">
                    Cadastrar Novo Carro
                </h1>
                <p className="text-amber-700 mt-2">
                    Preencha os dados do novo veículo
                </p>
            </div>

            {/* Mensagem de feedback */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-100' 
                    : 'bg-red-50 text-red-800 border border-red-100'
                }`}>
                    {message.text}
                    {message.type === 'success' && (
                        <span className="ml-2 text-sm">Redirecionando...</span>
                    )}
                </div>
            )}

            <form onSubmit={saveCarros} className="space-y-6">
                <div>
                    <label 
                        htmlFor="marca" 
                        className="block text-sm font-medium text-amber-800 mb-2"
                    >
                        Marca do Carro *
                    </label>
                    <input 
                        type="text" 
                        id="marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                        placeholder="Ex: Toyota, Honda, Ford..."
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900 focus:border-transparent"
                        required
                    />
                    <p className="text-xs text-amber-600 mt-1">
                        Informe a marca do veículo
                    </p>
                </div>

                <div>
                    <label 
                        htmlFor="portas" 
                        className="block text-sm font-medium text-amber-800 mb-2"
                    >
                        Quantidade de Portas *
                    </label>
                    <input 
                        type="number" 
                        id="portas"
                        value={formData.portas}
                        onChange={handleInputChange}
                        placeholder="Ex: 2, 4, 5..."
                        min="1"
                        max="6"
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900 focus:border-transparent"
                        required
                    />
                    <p className="text-xs text-amber-600 mt-1">
                        Informe o número de portas (incluindo porta-malas)
                    </p>
                </div>

                <div className="pt-4 border-t border-amber-100">
                    <div className="flex items-center justify-between">
                        <a 
                            href="/carros"
                            className="text-amber-700 hover:text-amber-800 hover:underline text-sm"
                        >
                            ← Voltar para lista
                        </a>
                        
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ marca: '', portas: '' });
                                    setMessage(null);
                                }}
                                className="px-5 py-2.5 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
                                disabled={loading}
                            >
                                Limpar
                            </button>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 bg-rose-900 text-white rounded-lg hover:bg-rose-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Salvando...
                                    </>
                                ) : 'Salvar Carro'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Dicas */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Dicas:</h3>
                <ul className="text-xs text-amber-600 space-y-1">
                    <li>• Certifique-se de que a marca está escrita corretamente</li>
                    <li>• Para carros com 5 portas, inclua a porta do porta-malas</li>
                    <li>• Após o cadastro, você será redirecionado para a lista</li>
                </ul>
            </div>
        </div>
    )
}