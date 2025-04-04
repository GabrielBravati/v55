import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Checkbox, TextField, Box, Breadcrumbs, Link, Snackbar, Alert, Typography, Paper,
  FormControlLabel, Stack, Divider, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChromePicker } from 'react-color';
import { styled } from '@mui/material/styles';

const MinimalFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius
}));

const SectionAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[2],
  '&:before': { display: 'none' },
  '&.Mui-expanded': { boxShadow: theme.shadows[4] }
}));

const ColorPickerButton = styled(Button)(({ theme, color }) => ({
  borderColor: color,
  color: theme.palette.getContrastText(color),
  backgroundColor: color,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
    boxShadow: theme.shadows[4]
  }
}));

const Formulario = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nome: '',
    urlAmigavel: '',
    descricao: '',
    destaque: false,
    corFundo: '#ffffff',
    corHover: '#eeeeee',
    corFonte: '#000000',
    titulo: '',
    palavras_chave: '',
    descricao_seo: '',
    cor_fundo: '#ffffff',
    cor_texto: '#000000'
  });

  const [urlError, setUrlError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [colorPicker, setColorPicker] = useState({
    fundo: false, hover: false, fonte: false, seo_fundo: false, seo_texto: false
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));

    if (field === 'urlAmigavel') {
      const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      setUrlError(regex.test(value) ? '' : 'URL deve conter apenas letras minúsculas, números e hífens');
    }
  };

  const handleToggle = (field) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.checked
    }));
  };

  const handleColorChange = (field) => (color) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: color.hex
    }));
  };

  const toggleColorPicker = (pickerKey) => () => {
    setColorPicker((prevState) => ({
      ...prevState,
      [pickerKey]: !prevState[pickerKey]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Dados enviados:', formData);
      setIsSubmitting(false);
      setSnackbar({ open: true, message: 'Categoria salva com sucesso!', severity: 'success' });
    }, 1500);
  };

  const renderColorField = (label, field, pickerKey) => (
    <Box>
      <Typography variant="body2" fontWeight="bold" mb={1}>{label}</Typography>
      <ColorPickerButton
        color={formData[field]}
        variant="outlined"
        onClick={toggleColorPicker(pickerKey)}
      >
        {formData[field]}
      </ColorPickerButton>
      {colorPicker[pickerKey] && (
        <Box mt={2}>
          <ChromePicker
            color={formData[field]}
            onChangeComplete={handleColorChange(field)}
            disableAlpha
          />
        </Box>
      )}
    </Box>
  );

  return (
    <MinimalFormContainer>
      <Stack spacing={3}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">Dashboard</Link>
          <Link underline="hover" color="inherit" href="/categorias">Categorias</Link>
          <Typography color="text.primary">{id ? 'Editar' : 'Cadastrar'} Categoria</Typography>
        </Breadcrumbs>

        <Typography variant="h4" fontWeight="bold">
          {id ? 'Editar Categoria' : 'Nova Categoria'}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <SectionAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">Informações Básicas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField
                    label="Nome da Categoria"
                    fullWidth
                    value={formData.nome}
                    onChange={handleChange('nome')}
                  />
                  <TextField
                    label="URL Amigável"
                    fullWidth
                    value={formData.urlAmigavel}
                    onChange={handleChange('urlAmigavel')}
                    error={!!urlError}
                    helperText={urlError}
                  />
                  <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.descricao}
                    onChange={handleChange('descricao')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.destaque}
                        onChange={handleToggle('destaque')}
                      />
                    }
                    label="Destaque"
                  />
                </Stack>
              </AccordionDetails>
            </SectionAccordion>

            <SectionAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">Cores da Categoria</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {renderColorField("Cor de Fundo", "corFundo", "fundo")}
                  {renderColorField("Cor do Hover", "corHover", "hover")}
                  {renderColorField("Cor da Fonte", "corFonte", "fonte")}
                </Stack>
              </AccordionDetails>
            </SectionAccordion>

            <SectionAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">SEO</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField
                    label="Título SEO"
                    fullWidth
                    value={formData.titulo}
                    onChange={handleChange('titulo')}
                  />
                  <TextField
                    label="Palavras-chave"
                    fullWidth
                    value={formData.palavras_chave}
                    onChange={handleChange('palavras_chave')}
                  />
                  <TextField
                    label="Descrição SEO"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.descricao_seo}
                    onChange={handleChange('descricao_seo')}
                  />
                </Stack>
              </AccordionDetails>
            </SectionAccordion>

            <Box sx={{
              p: 3, bgcolor: 'background.paper', borderRadius: 1,
              boxShadow: 2, display: 'flex', justifyContent: 'flex-end'
            }}>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                size="large"
                sx={{ boxShadow: 3, '&:hover': { boxShadow: 4 } }}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Categoria'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Snackbar open={snackbar.open} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} sx={{
          backgroundColor: ({ palette }) => palette[snackbar.severity]?.main || '#1976d2',
          color: '#ffffff', '& .MuiAlert-icon': { color: '#ffffff' },
          width: '100%', boxShadow: 3, borderRadius: 1
        }} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MinimalFormContainer>
  );
};

export default Formulario;
