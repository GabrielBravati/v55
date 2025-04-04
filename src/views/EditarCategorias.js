import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, TextField, Box, Breadcrumbs, Link, Snackbar, Alert, Typography, Paper, FormControlLabel,Stack, Divider, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
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

const EditarCategorias = () => {
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
            <Typography color="text.primary">Editar</Typography>
          </Breadcrumbs>
          <Typography variant="h1" component="h1" mt={2} fontWeight="bold">
            {id ? `Editar Categoria ${id}` : 'Editar Categoria'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />



        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <SectionAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'grey.100' }}>
                <Typography variant="subtitle1" fontWeight="medium">Informações Básicas</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 3 }}>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="Nome *" variant="outlined" fullWidth value={formData.nome} 
                      onChange={handleChange('nome')} disabled={isSubmitting} />
                    <TextField select label="Categoria Pai" variant="outlined" fullWidth
                      value={formData.categoriaPai} onChange={handleChange('categoriaPai')}
                      SelectProps={{ native: true }} disabled={isSubmitting}
                      InputLabelProps={{ shrink: true }}>
                      <option value="">Nenhuma</option>
                      {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </TextField>
                  </Stack>



                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <TextField label="URL Amigável *" variant="outlined" fullWidth
                      value={formData.urlAmigavel} onChange={handleChange('urlAmigavel')}
                      error={!!urlError} helperText={urlError} disabled={isSubmitting} />
                    <FormControlLabel control={<Checkbox checked={formData.destaque}
                      onChange={handleToggle('destaque')} disabled={isSubmitting} color="primary" />}
                      label="Destaque" />
                  </Stack>

                  <TextField label="Descrição" variant="outlined" multiline rows={4} fullWidth
                    value={formData.descricao} onChange={handleChange('descricao')} disabled={isSubmitting} />
                </Stack>
              </AccordionDetails>
            </SectionAccordion>




            <SectionAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'grey.100' }}>
                <Typography variant="subtitle1" fontWeight="medium">Cores</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 3 }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {['fundo', 'hover', 'fonte'].map((type) => (
                      <Box key={type} position="relative" flex={1}>
                        <ColorPickerButton fullWidth color={formData[`cor${type.charAt(0).toUpperCase() + type.slice(1)}`]}
                          onClick={toggleColorPicker(type)} disabled={isSubmitting}>
                          {type === 'fonte' ? 'Texto' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </ColorPickerButton>
                        {colorPicker[type] && (
                          <Box position="absolute" zIndex={10} mt={1}>
                            <ChromePicker color={formData[`cor${type.charAt(0).toUpperCase() + type.slice(1)}`]}
                              onChangeComplete={handleColorChange(`cor${type.charAt(0).toUpperCase() + type.slice(1)}`)} />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Stack>




                  <PreviewBox sx={{ 
                    backgroundColor: formData.corFundo, 
                    color: formData.corFonte,
                    '&:hover': { backgroundColor: formData.corHover }
                  }}>
                    <Typography variant="subtitle1">Preview</Typography>
                    <Typography variant="body2">
                      {formData.nome || 'xxxxxxxxxxxxxxxxxxxxxxxxx'}
                    </Typography>
                  </PreviewBox>
                </Stack>
              </AccordionDetails>
            </SectionAccordion>




            <SectionAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'grey.100' }}>
                <Typography variant="subtitle1" fontWeight="medium">SEO</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 3 }}>
                <Stack spacing={2}>
                  <TextField fullWidth label="Título para SEO" value={formData.titulo}
                    onChange={handleChange('titulo')} disabled={isSubmitting} />
                  <TextField fullWidth label="Palavras-chave" value={formData.palavras_chave}
                    onChange={handleChange('palavras_chave')} helperText="Separe por vírgulas"
                    disabled={isSubmitting} />
                  <TextField fullWidth multiline rows={4} label="Descrição SEO"
                    value={formData.descricao_seo} onChange={handleChange('descricao_seo')}
                    disabled={isSubmitting} />
                </Stack>
              </AccordionDetails>
            </SectionAccordion>




            <SectionAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'grey.100' }}>
                <Typography variant="subtitle1" fontWeight="medium">Configurações Adicionais</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 3 }}>
                <Stack spacing={3}>
                  <TextField fullWidth label="Configuração Adicional" 
                    value={formData.configuracao_adicional}
                    onChange={handleChange('configuracao_adicional')} disabled={isSubmitting} />
                  <TextField fullWidth label="ID do Selo" type="number"
                    value={formData.selo_id} onChange={handleChange('selo_id')} disabled={isSubmitting} />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {['seo_fundo', 'seo_texto'].map((type) => (
                      <Box key={type} position="relative" flex={1}>
                        <ColorPickerButton fullWidth color={formData[type.replace('seo_', 'cor_')]}
                          onClick={toggleColorPicker(type)} disabled={isSubmitting}>
                          {type === 'seo_fundo' ? 'Cor de Fundo SEO' : 'Cor de Texto SEO'}
                        </ColorPickerButton>
                        {colorPicker[type] && (
                          <Box position="absolute" zIndex={10} mt={1}>
                            <ChromePicker color={formData[type.replace('seo_', 'cor_')]}
                              onChangeComplete={handleColorChange(type.replace('seo_', 'cor_'))} />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </AccordionDetails>
            </SectionAccordion>

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

export default EditarCategorias;