'use client'

import { api } from '@/api'
import CreateProduct from '@/components/CreateProduct'
import ProductCard from '@/components/ProductCard'
import { Center, CircularProgress, Flex, Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type IProductResponse = {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  promotion?: string;
}

export default function Home() {
  const [products, setProducts] = useState<IProductResponse[] | []>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(res => { setProducts(res.data); setLoading(false) });
  }, [])

  return (
    <>
      <Flex flexDir='column' justifyContent='center'>
        {loading && <Center h='96'><CircularProgress isIndeterminate color='teal.600' /></Center>}
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} mx={2} my={6} gap={6}>
          {
            !loading && !products[0]
              ? (<Center fontWeight='bold'>Nenhum produto está cadastrado</Center>)
              : products.map((product, i) => (
                <GridItem key={i} w='100%' h='max'>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    promotion={product.promotion}
                  />
                </GridItem>
              ))
          }
        </Grid >
        <CreateProduct />
      </Flex>
    </>
  )
}
