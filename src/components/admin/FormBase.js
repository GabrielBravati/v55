import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh'
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[8],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4)
}));

const StyledTable = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.grey[100]
  },
  '& .MuiTableRow-root:hover':{
    backgroundColor: theme.palette.action.hover,
    cursor:'pointer'
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const FormBase = ({
  titulo,
  caminho,
  colunas,
  dados,
  pagina,
  setPagina,
  linhasPorPagina,
  setLinhasPorPagina,
  selecionados,
  setSelecionados,
  renderAcoes,
  children
}) => {
  const [search, setSearch] = useState('');

  const dadosFiltrados = dados.filter((item) =>
    Object.values(item).some((valor) =>
      valor.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSelectAll = () => {
    if (selecionados.length === dadosFiltrados.length) {
      setSelecionados([]);
    } else {
      setSelecionados(dadosFiltrados.map((item) => item.id));
    }
  };

  const handleSelectOne = (id) => {
    setSelecionados(
      selecionados.includes(id)
        ? selecionados.filter((item) => item !== id)
        : [...selecionados, id]
    );
  };

  return (
    <PageContainer>
      <ContentPaper>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          {caminho?.map((item, index) => (
            index === caminho.length - 1 ? (
              <Typography key={index} color="text.primary">
                {item}
              </Typography>
            ) : (
              <Link key={index} underline="hover" color="inherit" href="#">
                {item}
              </Link>
            )
          ))}
        </Breadcrumbs>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h2" component="h1" sx={{textTransform : 'uppercase', fontWeight: 1000 }}>
            {titulo}
          </Typography>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: <SearchIcon color="action" />
            }}
          />
        </Box>

        {children && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {children}
          </Box>
        )}

        <StyledTable component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selecionados.length > 0 && selecionados.length < dadosFiltrados.length}
                    checked={dadosFiltrados.length > 0 && selecionados.length === dadosFiltrados.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {colunas.map((col) => (
                  <TableCell key={col.id}>{col.label}</TableCell>
                ))}
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dadosFiltrados.slice(pagina * linhasPorPagina, (pagina + 1) * linhasPorPagina).map((item) => (
                <TableRow key={item.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selecionados.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                  </TableCell>
                  {colunas.map((col) => (
                    <TableCell key={col.id}>{item[col.id]}</TableCell>
                  ))}
                  <TableCell align="center">
                    {renderAcoes ? renderAcoes(item) : (
                      <ActionButton 
                        variant="contained" 
                        startIcon={<EditIcon />}
                        size="small"
                        color="primary"
                      >
                        Editar
                      </ActionButton>)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={dadosFiltrados.length}
          rowsPerPage={linhasPorPagina}
          page={pagina}
          onPageChange={(_, newPage) => setPagina(newPage)}
          onRowsPerPageChange={(e) => setLinhasPorPagina(parseInt(e.target.value, 10))}
        />
      </ContentPaper>
    </PageContainer>
  );
};

export default FormBase;