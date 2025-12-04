// app/impress/new/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewImpressora() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
    const [formData, setFormData] = useState({
        fabricante: '',
        qtpag: ''
    });

    async function saveImpressora(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Validação simples
            if (!formData.fabricante.trim()) {
                setMessage({text: 'Por favor, informe o fabricante', type: 'error'});
                setLoading(false);
                return;
            }

            if (!formData.qtpag.trim() || isNaN(Number(formData.qtpag))) {
                setMessage({text: 'Por favor, informe um número válido de páginas', type: 'error'});
                setLoading(false);
                return;
            }

            const impressora = {
                fabricante: formData.fabricante.trim(),
                qtpag: formData.qtpag.trim()
            }

            const response = await fetch(`https://69320c7711a8738467d15c0a.mockapi.io/impress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(impressora)
            });

            if (response.ok) {
                setMessage({text: 'Impressora cadastrada com sucesso!', type: 'success'});
                
                // Limpa o formulário
                setFormData({ fabricante: '', qtpag: '' });
                
                // Redireciona após 2 segundos
                setTimeout(() => {
                    router.push('/impress');
                }, 2000);
            } else {
                setMessage({text: 'Erro ao cadastrar impressora', type: 'error'});
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
                    Cadastrar Nova Impressora
                </h1>
                <p className="text-amber-700 mt-2">
                    Preencha os dados da nova impressora
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

            <form onSubmit={saveImpressora} className="space-y-6">
                <div>
                    <label 
                        htmlFor="fabricante" 
                        className="block text-sm font-medium text-amber-800 mb-2"
                    >
                        Fabricante *
                    </label>
                    <input 
                        type="text" 
                        id="fabricante"
                        value={formData.fabricante}
                        onChange={handleInputChange}
                        placeholder="Ex: HP, Epson, Canon..."
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900 focus:border-transparent"
                        required
                    />
                    <p className="text-xs text-amber-600 mt-1">
                        Informe o fabricante da impressora
                    </p>
                </div>

                <div>
                    <label 
                        htmlFor="qtpag" 
                        className="block text-sm font-medium text-amber-800 mb-2"
                    >
                        Quantidade de Páginas *
                    </label>
                    <input 
                        type="number" 
                        id="qtpag"
                        value={formData.qtpag}
                        onChange={handleInputChange}
                        placeholder="Ex: 1000, 5000, 10000..."
                        min="1"
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900 focus:border-transparent"
                        required
                    />
                    <p className="text-xs text-amber-600 mt-1">
                        Informe a capacidade de páginas da impressora
                    </p>
                </div>

                <div className="pt-4 border-t border-amber-100">
                    <div className="flex items-center justify-between">
                        <a 
                            href="/impress"
                            className="text-amber-700 hover:text-amber-800 hover:underline text-sm"
                        >
                            ← Voltar para lista
                        </a>
                        
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ fabricante: '', qtpag: '' });
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
                                ) : 'Salvar Impressora'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Dicas */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Dicas:</h3>
                <ul className="text-xs text-amber-600 space-y-1">
                    <li>• Certifique-se de que o fabricante está escrito corretamente</li>
                    <li>• A quantidade de páginas se refere à capacidade mensal</li>
                    <li>• Após o cadastro, você será redirecionado para a lista</li>
                </ul>
            </div>
        </div>
    )
}