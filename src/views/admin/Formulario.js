import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, TextField, Box, Breadcrumbs, Link, Snackbar, Alert, Typography, Paper, FormControlLabel, Stack, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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

const PreviewBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': { boxShadow: theme.shadows[6] }
}));

const Formulario = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: '', categoriaPai: '', urlAmigavel: '', descricao: '',
    corFundo: '#ffffff', corHover: '#f5f5f5', corFonte: '#212121',
    destaque: false, titulo: '', palavras_chave: '', descricao_seo: '',
    configuracao_adicional: '', selo_id: '', cor_fundo: '#ffffff',
    cor_texto: '#000000'
  });

  const [urlError, setUrlError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false, message: '', severity: 'success'
  });
  const [colorPicker, setColorPicker] = useState({
    fundo: false, hover: false, fonte: false, seo_fundo: false, seo_texto: false
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'urlAmigavel') {
      setUrlError(/^[a-z0-9-]+$/.test(value) ? '' : 'Apenas letras minúsculas, números e hífens');
    }
  };

  const handleToggle = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.checked }));
  const handleColorChange = (field) => (color) => {
    setFormData(prev => ({ ...prev, [field]: color.hex }));
    setColorPicker(prev => ({ ...prev, [field.split('_').pop()]: false }));
  };
  const toggleColorPicker = (field) => () => setColorPicker(prev => ({
    ...prev, [field]: !prev[field]
  }));

  useEffect(() => {
    const loadData = async () => {
      setIsSubmitting(true);
      try {
        await Promise.all([
          new Promise(resolve => setTimeout(() => {
            setCategorias([{ id: 1, nome: "xxx" }, { id: 2, nome: "xxx" }, { id: 3, nome: "xxx" }]);
            resolve();
          }, 500)),

          id && new Promise(resolve => setTimeout(() => {
            setFormData({
              nome: `Categoria ${id}`, categoriaPai: "2", urlAmigavel: `categoria-${id}`,
              descricao: `Descrição da categoria ${id}`, corFundo: '#f5f5f5',
              corHover: '#eeeeee', corFonte: '#212121', destaque: true,
              titulo: `Título SEO ${id}`, palavras_chave: 'palavra1, palavra2',
              descricao_seo: `Descrição SEO para categoria ${id}`,
              configuracao_adicional: 'Config adicional', selo_id: '123',
              cor_fundo: '#f8f8f8', cor_texto: '#333333'
            });
            resolve();
          }, 800))
        ]);
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao carregar dados', severity: 'error' });
      } finally {
        setIsSubmitting(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.urlAmigavel) {
      setSnackbar({ open: true, message: "Preencha todos os campos obrigatórios", severity: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Dados enviados:", formData);
      setSnackbar({ open: true, message: "Categoria salva com sucesso", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao salvar categoria", severity: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MinimalFormContainer>
      <Stack spacing={3}>
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 2 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="dashboards/modern">Home</Link>
            <Link underline="hover" color="inherit" href="categorias">Categorias</Link>
            <Typography color="text.primary">Formulario</Typography>
          </Breadcrumbs>
          <Typography variant="h1" component="h1" mt={2} fontWeight="bold">
            {id ? `Editar Categoria ${id}` : 'Formulario de Categoria'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box sx={{
              p: 3, bgcolor: 'background.paper', borderRadius: 1,
              boxShadow: 2, display: 'flex', justifyContent: 'flex-end'
            }}>
              <Button variant="contained" type="submit" disabled={isSubmitting} size="large"
                sx={{ boxShadow: 3, '&:hover': { boxShadow: 4 } }}>
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
