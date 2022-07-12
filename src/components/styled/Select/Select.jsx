import { styled } from '@stitches/react'
import { violet, mauve } from '@radix-ui/colors'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  marginTop: 10,
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 44,
  backgroundColor: 'white',
  color: '#8b8989',
  outline: 'none',
  borderWidth: 1,
  borderColor: '#e0e1e1',
  borderStyle: 'double',
  '&:hover': { backgroundColor: mauve.mauve3 }
})

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)'
})

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: violet.violet11,
  cursor: 'default'
}

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles)

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles)

const SelectTrigger = StyledTrigger
const SelectValue = SelectPrimitive.Value
const SelectIcon = SelectPrimitive.Icon
const SelectContent = StyledContent
const SelectViewport = StyledViewport
const SelectScrollUpButton = StyledScrollUpButton
const SelectScrollDownButton = StyledScrollDownButton

export const Select = ({ children, ...props }) => {
  return (
    <>
      <SelectPrimitive.Root {...props}>
        <SelectTrigger aria-label="Categorias">
          <SelectValue />
          <SelectIcon>
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>{children}</SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPrimitive.Root>
    </>
  )
}
