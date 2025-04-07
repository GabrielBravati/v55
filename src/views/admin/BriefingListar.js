import React, { useState } from 'react';
import FormBase from '../../components/admin/FormBase';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BriefingListar = () => {
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [selecionados, setSelecionados] = useState([]);

const colunas = [
  { id: 'nome', label: 'Nome' },
  { id: 'tipo', label: 'Tipo' },
];

// Dados mockados simples e diretos
const dados = [
  { id: 1, nome: 'Briefing 1', tipo: 'Categoria 1' },
  { id: 2, nome: 'Briefing 2', tipo: 'Categoria 2' },
  { id: 3, nome: 'Briefing 3', tipo: 'Categoria 1' },
  { id: 4, nome: 'Briefing 4', tipo: 'Categoria 2' },
  { id: 5, nome: 'Briefing 5', tipo: 'Categoria 2' },
];

  return (
    <FormBase
      titulo="Briefing"
      caminho={['Briefing']}
      colunas={colunas}
      dados={dados}
      pagina={pagina}
      setPagina={setPagina}
      linhasPorPagina={linhasPorPagina}
      setLinhasPorPagina={setLinhasPorPagina}
      selecionados={selecionados}
      setSelecionados={setSelecionados}
      renderAcoes={(item) => (
        <Button variant="contained" color="primary">
          Editar
        </Button>
      )}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}      >
        Novo Briefing
      </Button>
    </FormBase>
  );
};

export default BriefingListar;
