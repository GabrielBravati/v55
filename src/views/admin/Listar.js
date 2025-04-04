import React, { useState } from 'react';
import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, Breadcrumbs, Link,Typography,Box,styled
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
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const Listar = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const categorias = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,  
    nome: `Categoria ${i + 1}`,
    pai: i % 4 === 0 ? 'Raiz' : `Categoria ${Math.floor(i / 4) + 1}`,
  }));

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(search.toLowerCase()) ||
    categoria.pai.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
          <Typography color="text.primary">Categorias</Typography>
        </Breadcrumbs>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 600 }}>
            Categorias
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

        <StyledTable component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredCategorias.length}
                    checked={filteredCategorias.length > 0 && selected.length === filteredCategorias.length}
                    onChange={() => {
                      if (selected.length === filteredCategorias.length) {
                        setSelected([]);
                      } else {
                        setSelected(filteredCategorias.map(c => c.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Nome da Categoria</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Categoria Pai</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategorias
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((categoria) => {
                  const isItemSelected = isSelected(categoria.id);
                  return (
                    <TableRow 
                      key={categoria.id}
                      hover
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleSelect(categoria.id)}
                        />
                      </TableCell>
                      <TableCell>{categoria.nome}</TableCell>
                      <TableCell>{categoria.pai}</TableCell>
                      <TableCell>
                        <ActionButton 
                          variant="contained" 
                          startIcon={<EditIcon />}
                          size="small"
                          color="primary"
                        >
                          Editar
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </StyledTable>

        <TablePagination
          sx={{ mt: 2 }}
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={filteredCategorias.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Itens por página:
            </Typography>
          }
        />
      </ContentPaper>
    </PageContainer>
  );
};

export default Listar;
