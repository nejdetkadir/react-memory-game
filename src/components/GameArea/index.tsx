import React from 'react'
import { DefaultLayout } from './../../layouts'
import { Card } from './../index'

type Props = {}

const GameArea: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <p>Gamer area</p>
      <Card />
    </DefaultLayout>
  )
}

export default GameArea;
