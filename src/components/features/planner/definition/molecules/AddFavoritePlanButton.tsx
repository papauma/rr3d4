import Button from '@src/components/commons/buttons/Button'
import { useTheme } from '@src/context/themeContext'
import React from 'react'

export default function AddFavoritePlanButton(props: any) {
  const theme = useTheme()

  return (
    <>
        <Button
            buttonCategory='tertiary'
            icon={theme.drawables.general.Ic_Star}
        />
    </>
  )
}
