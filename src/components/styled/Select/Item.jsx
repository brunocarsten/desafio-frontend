import { forwardRef } from 'react'
import { styled } from '@stitches/react'
import { mauve } from '@radix-ui/colors'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'

const StyledItem = styled(SelectPrimitive.Item, {
  width: '100%',
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: '#8b8989',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none'
  },

  '&:focus': {
    backgroundColor: 'rgb(244, 242, 244)',
    color: '#8b8989'
  }
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const SelectItem = StyledItem
const SelectItemText = SelectPrimitive.ItemText
const SelectItemIndicator = StyledItemIndicator

export const Item = forwardRef(({ title, ...props }, forwardedRef) => {
  return (
    <SelectItem ref={forwardedRef} value={props.value}>
      <SelectItemText>{title}</SelectItemText>
      <SelectItemIndicator>
        <CheckIcon />
      </SelectItemIndicator>
    </SelectItem>
  )
})
