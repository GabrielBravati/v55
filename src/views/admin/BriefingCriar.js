// src/views/admin/briefings/formulario.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';

// Importando os componentes do arquivo FormList
import FormList, {
  FormWrapper,
  FormSection,
  ColorField,
  SubmitButton
} from '@/components/admin/FormList'; // ajuste o path se necessário



const BriefingCriar = () => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    cor: '#2196f3',
  });

  const [corPickerAberto, setCorPickerAberto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleColorChange = (color) => {
    setForm({ ...form, cor: color.hex });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulando envio (substituir por chamada real à API)
    setTimeout(() => {
      console.log('Dados enviados:', form);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper
        title="Novo Briefing"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Briefings', href: '/briefings' },
          { label: 'Novo' }
        ]}
      >
        <FormSection title="Informações Gerais" defaultExpanded>
          <TextField
            label="Nome"
            value={form.nome}
            onChange={handleChange('nome')}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={form.descricao}
            onChange={handleChange('descricao')}
            multiline
            rows={4}
            fullWidth
          />
          <ColorField
            label="Cor do Briefing"
            value={form.cor}
            open={corPickerAberto}
            onClick={() => setCorPickerAberto(!corPickerAberto)}
            onChange={handleColorChange}
          />
        </FormSection>

        <SubmitButton isSubmitting={isSubmitting} />
      </FormWrapper>
    </form>
  );
};

export default BriefingCriar;
