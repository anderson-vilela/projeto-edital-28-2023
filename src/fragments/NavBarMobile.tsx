import { RiMenuLine } from 'react-icons/ri'
import NavLink from './NavLink'

const NavBarMobile = () => {
  return (
    <div className="group sm:relative tw-default:hidden">
      <div className="flex items-center gap-2">
        <RiMenuLine className="text-xl" />
        <span>Menu</span>
      </div>
      <nav className="absolute left-0 top-0 z-50 hidden rounded-b-2xl border-2 bg-tw-neutral-0 duration-300 group-hover:block group-hover:border-tw-primary-color-dark max-sm:w-full">
        <span className="block bg-tw-neutral-200 p-4 text-center font-bold text-tw-primary-color-dark max-sm:text-tw-text-14">
          Menu
        </span>
        <hr />
        <ul className="max-sm:text-center max-sm:text-tw-text-16">
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/home">Início</NavLink>
          </li>
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/about">Sobre Nós</NavLink>
          </li>
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/courses">Cursos</NavLink>
          </li>
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/partners">Parceiros</NavLink>
          </li>
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/transparency">Transparência</NavLink>
          </li>
          <li className="hover:bg-text-tw-primary-color-dark px-8 py-4 duration-300">
            <NavLink href="/contacts">Contato</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBarMobile
