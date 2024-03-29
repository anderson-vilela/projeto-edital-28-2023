import SlideCarousel from '@/app/home/_components/SlideCarousel'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SectionEducationalModule from './_components/SectionEducationalModule'
import SectionPartners from './_components/SectionPartners'

export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="h-[54rem] pt-24 max-lg:h-[45rem] max-md:h-[40rem] max-sm:h-[35rem]">
          <SlideCarousel />
        </div>
        <SectionEducationalModule />
        <SectionPartners />
      </main>
      <Footer />
    </>
  )
}
