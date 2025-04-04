import React, { useState } from 'react';
import FormBase from '../../components/admin/FormBase';

const Categorias = () => {
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [selecionados, setSelecionados] = useState([]);

  const colunas = [
    { id: 'nome', label: 'Nome' },
    { id: 'campos', label: 'Campos' }
  ];

  //Dados mockados
  const dados = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    nome: `Categoria ${i + 1}`,
    pai: i % 4 === 0 ? 'Raiz' : `Categoria ${Math.floor(i / 4) + 1}`
  }));

  return (
    <FormBase
      titulo="Briefing"
      caminho={['Dashboard', 'Briefing']}
      colunas={colunas}
      dados={dados}
      pagina={pagina}
      setPagina={setPagina}
      linhasPorPagina={linhasPorPagina}
      setLinhasPorPagina={setLinhasPorPagina}
      selecionados={selecionados}
      setSelecionados={setSelecionados}
    />
  );
};

export default Categorias;
