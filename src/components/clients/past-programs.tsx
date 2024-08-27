import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import Link from 'next/link'

const PastPrograms = ({
  user_id,
  user_first_name
}: {
  user_id: number,
  user_first_name: string
}) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">Past Programs</CardTitle>
        <CardDescription>{user_first_name} has no completed programs.</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default PastPrograms