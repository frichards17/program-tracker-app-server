import PageTitle from '@/components/common/page-title'
import React from 'react'
import ExercisesTable from './exercises-table'
import CreateExercise from '@/components/forms/exercise/create-exercise'

const ExercisesPage = () => {
  return (
    <div>
        <PageTitle title="Exercises" />
        <br/>
        <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>
        <ExercisesTable />
        <CreateExercise />
        </div>
    </div>
  )
}

export default ExercisesPage