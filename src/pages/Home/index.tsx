import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Box,
  TableContainer,
  Table, TableHead, TableBody, TableCell, TableRow, Paper, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField
} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  tableContainer: {
    marginTop: '2rem',
  },
  tableGrid: {
    // padding: '0 2rem'
  }
});

interface Product {
  id?: number;
  product: string;
  amount: string;
  unit: string;
  price: string;
  done: boolean;
}

export default function Home () {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, product: 'Arroz (8kG)', amount: '2', unit: 'KG', price: '12', done: false },
    { id: 2, product: 'Feijão (2kG)', amount: '5', unit: 'KG', price: '5.3', done: false },
    { id: 3, product: 'Farinha (1kG)', amount: '2', unit: 'KG', price: '4', done: false },
    { id: 4, product: 'Batata', amount: '5', unit: 'KG', price: '6.8', done: false },
    { id: 5, product: 'Leite', amount: '12', unit: 'LT', price: '3.4', done: false },
  ])

  const [item, setItem] = useState<Product>({
    product: '',
    amount: '',
    unit: '',
    price: '',
    done: false
  })

  function handleOpen () {
    setOpen(true)
  }
  function handleClose () {
    setOpen(false)
  }

  function handleAddProduct () {
    setProducts([...products, { ...item, id: Date.now() }])
    handleClose()
    setItem({
      product: '',
      amount: '',
      unit: '',
      price: '',
      done: false
    })
  }

  function handleCheckProduct (product: Product) {
    const filteredProducts = products.filter(p => p.id !== product.id)
    setProducts([...filteredProducts, { ...product, done: !product.done }])
  }
  function sortByUnDone (a: Product, b: Product) {
    if (products.every(product => product.done)) {
      return a.product < b.product ? -1 : 1
    }
    return a.done < b.done ? -1 : 1
  }

  function formatCoin (val: string) {
    return Number(val).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  // function sumProducts () {
  //   const sum = products.map(product => Number(product.amount) * Number(product.price)).reduce((a, b) => (a + b), 0).toString()
  //   return formatCoin(sum)
  // }
  return (
    <Grid container>
      <Grid item xs={12} >
        <Box display="flex" justifyContent="flex-end" marginRight="2rem">
          <Button variant="contained" color="primary" onClick={handleOpen}>Adicionar produto</Button>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.tableGrid} >
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="center">Preço</TableCell>
                <TableCell align="center">Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.sort(sortByUnDone).map((row) => (
                <TableRow key={row.id} style={{
                  opacity: row.done ? .6 : 1
                }} >
                  <TableCell align="center">{row.product}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{formatCoin(row.price)}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={row.done} onChange={() => handleCheckProduct(row)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
        <Dialog open={open} fullWidth>
          <DialogTitle id="max-width-dialog-title">Adicionar produto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={6}  >
                  <TextField value={item.product}
                    onChange={e => setItem({ ...item, product: e.target.value })}
                    label="Produto" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                  <TextField value={item.amount}

                    onChange={e => setItem({ ...item, amount: e.target.value })}
                    label="Quantidade" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                  <TextField value={item.price}
                    onChange={e => setItem({ ...item, price: e.target.value })}
                    label="Preço" variant="filled" fullWidth />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="primary" variant="contained" onClick={handleAddProduct}>
              Adicionar
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {/* <Grid>
        <Box position="absolute" bottom="0" left="0" display="flex" flex="1" width="100%">
          <Paper style={{
            width: '100%',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Typography>
              Total: {sumProducts()}
            </Typography>
          </Paper>
        </Box>
      </Grid> */}
    </Grid>
  )
}
