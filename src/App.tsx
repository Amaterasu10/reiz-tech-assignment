import { useState, useEffect } from 'react'

import axios from 'axios';

import { 
  Container,
  Heading,
  Box
} from '@chakra-ui/react'

import StateHolder from './components/StateHolder';
import { PartialCountryData } from './types';

function App() {

  const [countriesData, setCountriesData] = useState<PartialCountryData[]>([]);

  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {

    if(countriesData.length > 0) return;
    
    try {
      const res = await axios.get('https://restcountries.com/v2/all?fields=name,region,area')
      setCountriesData(res.data)
      setIsFetchingData(false);
    } catch(error) {
      console.log(error)
      setIsFetchingData(false)
    }
  }

  return (
    <div className="App">
      <header>
        <Container maxW='full' bg='green.200'>
          <Box p="2.5">
            <nav>
              <Heading as='h1'>ReizTech: List of Countries</Heading>
            </nav>
          </Box>
        </Container>
      </header>
      <main>
        <StateHolder 
          countriesData={countriesData} 
          isFetchingData={isFetchingData}
        />
      </main>
    </div>
  )
}

export default App
