import type React from "react"
import AnimalsWithCategories from "../../Components/AnimalsWithCategories/AnimalsWithCategories"
import MainPageContent from "../../Components/MainPageContent/MainPageContent"


const MainPage: React.FC = () => {
  return (
    <div>
      <AnimalsWithCategories/>
      <MainPageContent/>
    </div>
  )
}

export default MainPage
