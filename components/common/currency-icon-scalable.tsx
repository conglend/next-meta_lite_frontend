import React, { SVGProps, useState } from 'react'

// WARNING: rename any file starting with numbers, as it will be also a variable name

//codegen: cd to directories with all the icons and use:
/*
for file in *.svg; do
    printf 'import %s from "currency-icons/%s"\n' "${file%.svg}" ""${file%}""
done 
*/

import { Box } from '@mui/system'

//gen icons names:
/* 
for file in *.svg; do
    printf '%s,\n' "${file%.svg}"
done
 */

export interface CurrencyIconProps extends SVGProps<unknown> {
  icon: string
}

const parseIconName = (originalIcon: string) => {
  const icon = originalIcon.toUpperCase()
  if (icon === '1INCH') {
    return 'ONE_INCH'
  }
  return icon
}

export const CurrencyIcon: React.FC<CurrencyIconProps> = (props) => {
  const icon = parseIconName(props.icon)
  // const [iconUrl, setIconUrl] = useState(`/currency-icons/${icon}.png`)

  return (
    <object
      data={`/assets/currency-icons/${icon}.png`}
      type='image/png'
      style={{
        width: '65%',
        height: '90%',
        maxHeight: '90%',
        display: 'flex',
        aspectRatio: 1,
        objectFit: 'contain',
      }}
    >
      <img
        src='/assets/currency-icons/default.png'
        alt='Currency icon'
        style={{
          width: '100%',
          aspectRatio: 1,
        }}
      />
    </object>
  )
  // <Box
  //   sx={{
  //     width: '100px',
  //     height: '100px',
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //     backgroundImage: `url("/currency-icons/${icon}.png"), url("/currency-icons/default.png")`,
  //     //       backgroundImage: `image-set(
  //     //   url("/currency-icons/${icon}.png") 1x,
  //     //   url("/currency-icons/default.png") 1x
  //     // )`,
  //   }}
  // />
  // )
}
