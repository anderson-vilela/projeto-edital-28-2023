'use client'

import Stars from '@/components/Stars'
import { APIDataType } from '@/types/TypesAPI'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import { HiUsers } from 'react-icons/hi2'
import { ListOfCoursesType } from '.'
import FormSubscribe from '../FormSubscribe'
import Pagination from '../Pagination'

type SearchResultsType = {
  resultsOnPage: number
  totalResults: number
} | null

type PanelProps = {
  listOfCourses: ListOfCoursesType
}

const Panel = ({ listOfCourses }: PanelProps) => {
  const { userId } = useAuth()

  const categorys = listOfCourses
    ? listOfCourses.map((course) => course.category)
    : []

  const [currentTab, setCurrentTab] = useState<string>(categorys[0])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const listOfCoursesToView = listOfCourses.find(
    (course) => course.category === currentTab,
  )

  if (!listOfCoursesToView) return null

  let coursesToView: APIDataType[] | null = null
  let searchResults: SearchResultsType = null
  let numberOfPages: number | null = null
  let listOfPages: number[] = []

  if (listOfCoursesToView?.courses) {
    coursesToView = listOfCoursesToView?.courses.slice(
      (currentPage - 1) * 6,
      currentPage * 6,
    )

    searchResults = {
      resultsOnPage:
        listOfCoursesToView.courses.length > currentPage * 6
          ? currentPage * 6
          : listOfCoursesToView.courses.length,
      totalResults: listOfCoursesToView.courses.length,
    }

    numberOfPages = Math.ceil(listOfCoursesToView.courses.length / 6)

    listOfPages = Array.from({ length: numberOfPages }, (_, i) => i + 1)
  }

  const handleTab = (category: string) => {
    scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setCurrentTab(category)
    setCurrentPage(1)
  }

  const handleChangePage = (number: number) => {
    scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setCurrentPage(number)
  }

  return (
    <div className="mt-8">
      <nav>
        <ul className="flex flex-wrap gap-x-8 gap-y-4 text-tw-text-20 font-semibold max-lg:justify-center">
          {categorys.map((category) => (
            <li
              key={category}
              onClick={() => handleTab(category)}
              data-active-tab={currentTab === category}
              className="cursor-pointer break-words border-b-[3px] border-transparent pb-2 hover:border-b-[3px] hover:border-tw-secundary-color-light data-[active-tab=true]:border-b-[3px] data-[active-tab=true]:border-tw-secundary-color-light data-[active-tab=true]:text-tw-secundary-color-light"
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6">
        {!searchResults && (
          <span className="text-tw-text-16 italic">
            Ops, nenhum curso foi identificado...
          </span>
        )}
        {searchResults && (
          <span className="text-tw-text-16 italic">{`${searchResults.resultsOnPage} de ${searchResults.totalResults} resultados`}</span>
        )}
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-16">
        {coursesToView?.map((course: APIDataType) => {
          let isAlreadyRegistered = false

          if (course.lista_de_usuarios_matriculados && userId) {
            isAlreadyRegistered =
              course.lista_de_usuarios_matriculados.includes(userId)
          }

          return (
            <div key={course.id} className="grid gap-3">
              <div className="relative h-[200px] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={course.capa}
                  alt={`Capa do curso: ${course.titulo}`}
                  quality={50}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fill
                />
              </div>
              <div className="grid gap-2">
                <h2 className="break-words text-tw-text-26 font-semibold max-lg:text-justify max-md:text-center">
                  {course.titulo}
                </h2>
                <span className="break-words text-tw-text-14 font-semibold text-tw-primary-color-light max-lg:text-center">
                  {course.parceiros}
                </span>
              </div>
              <div className="flex items-center justify-between max-xl:flex-col max-md:flex-row max-md:justify-center max-md:gap-8 max-sm:flex-col max-sm:gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 text-tw-primary-color-light">
                      <HiUsers className="h-full w-full" />
                    </div>
                    <span className="text-tw-text-18 font-normal">
                      {course.matriculados.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 text-tw-primary-color-light">
                      <FaClock className="h-full w-full" />
                    </div>
                    <span className="text-tw-text-18 font-normal">
                      {course.duracao}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Stars
                    rating={course.avaliacao}
                    className={{
                      fullStarStyle: 'scale-75',
                      halfStarStyle: 'scale-75',
                      emptyStarStyle: 'scale-75',
                      mainDivStyle: 'gap-0',
                    }}
                  />
                  <span className="text-tw-text-18 font-normal">
                    {course.avaliacao.replace('.', ',')}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-tw-text-16 font-medium max-lg:text-justify">
                  {course.resumo.replace(/ Ver mais$/, '...')}
                </p>
              </div>
              <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
                <FormSubscribe course={course} />
                <Link
                  href={`/courses/${course.id}`}
                  className="text-tw-text-18 font-semibold text-tw-secundary-color-light duration-300 hover:text-tw-secundary-color-dark hover:underline"
                >
                  Ver curso
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      <Pagination
        listOfPages={listOfPages}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </div>
  )
}

export default Panel
