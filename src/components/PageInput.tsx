import { 
  Flex, 
  NumberInput, 
  NumberInputField, 
  Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { PageInputProps } from '../types';

const PageInput: React.FC<PageInputProps> = ({ 
  totalPageCount, 
  currentPage, 
  setCurrentPage
}) => {

  /*
    added so that users can see what they're typing before the input automatically sets its
    value equal to the current page
  */
 
  const [inputValue, setInputValue] = useState<number>(currentPage)

  useEffect(() => {
    setInputValue(currentPage)
  }, [currentPage])

  return (
    <Box>
      <Flex maxW='768px' justify='center' my='1rem' mx='auto'>
        <NumberInput  
          allowMouseWheel
          defaultValue={1}
          min={1}
          max={totalPageCount}
          inputMode="numeric"
          onChange={
            (valueAsString, valueAsNumber:number)=> {
              
              setInputValue(valueAsNumber)

              setCurrentPage(() => {

                if(valueAsNumber < 1) return 1

                if(valueAsNumber > totalPageCount) return totalPageCount

                if(!Number.isNaN(valueAsNumber)) return valueAsNumber
                
                return currentPage
              })
            }
          }
          value={inputValue}
        >
          <NumberInputField 
            px={0}
            textAlign='center' 
            _focusVisible={{borderColor: '#68d391' }}
          />
        </NumberInput>
      </Flex>
    </Box>
  )
}

export default PageInput